var Plank = function() {
		var image = imageFromPath("./images/plank.png");
		var o = {
			image: image,
			x: 100,
			y: 300,
			speed: 15,

		};
		o.moveLeft = function() {
			o.x -= o.speed;
		};
		o.moveRight = function() {
			o.x += o.speed;
		}
		o.collide = function(ball) {
			if(ball.y + ball.image.height > o.y && ball.y + ball.image.height < o.y + o.image.height && ((ball.x+ball.image.width > o.x && ball.x < o.x ) || (ball.x < o.x + o.image.width && ball.x > o.x))) {
				return true;
			}

			return false;
		}
		return o;
	};