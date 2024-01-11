class Coin {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	draw() {
		fill(200, 200, 50);
		circle(this.x + worldOffset, this.y, 8);
	}
}