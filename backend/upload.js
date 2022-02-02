
import express from 'express';
import fs from 'fs';
import multiparty from 'multiparty';
import path from 'path'

let router = express.Router();
router.get("/getImageUrl", (req, res) => {
    // var files = fs.readdirSync('./UploadImage/');  // 方法一：后台读取图片返回文件流（二进制流）
    // let positiveUrl = path.resolve(__dirname, '..')
    // const newPath = positiveUrl + '\\UploadImage' + '\\' + files[0]
    // res.sendFile(newPath);
    var responseData = []  // 方法二：返回Buffer数据
    let finalData
    let resArr = []
    var files = fs.readdirSync('./backend/UploadImage/')
    files.forEach(function (item, index) {
        var stream = fs.createReadStream('./backend/UploadImage/' + item)
        //存储文件流
        if (stream) {  //判断状态
            stream.on('data', function (chunk) {
                responseData.push(chunk)
            })
            stream.on('end', function () {
                finalData = Buffer.concat(responseData)
                resArr.push(finalData)
                if (resArr.length === files.length) {
                    res.send(resArr);
                }
            })
        }
    })
})

router.post("/saveImageUrl", (req, res) => {
    var files = fs.readdirSync('./backend/UploadImage/')
    files.forEach((item) => {
        fs.unlink('./backend/UploadImage/' + item, () => { })
    })
    let form = new multiparty.Form()
    form.uploadDir = path.resolve(__dirname, '..')
    form.parse(req, function (err, fields, files) {
        if (err) throw err
        const fileName = files.file[0].originalFilename
        const newPath = form.uploadDir + '\\backend' + '\\UploadImage' + '\\' + fileName
        fs.renameSync(files.file[0].path, newPath)
        res.send({
            code: 200,
            name: fileName,
            message: 'success'
        })
    })
})

export default router