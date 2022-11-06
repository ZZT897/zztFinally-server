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

router.post('/delNewsData', (req, res) => {
  const { id } = req.body;
  let sql = `delete from newsdata where id=${id}`;
  connection.query(sql, (err, data) => {
    if (!err) {
      res.send({ code: 200, message: '删除新闻资讯成功' })
    } else {
      res.send({ code: 403, message: '删除新闻资讯失败' })
    }
  })
})

router.post('/editNewsData', (req, res) => {
  const { id, title, url } = req.body;
  let sql = `update newsdata set title='${title}', url='${url}' where id=${id}`;
  connection.query(sql, (err, data) => {
    if (!err) {
      res.send({ code: 200, message: '修改新闻资讯成功' });
    } else {
      res.send({ code: 403, message: '修改新闻资讯失败' });
    }
  })
})

router.post('/addNewsData', (req, res) => {
  const { title, url } = req.body;
  let sql = `insert into newsdata(title, url) values('${title}', '${url}')`;
  connection.query(sql, (err, data) => {
    if (!err) {
      res.send({ code: 200, message: '新增新闻资讯成功' });
    } else {
      res.send({ code: 403, message: '新增新闻资讯失败' });
    }
  })
})

export default router