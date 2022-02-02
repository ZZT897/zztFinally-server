import express from 'express';
import { connection } from '../index';
import fs from 'fs';
import multiparty from 'multiparty';
import path from 'path'


let router = express.Router();

router.post('/addNeed', (req, res) => {
    const { name, phone, title, detail, type, userId } = req.body
    let sql = `Insert into needdata(name,phone,title,detail,type,userId,hasSupply) Values('${name}','${phone}','${title}','${detail}','${type}','${userId}','否')`
    connection.query(sql, (err, data) => {
        if (!err) {
            res.send({ code: 200, message: '发布需求成功' });
        }
    })
})

router.post('/addUploadFile', (req, res) => {
    let form = new multiparty.Form()
    form.uploadDir = path.resolve(__dirname, '..')
    fs.readdir("./frontend/dataExcel", function (err, files) {
        let length = files.length;
        form.parse(req, function (err, fields, files) {
            if (err) throw err
            const fileName = files.file[0].originalFilename
            let endingName = fileName.substring(fileName.length - 4, fileName.length)
            const newPath = form.uploadDir + '\\frontend' + '\\dataExcel' + '\\' + `${length + 1}.${endingName}`
            fs.renameSync(files.file[0].path, newPath)
            res.send({
                code: 200,
                message: '发布供给成功'
            })
        })
    })
})

router.post('/addProjectData', (req, res) => {
    const { info, name, dataSort, userId } = req.body;
    let sql = `Insert into datalist(name,info,access,score,isCheck,dataSort,userId) Values('${name}','${info}','免费','0','待审核','${dataSort}','${userId}')`
    connection.query(sql, (err, data) => {
        if (!err) {
            res.send({ code: 200, message: '发布供给成功' });
        } else {
            res.send({ code: 403, message: '发布供给失败！' });
        }
    })
})


export default router