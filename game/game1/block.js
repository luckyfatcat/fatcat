var Block = function(position) {
	//position格式[0,0,1] (x,y,生命值)
	var p = position;
	var image = imageFromPath("./images/block.png");
	var o = {
		image: image,
		x: p[0],
		y: p[1],
		alive: true,
		lifes: p[2] || 1

	};
	o.intersect = function(a, b) {
		if(a.y < b.y + b.image.height && a.y + a.image.height > b.y && a.x>b.x && a.x < b.x+b.image.width) {
			return true;
		}
		return false;
	}
	o.collide = function(b) {
		return o.alive && (o.intersect(o, b) || o.intersect(b, o))
	}
	o.kill = function() {
		o.lifes--;
		if(o.lifes === 0) {
			o.alive = false;
		}
	}
	return o;
};