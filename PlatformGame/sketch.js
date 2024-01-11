let player;
let boxes = [];
let coins = [];
let N = 300;
let COINS = 150;

function setup() {
	createCanvas(innerWidth, innerHeight);
	player = new Player(width/2, 400);

	// Boite du sol
	boxes.push(new Box(0, height-100, width * 10, 100));

	for (let i = 0; i < N; i++) {
		boxes.push(new Box(
			random(0, width * 10),
			random(height-850, height),

			random(100, 300),
			random(25, 100)
		));
	}

	for (let i = 0; i < COINS; i++) {
		coins.push(
			new Coin(random(0, 1920 * 5), random(200, 800))
		)
	}

	frameRate(60);
}

function draw() {
	player.inputs();
	player.move();

	player.boxCollision(boxes);
	player.checkAllCoins(coins);

	worldOffset += worldOffsetVel;
	worldOffsetVel *= 0.92;

	background(51);
	
	player.draw();

	boxes.forEach(box => {
		box.draw();
	});

	coins.forEach(coin => {
		coin.draw();
	});
}