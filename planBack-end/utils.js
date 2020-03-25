const fs = require('fs');
function isExists(path) {
	fs.existsSync(path);
}
function getCurrentTime() {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	month = month >= 10?month: '0' + month;
	day = day >= 10?day: '0' + day;
	return `${year}-${month}-${day}`;
}

module.exports = {
	isExists: isExists,
	getCurrentTime: getCurrentTime
}