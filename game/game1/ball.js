var Ball = function() {
	var image = imageFromPath("./images/ball.png");
	var o = {
		image: image,
		x: 100,
		y: 250,
		speedX: 8,
		speedY: 8,
		fired: false,

	};
	o.collide = function(game) {
		if(o.x  <0 || o.x + o.image.width > game.canvas.width) {
			o.speedX = -o.speedX;
		}
		if(o.y < 0||o.y + o.image.height > game.canvas.height) {
			o.speedY = -o.speedY;
		}
	}
	o.fire = function() {
		o.fired = true;
	}
	o.move = function() {
		
	}
	o.rebound = function(obj) {
		
		o.speedY = -o.speedY;
	}
	return o;
};