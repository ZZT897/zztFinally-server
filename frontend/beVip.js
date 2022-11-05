import express from 'express';
const alipaySdk = require('./alipayUtil');
const AlipayFormData = require('alipay-sdk/lib/form').default; // alipay.trade.page.pay 返回的内容为 Form 表单
import { connection } from '../index';
import axios from 'axios'

let router = express.Router();

router.post('/beVip', (req, res) => {
    let sql = "select * from frontendUser";
    connection.query(sql, (err, data) => {
        const resData = JSON.parse(JSON.stringify(data));
        const { username, id } = req.body;
        resData.some(item => {
            if (item.username == username && item.id == id) {
                let sql1 = `update frontendUser set isVip='yes' where id=${id}`;
                connection.query(sql1, (err, data) => {
                    if (!err) {
                        res.send({ code: 200, messgae: '成为vip会员' });
                    }
                })
                return true;
            }
        })
    })
})

router.post('/api/pcpay', (req, res) => {
    const { orderId } = req.body.data
    // * 添加购物车支付支付宝 */
    // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
    const formData = new AlipayFormData();
    formData.setMethod('get');
    // 通过 addField 增加参数
    // 在用户支付完成之后，支付宝服务器会根据传入的 notify_url，以 POST 请求的形式将支付结果作为参数通知到商户系统。
    formData.addField('notifyUrl', 'http://localhost:8080/#/warehouse'); // 支付成功回调地址，必须为可以直接访问的地址，不能带参数
    formData.addField('biz_content', {
        'out_trade_no': `${orderId}`, // 商户订单号,64个字符以内、可包含字母、数字、下划线,且不能重复
        'product_code': 'FAST_INSTANT_TRADE_PAY', // 销售产品码，与支付宝签约的产品码名称,仅支持FAST_INSTANT_TRADE_PAY
        'total_amount': '398', // 订单总金额，单位为元，精确到小数点后两位
        'subject': 'Vip充值', // 订单标题
        'body': '支付成功可成为Vip用户,下载Vip专属数据集' // 订单描述
    });
    formData.addField('returnUrl', 'http://localhost:8080/#/warehouse');//加在这里才有效果,不是加在bizContent 里面
    // 如果需要支付后跳转到商户界面，可以增加属性"returnUrl"
    const result = alipaySdk.exec(  // result 为可以跳转到支付链接的 url
        'alipay.trade.page.pay', // 统一收单下单并支付页面接口
        {}, // api 请求的参数（包含“公共请求参数”和“业务参数”）
        { formData: formData },
    );
    result.then((resp) => {
        res.send(
            {
                "success": true,
                "message": "success",
                "code": 200,
                "timestamp": (new Date()).getTime(),
                "result": resp
            }
        )
    })

});

router.post('/api/queryOrder', (req, res) => {
    const { out_trade_no, trade_no } = req.body.data
    const formData = new AlipayFormData();
    formData.setMethod('get');
    formData.addField('biz_content', {
        'out_trade_no': `${out_trade_no}`,
        'trade_no': `${trade_no}`
    });
    const result = alipaySdk.exec(
        'alipay.trade.query',
        {}, // api 请求的参数（包含“公共请求参数”和“业务参数”）
        { formData: formData },
    );
    result.then(resData => {
        axios({
            url: resData,
            method: 'get'
        }).then(data => {
            let r = data.data.alipay_trade_query_response
            if (r.code === '10000') {
                switch (r.trade_status) {
                    case 'WAIT_BUYER_PAY':
                        res.send({
                            success: true,
                            code: 200,
                            msg: '支付宝有交易记录，没付款'
                        })
                        break;

                    case 'TRADE_FINISHED':
                        res.send({
                            success: true,
                            code: 200,
                            msg: '交易完成，不可以退款'
                        })
                        break;

                    case 'TRADE_SUCCESS':
                        res.send({
                            success: true,
                            code: 200,
                            msg: '交易成功'
                        })
                        break;

                    case 'TRADE_CLOSED':
                        res.send({
                            success: true,
                            code: 200,
                            msg: '交易关闭，没有支付成功'
                        })
                        break;
                }
            } else if (res.code === '40004') {
                res.json('交易不存在')
            }
        }).catch(err => {
            res.json({
                msg: '查询失败',
                err
            })
        })
    })
});

export default router