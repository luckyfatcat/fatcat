var iframe = document.getElementById("iframe");
var timeContainer = document.querySelector(".page_time span");
setCurrentTime();
function setCurrentTime() {
	var time = getCurrentTime();
	timeContainer.innerHTML = time;
	setTimeout(setCurrentTime,1000);
}

function changePage(event, href) {
	var active_menu = document.querySelector(".active_menu");
	if(active_menu) {
		active_menu.className = active_menu.className.replace(/active_menu/g, "");
	}
	event.target.className =  event.target.className + " active_menu";
	iframe.src = href; 
}
function setProgress() {
	console.log(plan);
	var progress = "";
}