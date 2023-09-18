
let spacing = 3;
let timer = 0;
let grid_length = 5;
let circle_diameter = grid_length * 20;
let delta = 0;
let pointsh = [];
let pointsv = [];
let path = [];
let pointsAll = [];
let bd = 8;
let graph;
const STEP = 1;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    graph = createGraphics(window.innerWidth, window.innerHeight);
    for (let i = 0; i < grid_length; i++) {
        pointsh.push(new Ball((circle_diameter + 20) * (i + 2), circle_diameter + 20, i));
    }
    for (let i = 0; i < grid_length; i++) {
        pointsv.push(new Ball(circle_diameter + 20, (circle_diameter + 20) * (i + 2), i));
    }
}

function draw() {

    if (timer > 35) {
        pointsAll = [];
        timer = 0;
    }
    translate(width/4, 0);
    background(51);
    stroke(255);
    noFill();
    for (let i = 0; i < grid_length; i++) {

        cx = (circle_diameter + 20) * (i + 2);
        cy = circle_diameter + 20;

        ellipse(cx, cy, circle_diameter, circle_diameter);
        ellipse(cy, cx, circle_diameter, circle_diameter);

        pointsh[i].render(delta, 1);
        pointsv[i].render(delta, 2);

        for (let j = 0; j < grid_length; j++) {
            pointsAll.push({ x: pointsh[i].pos.x, y: pointsv[j].pos.y });
        }

    }

    for (let i = 0; i < pointsAll.length; i++) {
        ellipse(pointsAll[i].x, pointsAll[i].y, 1, 1);
    }

    delta += 0.3;
    timer += 0.1;
}

class Ball {
    constructor(cx, cy, i) {
        this.pos = createVector(0, 0);
        this.cir = createVector(cx, cy);
        this.i = i;
        this.delay = (i + 1) * 0.1;
    }
    posV(v) {
        if (v == "x") {
            return this.pos.x;
        } else if (v == "y") {
            return this.pos.y;
        }

    }
    render(a, dir) {
        this.pos.x = sin(a * this.delay) * (circle_diameter / 2) + this.cir.x;
        this.pos.y = cos(a * this.delay) * (circle_diameter / 2) + this.cir.y;


        text(this.i, this.pos.x + 10, this.pos.y + 10);
        if (dir == 1) {
            line(this.pos.x, 0, this.pos.x, 800);
        } else if (dir == 2) {
            line(0, this.pos.y, 800, this.pos.y);
        }

        push();
        noStroke();
        fill(255);
        ellipse(this.pos.x, this.pos.y, bd, bd);
        pop();
    }
}