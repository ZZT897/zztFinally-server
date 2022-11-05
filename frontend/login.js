import express from 'express';
import { connection } from '../index';

let router = express.Router();

router.post('/login', (req, res) => {
    let sql = "select * from frontendUser";
    connection.query(sql, (err, data) => {
        const resData = JSON.parse(JSON.stringify(data));
        const { username, password } = req.body;
        let dataItem;
        let result = resData.some(item => {
            if (item.username == username && item.password == password) {
                dataItem = item;
                return true;
            } else {
                return false;
            }
        })
        if (result) {
            res.send({ code: 200, messgae: '登录成功', data: dataItem });
        } else {
            res.send({ code: 403, messgae: '用户名或者密码不对' });
        }
    })
})

router.post('/getScore', (req, res) => {
    const { id } = req.body
    let sql = `select * from frontendUser where id=${id}`;
    connection.query(sql, (err, data) => {
        const resData = JSON.parse(JSON.stringify(data));
        let score = resData.length ? resData[0].score : 0
        if (!err) {
            res.send({ code: 200, messgae: '获取用户积分成功', data: score });
        } else {
            res.send({ code: 403, messgae: '获取用户积分失败' });
        }
    })
})

router.post('/editPersonInfo', (req, res) => {
    const { username, password } = req.body;
    let sql = "select * from frontendUser";
    connection.query(sql, (err, data) => {
        let sql = `update frontendUser set password='${password}' where username='${username}'`;
        connection.query(sql, (err, data) => {
            if (!err) {
                res.send({ code: 200, message: '更新个人信息成功' })
            } else {
                res.send({ code: 403, message: '更新个人信息失败' })
            }
        })
    })
})

export default router