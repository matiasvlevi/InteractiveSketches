

class Boid {

  constructor() {
    this.position = createVector(width/2, height/2);
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    this.acceleration = createVector();
    this.maxForce = 0.1;
    this.maxSpeed = 10;
    this.angleBetween = 0;
  }

  edges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }

    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y/2 < 0) {
      this.position.y = height;

    }
  }

  align(boids) {
    let perceptionRadius = 25;
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );

      if (other != this && d < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }

    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return(steering);
  }

  cohesion(boids) {
    let perceptionRadius = 122;
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );

      if (other != this && d < perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }

    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return(steering);
  }

  separation(boids) {
    let perceptionRadius = 50;
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );

      if (other != this && d < perceptionRadius) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.mult(d*d);
        steering.add(diff);
        total++;
      }
    }

    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return(steering);
  }

  flock(boids) {
    this.acceleration.mult(0);
    let alignement = this.align(boids);
    let cohesion = this.cohesion(boids);
    let separation = this.separation(boids);

    alignement.mult(alignValue);
    cohesion.mult(cohesionValue);
    separation.mult(separationValue);

    this.acceleration.add(alignement);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
  }

  show() {

    stroke(255);



    push();
    translate(this.position.x, this.position.y);
    let v1Distance = dist(this.position.x, this.position.y, this.velocity.x, this.velocity.y);
    let v1 = createVector(this.position.x + v1Distance, this.position.y + v1Distance);
    this.angleBetween = v1.angleBetween(this.velocity);
    rotate(this.angleBetween - 180);
    strokeWeight(8);
    //stroke(0,0,255, 35);
    stroke(255);
    //point(-3, 0);
    strokeWeight(2);
    stroke(50,250,255);
    line(0, 0, -12, 0);
    strokeWeight(1);
    stroke(255);
    line(0, 0, 4, -6);
    line(0, 0, 4, 6);
    line(4, 6, - 14, 0);
    line(4, -6, - 14, 0);



    stroke(255,0,0, 35);
    //line(0, 0, v1.x * 0.02, v1.y * 0.02);
    stroke(0,255,0, 35);
    //line(0, 0, this.velocity.x * 20, this.velocity.y * 20);

    pop();

  }

}

const flock = [];
var flock_enable = false;


let alignValue = 6;
let cohesionValue = 3;
let separationValue = 4.7;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for (let i = 0; i < 30; i++) {
    flock.push(new Boid());
  }

}

function draw() {
  background(51);
  angleMode(DEGREES);

  for (let boid of flock) {
    boid.edges();

    boid.flock(flock);


    boid.show();
    boid.update();

  }
}
