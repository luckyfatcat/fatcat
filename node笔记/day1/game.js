module.exports = function(mineAction) {
	var computerAction = Math.random() * 3;
if(computerAction < 1) {
	computerAction = "rock";
}else if(computerAction < 2) {
	computerAction = "paper";
}else {
	computerAction = "scissors";
}
if(computerAction === mineAction) {
	console.log("平局");
	return 0;
}else if(computerAction === "rock" && mineAction === "paper" || 
	computerAction === "paper" && mineAction === "scissors" ||
	computerAction === "scissors" && mineAction === "rock"

	) {
	console.log("你赢了");
	return 1;
}else {
	console.log("你输了");
	return -1;
}
}