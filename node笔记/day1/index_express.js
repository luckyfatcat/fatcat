const express = require("express");
const app = new express();
const http = require("http");
const fs = require("fs");
const game = require("./game");
var count = 0;
var lastAction;
var lastActionCount = 0;
app.get("/",function(req, res) {
	count = 0;
	lastActionCount = 0;
	fs.createReadStream(__dirname + "/index.html").pipe(res);
})
app.get("/game",
	function(req, res, next){
		if(count === 3) {
			res.status(500);
			res.send("你太厉害了,我不和你玩了")
			return;
		}
		if(lastActionCount>=3) {
			res.status(500);
			res.send("你作弊,不和你玩儿");
			return;
		}
		next();
		if(lastAction && lastAction === req.query.action) {
			lastActionCount++;
		}else {
			lastActionCount = 0;
		}
		lastAction = req.query.action;
	},
	function(req, res, next){
		var query = req.query;
		var action = query.action;
		var result = game(action);
		res.action - action;
		if(result === -1) {
			res.status(200);
			res.send("你输了");
		}else if(result === 0) {
			res.status(200);
			res.send("平局");
		}else {
			count++;
			res.status(200);
			res.send("你赢了");
		}
		//next();
})
app.listen(3000,function(){
	console.log("服务启动成功: ","http://localhost:3000");
})