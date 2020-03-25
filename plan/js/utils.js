const Host = "http://localhost:3000";
function ajax(method, url,callback, data,async) {
	var xhr = new XMLHttpRequest();
	data = data || null;
	async = async || true;
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			callback(JSON.parse(xhr.responseText));
		}
	}
	xhr.open(method, url, async);
	xhr.send(data);
}
function getCurrentTime() {
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	var h = d.getHours();
	var m = d.getMinutes();
	var s = d.getSeconds();
	month = month >= 10?month: '0' + month;
	day = day >= 10?day: '0' + day;
	h = h >= 10?h: '0' + h;
	m = m >= 10?m: '0' + m;
	s = s >= 10?s: '0' + s;
	return year + "-" + month + "-" + day + " " + h + ":" + m + ":" + s;
}
function arrAddListener(arr = [], eventType, callback, useCapture = false) {
	for(var i = 0; i < arr.length; i++) {
		arr[i].addEventListener(eventType, callback, useCapture);
	}
}
function countChecked(obj) {
	var count = 0;
	for(var i in obj) {
		if(obj[i]) {
			count++;
		}
	}
	return count;
}