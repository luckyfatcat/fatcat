var Game = function() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var o = {
		canvas: canvas,
		ctx: ctx,
		keys: {},
		keyActions: {},
	};
	window.addEventListener("keydown", function(event) {
		o.keys[event.key] = true;
	})
	window.addEventListener("keyup", function(event) {
		o.keys[event.key] = false;
	})
	o.registerActions = function(key, callback) {
		o.keyActions[key] = callback;
	}
	o.update = function() {
		
	}
	o.drawImage = function(obj){
		o.ctx.drawImage(obj.image, obj.x, obj.y);
	}
	o.drawText = function(text) {
		o.ctx.font = "20px Georgia";
		o.ctx.fillText(text, 10, 380);
	}
	o.drawBg = function() {
		o.ctx.save();
		ctx.fillStyle = "#eee";
		ctx.fillRect(0,0,o.canvas.width,o.canvas.height);
		o.ctx.restore();
	}
	setInterval(()=>{
		//update
		o.update();
		//clear
		o.ctx.clearRect(0, 0, canvas.width, canvas.height);
		//draw
		o.draw();
	}, 1000/30)
	return o;
};