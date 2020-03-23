function countInit() {
	var checks = document.querySelectorAll(".plan_check");
	var complete = {};
	var count;//完成数
	var callback = function(event) {
		var checked = event.target.checked;
		var id = event.target.dataset.id;
		complete[id] = checked;
		count = countChecked(complete);
		console.log(count)
	};
	arrAddListener(checks,"change",callback);
}