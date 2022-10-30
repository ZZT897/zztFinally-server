import express from "express";
import { createConnection } from "mysql";
import user from './backend/user';
import login from './frontend/login'
import register from './frontend/register'
import wareHouse from './frontend/wareHouse'
import upload from './backend/upload';
import beVip from './frontend/beVip'
import news from './frontend/news'
import community from './frontend/community'
import projectSupply from './frontend/projectSupply'
import personRoom from './frontend/personRoom'
import userManager from './backend/userManager'
import dataManager from './backend/dataManager'
import needManager from './backend/needManager'
import communityManager from './backend/communityManager'

const app = express();
const cors = require('cors');
const port = 8888;
const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'zztFinally'
})
connection.connect();

//解析post数据
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.listen(port, function () {
    console.log("服务器已经启动");
})

app.use(user);
app.use(login);
app.use(register);
app.use(beVip)
app.use(wareHouse)
app.use(upload);
app.use(community)
app.use(projectSupply)
app.use(personRoom)
app.use(userManager)
app.use(dataManager)
app.use(needManager)
app.use(communityManager)
app.use(news)

app.use(function (req, res) {
    res.send('404 not found');
})

export {
    connection
}