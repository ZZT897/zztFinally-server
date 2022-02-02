import express from 'express';
import { connection } from '../index';
let router = express.Router();

router.get('/getPersonData', (req, res) => {
    let sql1 = "select * from needdata";
    let sql2 = "select * from datalist"
    let needData;
    let giveData;
    let p1 = new Promise((resolve, reject) => {
        connection.query(sql1, (err, data) => {
            const resData = JSON.parse(JSON.stringify(data));
            needData = resData.filter(item => {
                return item.userId == req.query.userId
            })
            if (!err) {
                resolve(needData)
            }
        })
    })

    let p2 = new Promise((resolve, reject) => {
        connection.query(sql2, (err, data) => {
            const resData = JSON.parse(JSON.stringify(data));
            giveData = resData.filter(item => {
                return item.userId == req.query.userId
            })
            if (!err) {
                resolve(giveData)
            }
        })
    })

    Promise.all([p1, p2]).then((resData) => {
        let result = {};
        result['need'] = resData[0];
        result['give'] = resData[1];
        res.send({ code: 200, data: result });
    }).catch(err => {
        res.send({ code: 403, message: '获得发布需求或者供给失败' });
    })
})

export default router