let worldOffset = 0;
let worldOffsetVel = 0;

class Box {
	constructor(x, y, w, h, r=255, g=255, b=255) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.color = color(r,g,b);
	}

	draw() {
		noStroke();
		fill(this.color);
		rect(this.getXWithOffset(), this.y, this.w, this.h);
	}

	getXWithOffset() {
		return this.x + worldOffset;
	}

	static edge(a, b, t) {
		return Math.abs(a - b) < t
	}

	collision(player) {
		
		// Si on est en haut/bas de la boite
		let isInXRange = (
			player.x >= this.getXWithOffset() -          (player.size / 2) &&
			player.x <= this.getXWithOffset() + this.w + (player.size / 2)
		);

		// Si on est aux cotés gauche droite de la boite
		let isInYRange = (
			player.y >= this.y -          (player.size / 2) && 
			player.y <= this.y + this.h + (player.size / 2)
		);


		if (isInXRange) {
			let isCollidingTop = Box.edge(player.y, this.y - (player.size / 2) + 8, 8);
			let isCollidingBottom = Box.edge(player.y, this.y + this.h + (player.size / 2) - 8, 8);

			if (isCollidingBottom) {
				// rebondir vers le bas!
				console.log('BOTTOM')
				player.ay += -1.5 * player.vy;
				player.vy = 0;

				player.y = max(player.y, this.y + this.h + (this.size / 2));
				player.move();



				return true;
			} else if (isCollidingTop) {
				// s'arreter
				player.ay = 0;
				player.vy = 0;

				// permettre de sauter
				player.canJump = true;

				// limiter
				player.y = min(player.y, this.y - (player.size / 2));

				return true;
			}
		}

		// Les cotés
		if (isInYRange) {
			let isCollidingLeft = Player.approx(player.x , this.getXWithOffset() - (player.size / 2.5) + 10, 10);
			let isCollidingRight = Player.approx(player.x , this.getXWithOffset() + this.w + (player.size / 2.5) - 10, 10);

			if (isCollidingLeft) {
				// Coté gauche
				worldOffsetVel = -0.99 * worldOffsetVel;
				//worldOffset = min(worldOffset, this.getXWithOffset() - (this.size / 2));
				player.canJump = true;
				return true;

			} else if (isCollidingRight) {
				worldOffsetVel = -0.99 * worldOffsetVel;
				//worldOffset = max(worldOffset, this.getXWithOffset() + this.w + (this.size / 2));
				player.canJump = true;
				return true;
			}
		}

		return true;
	}
}