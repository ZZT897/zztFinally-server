
import express from 'express';
import { connection } from '../index';

let router = express.Router();

router.get('/getNeed', (req, res) => {
    let sql = "select * from needdata";
    connection.query(sql, (err, data) => {
        const resData = JSON.parse(JSON.stringify(data));
        if (!err) {
            res.send({ code: 200, data: resData, message: '获取用户需求成功' })
        } else {
            res.send({ code: 403, message: '获取用户需求失败' })
        }
    })
})

router.post('/deleteNeed', (req, res) => {
    const { id } = req.body;
    let sql = `delete from needdata where id=${id}`;
    connection.query(sql, (err, data) => {
        if (!err) {
            res.send({ code: 200, message: '删除用户需求成功' })
        } else {
            res.send({ code: 403, message: '删除用户需求失败' })
        }
    })
})

router.post("/updateNeed", (req, res) => {
    const { id, title, detail, type, phone, name, hasSupply } = req.body;
    let sql = `update needdata set name='${name}',phone='${phone}',type='${type}',detail='${detail}',title='${title}' ,hasSupply='${hasSupply}'where id=${id}`;
    connection.query(sql, (err, data) => {
        if (!err) {
            res.send({ code: 200, message: '更新需求数据成功' })
        } else {
            res.send({ code: 403, message: '更新需求数据失败' })
        }
    })
})

export default router