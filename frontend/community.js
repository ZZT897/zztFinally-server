import express from 'express';
import { connection } from '../index';

let router = express.Router();

router.post('/getCommunityData', (req, res) => {
    let sql = "select * from communityList";
    let result = [];
    connection.query(sql, (err, data) => {
        const resData = JSON.parse(JSON.stringify(data));
        for (let i = 0; i < resData.length; i++) {
            let id = resData[i].id;
            let sql1 = `select * from commentlist where commentCardId=${id}`;
            connection.query(sql1, (err, data) => {
                const resData1 = JSON.parse(JSON.stringify(data));
                let obj = {};
                for (let j = 0; j < resData1.length; j++) {
                    let username = resData1[j].username
                    if (!obj[username]) {
                        obj[username] = []
                        obj[username].push(resData1[j].comment);
                    } else {
                        obj[username].push(resData1[j].comment);
                    }
                }
                resData[i].comment = obj;
                if (i == resData.length - 1) {
                    if (req.body.type == '全部内容') {
                        result = resData
                        res.send({ data: result });
                    } else {
                        result = resData.filter(item => {
                            return item.type === req.body.type
                        })
                        res.send({ data: result });
                    }
                }
            })
        }
    })
})

router.post('/addCommunityComment', (req, res) => {
    const { commentCardId, comment, username } = req.body;
    let sql = `Insert into commentlist(commentCardId,comment,username) Values('${commentCardId}','${comment}','${username}')`;
    connection.query(sql, (err, data) => {
        if (!err) {
            res.send({ code: 200, message: "添加评论成功" })
        } else {
            res.send({ code: 403, message: "添加评论失败" })
        }
    })
})

router.post('/addCommunityData', (req, res) => {
    const { name, title, content, type } = req.body
    let sql = `Insert into communityList(name,title,content,type) Values('${name}','${title}','${content}','${type}')`
    connection.query(sql, (err, data) => {
        if (!err) {
            res.send({ code: 200, message: '发布成功' });
        } else {
            res.send({ code: 403, message: '发布失败！' });
        }
    })
})


export default router