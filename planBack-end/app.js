const express = require("express");
const utils = require("./utils");
const path = require("path");
const fs = require("fs");
const app = express();
const os = require("os");
const port = 3000;
const ip = os.networkInterfaces().WLAN[1].address;
//获取默认json数据
function getDefaultPlan(plan) {
	var path = __dirname + `/data/${plan}.json`; 
	var json = fs.readFileSync(path);
	return JSON.parse(json);
}
//获取plan数据
function getPlan(plan) {
	var filename = `plan_${plan}_` + utils.getCurrentTime();
	var path = __dirname + "/plan_log/" + filename + ".json";
	var json;
	if(utils.isExists(path)) {
		json = JSON.parse(fs.readFileSync(path));
	}else {
		json = getDefaultPlan(plan);
		fs.writeFileSync(path,JSON.stringify(json));
	}
	return json;
}
//更新数据
function updatePlan(req, plan) {
	var query = req.query;
	var filename = `plan_${plan}_` + utils.getCurrentTime();
	var path = __dirname + "/plan_log/" + filename + ".json";
	var json = getPlan(plan);
	for(let j = 0; j < json.plan.length; j++) {
		json.plan[j].complete = false;
	}
	for(let i in query) {
		for(let j = 0; j < json.plan.length; j++) {
			if(i === json.plan[j].key) {
				json.plan[j].complete = true;
				break;
			}
		}
	}
	fs.writeFileSync(path,JSON.stringify(json));
}
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
});
app.use(express.static(path.join(path.resolve(__dirname, '..') , 'plan')));
app.get("/",function(req, res) {
	console.log(path.resolve(__dirname, "..") + '/plan/index.html')
	res.status(200);
	fs.createReadStream(path.resolve(__dirname, "..") + '/plan/index.html').pipe(res);
})
//更新减肥
app.get("/slimming/update", function(req, res) {
	updatePlan(req, "slimming");
	res.status(200);
	res.send({
		code: 0,
		message: "减肥更新成功"
	});
})
//更新学习
app.get("/study/update", function(req, res) {
	updatePlan(req, "study");
	res.status(200);
	res.send({
		code: 0,
		message: "学习更新成功"
	});
})
//获取减肥目标信息
app.get("/slimming/get", function(req, res) {
	var json = getPlan("slimming");
	res.status(200);
	res.send({
		code: 0,
		message: json
	})
})
//获取学习目标信息
app.get("/study/get", function(req, res) {
	var json = getPlan("study");
	res.status(200);
	res.send({
		code: 0,
		message: json
	})
})
//获取存钱目标信息
app.get("/deposit/get", function(req, res) {
	var json = getPlan("deposit");
	res.status(200);
	res.send({
		code: 0,
		message: json
	})
})
// 更新存钱
app.get("/deposit/update", function(req, res) {
	updatePlan(req, "deposit");
	res.status(200);
	res.send({
		code: 0,
		message: "存钱更新成功"
	});
})
app.listen(port,()=>{
	console.log("服务启动:http://"+ip +":"+ port);
})