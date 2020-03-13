const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const game = require("./game");
var count = 0;
var lastAction;
var lastActionCount = 0;
http.createServer(function(req, res) {
	var mineUrl = url.parse(req.url);
	var query = querystring.parse(mineUrl.query);
	if(mineUrl.pathname === "/game") {
		if(count === 3) {
			res.writeHead(500);
			res.end("你太厉害了,我不和你玩了");
			return;
		}
		if(lastActionCount>=3) {
			res.writeHead(500);
			res.end("你作弊,不和你玩儿");
			return;
		}
		var action = query.action;
		var result = game(action);
		if(lastAction && lastAction === action) {
			lastActionCount++;
		}else {
			lastActionCount = 0;
		}
		lastAction = action;
		if(result === -1) {
			res.writeHead(200);
			res.end("你输了");
		}else if(result === 0) {
			res.writeHead(200);
			res.end("平局");
		}else {
			count++;
			res.writeHead(200);
			res.end("你赢了");
		}
		return;
	}
	if(mineUrl.pathname === "/favicon.ico") {
		res.end();
		return;
	}
	if(mineUrl.pathname === "/") {
		console.log(__dirname)
		count = 0;
		lastActionCount = 0;
		fs.createReadStream(__dirname + "/index.html").pipe(res);
		
	}
}).listen(3000,function(){
	console.log("服务启动成功: ","http://localhost:3000");
})