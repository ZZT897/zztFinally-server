
import express from 'express';
import { connection } from '../index';

let router = express.Router();

router.get('/getUser', (req, res) => {
    let sql = "select * from frontenduser";
    connection.query(sql, (err, data) => {
        const resData = JSON.parse(JSON.stringify(data));
        const { isVip } = req.query;
        let result = resData.filter((item) => {
            return item.isVip == isVip
        })
        res.send({ code: 200, data: result })
    })
})

router.post("/deleteUser", (req, res) => {
    const { id } = req.body;
    let sql = `delete from frontenduser where  id=${id}`;
    connection.query(sql, (err, data) => {
        if (!err) {
            res.send({ code: 200, message: '删除用户成功' })
        } else {
            res.send({ code: 403, message: '删除用户失败' })
        }
    })
})

router.post("/updateUser", (req, res) => {
    const { id, username, password, score } = req.body;
    let sql = `update frontenduser set username='${username}' ,password='${password}',score='${score}' where id=${id}`;
    connection.query(sql, (err, data) => {
        if (!err) {
            res.send({ code: 200, message: '更新用户数据成功' })
        } else {
            res.send({ code: 403, message: '更新用户数据失败' })
        }
    })
})

export default router