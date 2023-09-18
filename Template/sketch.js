const SPEED = 0.1;
const REPULSION = 90;
const COUNT = 900;
const particles = [];

let dir = SPEED;

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
  }
  
  update() {
    
    // Compute distance
    let d = dist(
      mouseX,
      mouseY,
      this.pos.x,
      this.pos.y
    );
    
    if (mouseIsPressed) {
      dir = -SPEED / random(1, 4);
    } else {
      dir = SPEED;
    }
    
    // Repulse
    if (d < REPULSION) {
      this.vel.x -= dir * (mouseX - this.pos.x);
      this.vel.y -= dir * (mouseY - this.pos.y); 
    }
    
    // bounce on edges
    if (this.pos.x > width || this.pos.x < 0)
      this.vel.x = -this.vel.x;
    
    if (this.pos.y > width || this.pos.y < 0)
      this.vel.y = -this.vel.y;
    
    // Apply velocity
    this.pos.add(this.vel);
    
    // Friction
    this.vel.mult(0.8);
  }
  
  draw() {
    circle(this.pos.x, this.pos.y, 8);
  }
}

function setup() {
  createCanvas(600, 600);

  for (let i = 0; i < COUNT; i++) {
    particles.push(
      new Particle(
        random(0, width),
        random(0, height)
      )
    );
  }
}

function draw() {
  background(51);
  
  noStroke();
  fill(255, 155);
  
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  
  noFill();
  stroke(255);
  
  circle(mouseX, mouseY, REPULSION*2 - 4)
}