let angle = 0;

let vcam = 0;
let cam = 0;

let prevMouseX, prevMouseY; 

const COUNT = 25;

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
  
  rotateY(cam);

  balls.forEach(ball => {
    push();
    stroke(ball.color);
    strokeWeight(1);
    translate(ball.pos)
    rotateY(angle*ball.speed);
    rotateX(ball.angle);
    sphere(ball.size);
    pop();   
  })

  angle += 0.01;

  cam += vcam * 0.01;
  vcam *= 0.986;
}

function touchStarted() {
  prevMouseX = mouseX;
  prevMouseY = mouseY;
}

function touchMoved() {
  let dx = (mouseX - prevMouseX) * 0.005;
  let dy = (mouseY - prevMouseY) * 0.005;

  vcam += Math.abs(dx) > Math.abs(dy) ? dx : dy;
  
  // update previous mouse positions
  prevMouseX = mouseX;
  prevMouseY = mouseY;
  
  return false;
}