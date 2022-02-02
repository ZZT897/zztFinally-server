
import express from 'express';
import { connection } from '../index';

let router = express.Router();

router.get('/getCommunityList', (req, res) => {
    const { type } = req.query;
    let sql;
    if (type == "全部内容") {
        sql = `select * from communitylist`;
    } else {
        sql = `select * from communitylist where type='${type}'`;
    }
    connection.query(sql, (err, data) => {
        const resData = JSON.parse(JSON.stringify(data));
        if (!err) {
            res.send({ code: 200, data: resData, message: '获取社区数据成功' })
        } else {
            res.send({ code: 403, message: '获取社区数据失败' })
        }
    })
})

router.post('/deleteCommunityList', (req, res) => {
    const { id } = req.body;
    let sql = `delete from communitylist where id=${id}`;
    connection.query(sql, (err, data) => {
        if (!err) {
            res.send({ code: 200, message: '删除社区数据成功' })
        } else {
            res.send({ code: 403, message: '删除社区数据失败' })
        }
    })
})

router.post("/updateCommunityList", (req, res) => {
    const { id, name, title, content, type } = req.body;
    let sql = `update communitylist set name='${name}' ,content='${content}',type='${type}',title='${title}' where id=${id}`;
    connection.query(sql, (err, data) => {
        if (!err) {
            res.send({ code: 200, message: '更新社区数据成功' })
        } else {
            res.send({ code: 403, message: '更新社区数据失败' })
        }
    })
})

router.post("/addCommunityList", (req, res) => {
    const { name, title, content, type } = req.body;
    let sql = `Insert into communitylist(name,title,content,type) Values('${name}','${title}','${content}','${type}')`;
    connection.query(sql, (err, data) => {
        if (!err) {
            res.send({ code: 200, message: '添加社区数据成功' })
        } else {
            res.send({ code: 403, message: '添加社区数据失败' })
        }
    })
})

router.get('/getCommentList', (req, res) => {
    let sql = "select * from commentlist";
    connection.query(sql, (err, data) => {
        const resData = JSON.parse(JSON.stringify(data)); 
        if (!err) {
            res.send({ code: 200, data: resData, message: '获取用户评论成功' })
        } else {
            res.send({ code: 403, message: '获取用户评论失败' })
        }
    })
})

router.get('/updateCommentList', (req, res) => {
    const { id, comment, username } = req.query;
    let sql = `update commentlist set comment='${comment}' ,username='${username}' where id=${id}`;
    connection.query(sql, (err, data) => {
        if (!err) {
            res.send({ code: 200, message: '更新用户评论成功' })
        } else {
            res.send({ code: 403, message: '更新用户评论失败' })
        }
    })
})

router.post('/deleteCommemtList', (req, res) => {
    const { id } = req.body;
    let sql = `delete from commentlist where id=${id}`;
    connection.query(sql, (err, data) => {
        if (!err) {
            res.send({ code: 200, message: '删除用户评论成功' })
        } else {
            res.send({ code: 403, message: '删除用户评论失败' })
        }
    })
})
export default router