let angle = 0;

let vcam = 0;
let cam = 0;

let prevMouseX, prevMouseY; 

const COUNT = 1;

const balls = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  
  noFill();
  stroke(10, 255, 80);
  strokeWeight(2);

  for (let i = 0; i < COUNT; i++) {
    balls.push({
      size: random(35, 100),
      pos: createVector(
        random(-400, 400),
        random(-400, 400),
        random(-400, 400)
      ),
      color: color(
        random(0, 100),
        random(100, 255),
        random(100, 215)
      ),
      angle: random(-0.3, 0.3),
      speed: random(0.004, 0.01)
    })
  }
}

function draw() {
  background(51);
  
  //rotateY(cam);

  push();
  stroke(10, 255, 100);
  strokeWeight(1);
  translate(0, 0, 400)
  rotateY(angle);
  rotateX(0.1);
  sphere(200);
  pop();   

  angle += 0.01;

  cam += 0.01;
}
