//rock_scissors_paper
var mineAction = process.argv[process.argv.length - 1];
var game = require("./game");
var count = 0;
process.stdin.on("data",e=>{
	var result = game(e.toString().trim())
	console.log("结果:",result);
	if(result === 1) {
		count++;
	}
	if(count === 3) {
		console.log("你太厉害了,我不玩了!");
		process.exit();
	}
})
// console.log(mineAction,computerAction)