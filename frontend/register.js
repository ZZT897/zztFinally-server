import express from 'express';
import { connection } from '../index';

let router = express.Router();

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    let sql = "select * from frontendUser";
    connection.query(sql, (err, data) => {
        const resData = JSON.parse(JSON.stringify(data));
        let result = resData.some(item => {
            if (item.username === username) {
                res.send({ code: 400, messgae: '该用户已经存在' });
                return true;
            }
        })
        if (!result) {
            let sql1 = `Insert into frontendUser(username,password,isVip,score) Values('${username}','${password}','no','0')`
            connection.query(sql1, (err, data) => {
                if (!err)
                    res.send({ code: 200, messgae: '注册成功' });
                else {
                    res.send({ code: 403, messgae: '注册失败' });
                }
            })
        }
    })

})

export default router