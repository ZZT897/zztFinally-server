import express from 'express';
import { connection } from '../index';

let router = express.Router();

router.get('/getNewsData', (req, res) => {
  let sql = "select * from newsdata";
  connection.query(sql, (err, data) => {
    const resData = JSON.parse(JSON.stringify(data));
    if (resData) {
      res.send({ code: 200, data: resData });
    } else {
      res.send({ code: 403, messgae: '获取资讯数据失败' });
    }
  })
})

export default router