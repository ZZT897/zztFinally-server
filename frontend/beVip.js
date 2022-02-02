import express from 'express';
import { connection } from '../index';

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

export default router