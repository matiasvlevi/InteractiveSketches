class Cube {
	constructor(x, y, z, vx, vy, vz) {
		this.size = createVector(45, 45, 45);

		// Position et velocitée
		this.pos = createVector(x, y, z);
		this.vel = createVector(vx, vy, vz);
		
		// Rotation est velocitée angulaire
		this.rot = createVector(0, 0, 0);
		this.rotVel = createVector(0, 0, 0);
	}

	addRotation() {
		this.rot.add(this.rotVel);
		this.rotVel.mult(0.98);
	}

	addPosition() {

		this.vel.y += 0.8;

		if (this.pos.x > 300 || this.pos.x < -300) {
			// collision mur en X
			this.vel.x = -this.vel.x;
			if (this.pos.x < 0) this.rotVel.x += 0.02;
			else this.rotVel.x -= 0.02;
		}

		if (this.pos.y > 300 || this.pos.y < -300) {
			// collision mur en Y
			this.vel.y = -this.vel.y;
			if (this.pos.y < 0) this.rotVel.y += 0.02;
			else this.rotVel.y -= 0.02;
		}

		if (this.pos.z > 300 || this.pos.z < -300) {
			// collision mur en Z
			this.vel.z = -this.vel.z;
			if (this.pos.z < 0) this.rotVel.z += 0.02;
			else this.rotVel.z -= 0.02;
		}

		this.pos.add(this.vel);
		this.vel.mult(0.98);
	}

	move() {
		this.addRotation();
		this.addPosition();
	}

	draw() {
		push();

		translate(this.pos.x, this.pos.y, this.pos.z);

		rotateX(this.rot.x);
		rotateY(this.rot.y);
		rotateZ(this.rot.z);

		fill(200, 180, 10);
		stroke(80, 50, 1);
		strokeWeight(1);
		//box(this.size.x, this.size.y, this.size.z);
		sphere(this.size.x, 10);
		
		pop();
	}
}