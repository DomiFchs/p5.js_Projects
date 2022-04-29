
let inc = 0.1;
var scl = 20;
var cols, rows;

var fr;

var zoff = 0;
var particles = [];
var flowField;

function setup() {
  createCanvas(600, 600);
  cols = floor(width/scl);
  rows = floor(height/scl);
  fr = createP('');

  flowField = new Array(cols * rows);

  for (let i = 0; i < 3000; i++) {
    particles[i] = new Particle();
  }
  background(255);
}

function draw() {
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      // let r = random(255);
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowField[index] = v;

      xoff += inc;
      stroke(0, 50);
      //push();
      //translate(x*scl, y*scl);
      //rotate(v.heading());
      //strokeWeight(1);
      //line(0,0,scl,0);
      //pop();
    }
    yoff += inc;
    zoff += 0.0003;
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowField);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  fr.html(floor(frameRate()));
}


function Particle(){
  this.pos = createVector(random(width),random(height));
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxspeed = 2;

  this.prevPos = this.pos.copy();

  this.update = function(){
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.applyForce = function(force){
    this.acc.add(force);
  }

  this.show = function(){
    stroke(0, 20);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  this.updatePrev = function(){
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  this.edges = function(){
    if(this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if(this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
      
    if(this.pos.y > height){
      this.pos.y = 0;
      this.updatePrev();
    } 
    if(this.pos.y < 0){
      this.pos.y = height;
      this.updatePrev();
    } 
  }

  this.follow = function(vectors){
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  }
}