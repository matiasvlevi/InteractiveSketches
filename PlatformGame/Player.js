
class Player {
	constructor(x, y) {
		// Pos
		this.x = x;
		this.y = y;

		// Vel
		this.vx = 0;
		this.vy = 0;

		// Acc
		this.ax = 0;
		this.ay = 0;

		this.size = 32;

		this.score = 0;

		this.canJump = false;
	}

	inputs() {
		// KEYBOARD INPUT
		if (keyIsDown(UP_ARROW)) {
			if (this.canJump) {
				this.ay -= 20;
				this.y -= 1;
				this.move();
			};
			this.canJump = false;
		}

		if (keyIsDown(DOWN_ARROW)) {
			this.vy = this.vy + 1;
		}

		if (keyIsDown(LEFT_ARROW)) {
			// this.vx = this.vx - 1;
			worldOffsetVel += 1;
		}

		if (keyIsDown(RIGHT_ARROW)) {
			// this.vx = this.vx + 1;
			worldOffsetVel -= 1;
		}
	}

	draw() {
		stroke(100);
		strokeWeight(3);
		fill(`#88e03d`);
		circle(this.x, this.y, this.size);

		line(
			this.x, this.y,
			this.x - worldOffsetVel * 3,
			this.y - this.vy * 3
		);

		fill(255);
		noStroke();
		text('Score: ' + this.score, 30, 30)
	}

	static approx(a, b, t) {
		return Math.abs(a - b) < t
	}

	boxCollision(boxes) {
		let allowInvert = true;
		boxes.filter(box => (box.x + worldOffset) < 1920).forEach(box => {
			allowInvert = box.collision(this);
		});
	}


	checkAllCoins(coins) {
		coins.forEach((coin, i) => {
			if (this.collisionCoin(coin.x, coin.y)) {
				this.score ++;
				coins.splice(i, 1);
			}
		});
	}

	collisionCoin(cx, cy) {
		let d = dist(this.x, this.y, cx + worldOffset, cy);

		if (d < (this.size/2 + 4)) {
			return true;
		}

		return false;
	}

	move() {
		this.vy += 0.6;

		this.vx = this.vx + this.ax;
		this.vy = this.vy + this.ay;

		this.vx = min(max(-10, this.vx), 10);
		this.vy = min(max(-20, this.vy), 10);

		this.x = this.x + this.vx;
		this.y = this.y + this.vy;

		this.vx = this.vx * 0.96;
		this.vy = this.vy * 0.96;

		this.ax = 0;
		this.ay = 0;
	}
}