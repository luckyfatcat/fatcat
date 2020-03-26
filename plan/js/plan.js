window.onload = function() {
	var action = "/" + location.href.split("?")[1].replace("action=","");
	var getDataAction = Host + action + "/get";
	var plan_form = document.querySelector("#plan_form");
	var callback = function(data) {
		var longTerm_text = document.querySelector(".longTerm_text");
		var shortTerm_text = document.querySelector(".shortTerm_text");
		var planContent = "";
		if(data.code === 0) {
			longTerm_text.innerHTML = data.message.longTerm;
			shortTerm_text.innerHTML = data.message.shortTerm;
		}
		data.message.plan.forEach(item=>{
			if(item.complete) {
				planContent+=`<div class="plan_today_item">
			<label>${item.text}<input class="plan_check" checked=${item.complete} type="checkbox" name="${item.key}" data-id="${item.key}"></label>
		</div>`;
			}else {
				planContent+=`<div class="plan_today_item">
			<label>${item.text}<input class="plan_check"  type="checkbox" name="${item.key}" data-id="${item.key}"></label>
		</div>`;
			}
			
		})
		plan_form.innerHTML = planContent;
		__main();
	};
	setAction(action + "/update");
	ajax('get',getDataAction,callback);
}
function Plan() {
	this.checks;//
	this.count = 0;//事件总数
	this.count_complete = 0;//完成总数
	this.situation = {};//目标完成情况
}
Plan.prototype.init = function(className) {
	var checks = document.querySelectorAll(className);
	this.checks = checks;
	this.count = this.checks.length;
	this.count_complete = 0;
	checks.forEach(item=>{
		if(item.checked) {
			this.count_complete++;	
		}
		this.situation[item.dataset.id] = item.checked;//完成情况
	})
	setProgress(this.getProgress());
}
//获取完成进度(百分比)
Plan.prototype.getProgress = function() {
	if(this.count === 0) {
		return "0%"
	}
	var percentage = ((this.count_complete/this.count)*100).toFixed(0) + "%";
	return percentage;
}
function setProgress(percentage) {
	var progressSpan = document.querySelector(".plan_progress_val");
	var progress = document.querySelector("progress");
	progressSpan.innerHTML = percentage;
	progress.value = parseInt(percentage);
}
function __main() {
	var plan = new Plan();

	var iframe = document.getElementById("id_iframe");
	var callback = function(event,plan) {
		event = event || window.event;
		var checked = event.target.checked;
		var id = event.target.dataset.id;
		var progress_val;//进度百分比
		plan.situation[id] = checked;//完成情况
		plan.count_complete = countChecked(plan.situation);//完成总数
		progress_val =  plan.getProgress();
		setProgress(progress_val);
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
}
function setAction(action) {
	var plan_form = document.getElementById("plan_form");
	plan_form.action = action;
}


