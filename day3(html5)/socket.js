const WebSocket = require("ws");
const ws = new WebSocket.Server({port: 3000}, ()=>{
	console.log('socket start');
})

let clients = [];
var id = 0;
ws.on('connection',client=>{
	id++;
	clients.push({client:client,id:id});
	client.send("客户端:" + id + "连接成功");
	client.on('message', msg=>{

		msg = JSON.parse(msg);
		if(typeof msg === 'string') {
			client.send(msg);
		}else {
			var targetId = msg.targetId;
			var targetClient = clients.filter(item=>{
				return item.id == targetId;
			})[0];

			console.log(`来自客户端${id}的数据:`,msg.msg);
			// console.log(targetClient.client)
			targetClient.client.send(msg.msg);
		}
		
	})
	client.on('close', msg=>{
		console.log("关闭连接");
	})
})