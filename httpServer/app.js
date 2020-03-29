var log = console.log;
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const send = require("./msg");
// send.sendMsg("","和平精们,集结开始了");
app.use(express.static(path.resolve(__dirname, "..") + "/canvas"));
app.get("/",(req, res)=>{
		res.status(200);
		fs.createReadStream(path.resolve(__dirname,"..") + "/canvas/index(star).html").pipe(res);
})
app.listen(3000,()=>{
		log("服务启动:http://localhost:3000")
})