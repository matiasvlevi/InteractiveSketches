
let cubes = [];
let N = 10;

function setup() {
	createCanvas(innerWidth, innerHeight, WEBGL);

	for (let i = 0; i < N; i++) {
		cubes[i] = new Cube(
			30, 30, 30,
			random(-30, 30),
			random(-30, 30),
			random(-30, 30)
		);
	}

}

function draw() {
	background(51);

	for (let i = 0; i < cubes.length; i++) {
		cubes[i].move();
		cubes[i].draw();
	}

	noFill();
	stroke(255);
	box(600);
}

