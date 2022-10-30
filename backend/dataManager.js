
import express from 'express';
import { connection } from '../index';

let router = express.Router();

router.get('/getDataList', (req, res) => {
    const { isCheck } = req.query;
    let sql;
    if (isCheck == "全部内容") {
        sql = `select * from datalist`;
    } else {
        sql = `select * from datalist where isCheck='${isCheck}'`;
    }
    connection.query(sql, (err, data) => {
        const resData = JSON.parse(JSON.stringify(data));
        if (!err) {
            res.send({ code: 200, result: resData })
        } else {
            res.send({ code: 403, message: '查询数据失败' })
        }
    })
})

router.post('/deleteData', (req, res) => {
    const { id } = req.body;
    let sql = `delete from datalist where id=${id}`;
    connection.query(sql, (err, data) => {
        if (!err) {
            res.send({ code: 200, message: '删除数据成功' })
        } else {
            res.send({ code: 403, message: '删除数据失败' })
        }
    })
})

router.post('/updateData', (req, res) => {
    const { id, name, access, info, dataSort, score, isCheck, userId } = req.body;
    if (userId !== -1) {
        let sql0 = `select * from datalist where id=${id}`
        connection.query(sql0, (err, data0) => {
            const resData0 = JSON.parse(JSON.stringify(data0));
            if (resData0[0].isCheck == isCheck) {
                let sql = `update datalist set name='${name}',access='${access}',info='${info}',dataSort='${dataSort}',score='${score}',isCheck='${isCheck}' where id=${id}`;
                connection.query(sql, (err, data) => {
                    if (!err) {
                        res.send({ code: 200, message: '更新数据成功' })
                    } else {
                        res.send({ code: 403, message: '更新数据失败' })
                    }
                })
            }
            else {
                let sql1 = `select * from frontenduser where id=${userId}`
                connection.query(sql1, (err, data1) => {
                    const resData1 = JSON.parse(JSON.stringify(data1));
                    let preScore = parseInt(resData1[0].score);
                    let newScore = preScore;
                    if ((resData0[0].isCheck == "待审核" && isCheck == "审核未通过") || (resData0[0].isCheck == "审核未通过" && isCheck == "待审核")) {
                    } else if (resData0[0].isCheck == "审核通过") {
                        newScore = Math.max(preScore - 2, 0);
                    } else {
                        newScore = preScore + 2;
                    }
                    let sql2 = `update frontenduser set score='${newScore}' where id=${userId}`;
                    connection.query(sql2, (err, data) => {
                        if (err) { console.log(err) }
                    })
                    let sql = `update datalist set name='${name}' ,access='${access}',info='${info}',dataSort='${dataSort}',score='${score}',isCheck='${isCheck}' where id=${id}`;
                    connection.query(sql, (err, data) => {
                        if (!err) {
                            res.send({ code: 200, message: '更新数据成功' })
                        } else {
                            res.send({ code: 403, message: '更新数据失败' })
                        }
                    })
                })

            }
        })
    } else {
        let sql = `update datalist set name='${name}' ,access='${access}',info='${info}',dataSort='${dataSort}',score='${score}',isCheck='${isCheck}' where id=${id}`;
        connection.query(sql, (err, data) => {
            if (!err) {
                res.send({ code: 200, message: '更新数据成功' })
            } else {
                res.send({ code: 403, message: '更新数据失败' })
            }
        })
    }
})

router.post("/addData", (req, res) => {
    const { name, access, info, dataSort, score } = req.body;
    let sql = `Insert into datalist(name,access,info,dataSort,score,isCheck,userId) Values('${name}','${access}','${info}','${dataSort}','${score}','审核通过','-1')`;
    connection.query(sql, (err, data) => {
        if (!err) {
            res.send({ code: 200, message: '添加数据成功' })
        } else {
            res.send({ code: 403, message: '添加数据失败' })
        }
    })
})

//下载接口跟前台页面的下载接口一样 /downloadData 传id get请求

export default router