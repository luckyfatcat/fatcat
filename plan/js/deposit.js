var plan = new Plan();
var percentage;
var progressSpan = document.querySelector(".plan_progress_val");
var progress = document.querySelector("progress");
var iframe = document.getElementById("id_iframe");
var callback = function(event,plan) {
	event = event || window.event;
	var checked = event.target.checked;
	var id = event.target.dataset.id;
	var progress_val;//进度百分比
	plan.situation[id] = checked;//完成情况
	plan.count_complete = countChecked(plan.situation);//完成总数
	progress_val =  plan.getProgress();
	progressSpan.innerHTML = progress_val;
	progress.value = parseInt(progress_val);
};
plan.init(".plan_check");
iframe.addEventListener("load",function(event){
	var text = JSON.parse(event.target.contentDocument.documentElement.innerText);
	console.log(text.message);
})
//绑定目标选中事件
arrAddListener(plan.checks,"change",function(){
	callback(event, plan);
});
