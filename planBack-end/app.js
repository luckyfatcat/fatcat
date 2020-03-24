const express = require("express");
const utils = require("./utils");
const path = require("path");
const fs = require("fs");
const app = express();
const os = require("os");
const port = 3000;
const ip = os.networkInterfaces().WLAN[1].address;
app.use(express.static(path.join(path.resolve(__dirname, '..') , 'plan')));
app.get("/",function(req, res) {
	console.log(path.resolve(__dirname, "..") + '/plan/index.html')
	res.status(200);
	fs.createReadStream(path.resolve(__dirname, "..") + '/plan/index.html').pipe(res);
})
app.get("/deposit/update", function(req, res) {
	var query = req.query;
	var filename = "plan_" + utils.getCurrentTime();
	var text = "";
	for(var i in query) {
		switch(i) {
			case "consume":
				text+="消费记录:"+query[i]+",";
				break;
			case "morning":
				text+="早上:"+query[i]+",";
				break;
			case "noon":
				text+="中午:"+query[i]+",";
				break;
			default:
				text = "";
		}
	}
	utils.isExists(__dirname + '/plan_log',function(){
		fs.mkdirSync(__dirname + '/plan_log',function(err) {
			if(err) {
				console.log("创建文件夹失败,",err);
			}
		})
	})
	fs.writeFile(__dirname + '/plan_log/' +filename + '.txt', text,function(err){
		if(err) {
			console.log(err)
			res.status(500);
			res.send({
				code: 1,
				message: "更新失败"
			});
			return
		}
		res.status(200);
		res.send({
			code: 0,
			message: "更新成功"
		});
	})
})
app.listen(port,()=>{
	console.log("服务启动:http://"+ip +":"+ port);
})