function Plan() {
	this.checks;//
	this.count = 0;//事件总数
	this.count_complete = 0;//完成总数
	this.situation = {};//目标完成情况
}
Plan.prototype.init = function(className) {
	var checks = document.querySelectorAll(className);
	var _this = this;
	this.checks = checks;
	this.count = this.checks.length;
}
//获取完成进度(百分比)
Plan.prototype.getProgress = function() {
	if(this.count === 0) {
		return "0%"
	}
	var percentage = ((this.count_complete/this.count)*100).toFixed(0) + "%";
	return percentage;
}