import express from 'express';
import { connection } from '../index';
import xlsx from 'node-xlsx';
import fs from 'fs';
import path from 'path';

let router = express.Router();

router.get('/getWareList', (req, res) => {
    let sql = "select * from datalist";
    connection.query(sql, (err, data) => {
        const resData = JSON.parse(JSON.stringify(data));
        let result = [];
        if (req.query.access === '不限' && req.query.dataSort === "不限") {
            result = resData.filter(item => {
                return item.isCheck == "审核通过"
            })
        } else if (req.query.dataSort === "不限") {
            result = resData.filter(item => {
                return item.access === req.query.access && item.isCheck == "审核通过"
            })
        } else if (req.query.access === '不限') {
            result = resData.filter(item => {
                return item.dataSort === req.query.dataSort && item.isCheck == "审核通过"
            })
        } else {
            result = resData.filter(item => {
                return item.dataSort === req.query.dataSort && item.access === req.query.access && item.isCheck == "审核通过"
            })
        }
        res.send({ data: result });
    })
})

router.get('/downloadData', (req, res) => {
    fs.readdir("./frontend/dataExcel", function (err, files) {
        files.forEach(file => {
            if (req.query.id == parseInt(file.substring(0, file.length - 5))) {
                let sheetList = xlsx.parse(path.join(__dirname + "\\dataExcel", file));
                let buffer = xlsx.build([{ name: "mySheetName", data: sheetList[0].data }])
                res.send({ data: buffer, name: file.substring(0, file.length - 5) });
            }
        })
    })
})

router.post('/updateScore', (req, res) => {
    const { id, username, score } = req.body;
    let sql = `update frontendUser set score='${score}' where id=${id}`;
    connection.query(sql, (err, data) => {
        if (!err) {
            res.send({ code: 200, message: '更新积分成功' });
        } else {
            res.send({ code: 403, message: '更新积分失败' });
        }
    })
})
export default router