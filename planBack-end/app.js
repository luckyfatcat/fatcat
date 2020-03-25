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
//更新减肥
app.get("/slimming/update", function(req, res) {
	res.status(200);
	res.send({
		code: 0,
		message: "减肥更新"
	})
})
//更新学习
app.get("/study/update", function(req, res) {
	res.status(200);
	res.send({
		code: 0,
		message: "学习更新"
	})
})
function inspactPlanFile(plan, notExistsCallbak,existsCallbak) {
	var filename = "plan_" + plan + "_" + utils.getCurrentTime();
	var path = __dirname + "/plan_log/" + filename + ".json";
	if(!utils.isExists(path)) {
		notExistsCallbak(path);
	}else {
		existsCallbak(path);
	}
}
function writePlanFile(path, text) {	
	fs.writeFileSync(path,text);
}
//获取存钱目标信息
app.get("/deposit/get", function(req, res) {
	var notExistsCallbak = function(path) {
		var defaultPlan = __dirname + "/data/deposit.json"; 
		var text = fs.readFileSync(defaultPlan);
		writePlanFile(path, JSON.stringify(text));
		console.log(JSON.stringify(text));
		return JSON.stringify(text);
	};
	var existsCallbak = function(path) {
		var text = fs.readFileSync(path);
		return JSON.stringify(text);
	};
	var text = inspactPlanFile("deposit",notExistsCallbak,existsCallbak);
	console.log(text);
	res.status(200);
	res.send({
		code: 0,
		message: text
	})
})
// 更新存钱
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
	
	if(!utils.isExists(__dirname + '/plan_log')) {
		fs.mkdirSync(__dirname + '/plan_log');
	}
	fs.writeFile(__dirname + '/plan_log/' +filename + '.txt', text,function(err){
		if(err) {
			console.log(err)
			res.status(500);
			res.send({
				code: 1,
				message: "存钱更新失败"
			});
			return
		}
		res.status(200);
		res.send({
			code: 0,
			message: "存钱更新成功"
		});
	})
})
app.listen(port,()=>{
	console.log("服务启动:http://"+ip +":"+ port);
})