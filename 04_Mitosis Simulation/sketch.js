var cells = [];

function setup() {
  createCanvas(600, 600);
  for(var i = 0; i <= 40; i++){
    cells.push(new Cell());
  }
}

function draw() {
  background(200);
  for(var i = 0; i < cells.length; i++){
    cells[i].move();
    cells[i].show();
  }
}

function mousePressed(){
  for(var i = cells.length - 1; i >= 0; i--){
    if(cells[i].clicked(mouseX,mouseY)){
      var cellA = cells[i].mitosis();
      var cellB = cells[i].mitosis();

      cells.push(cellA);
      cells.push(cellB);
      cells.splice(i,1);
    }
  }
}

function Cell(pos, r, c){


  this.r = r || random(40, 100);
  if(pos){
    this.pos = pos.copy();
  }
  else{
    this.pos = createVector(random(10 + this.r, width - this.r - 10), random(20 + this.r, height - this.r - 10));
  }
  this.c = c || color(random(255),0, random(100, 255), 100);

  this.move = function(){
    var velocity = p5.Vector.random2D();
    this.pos.add(velocity);
  }

  this.show = function(){
    noStroke();
    fill(this.c);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }

  this.clicked = function(x,y){
    var d = dist(this.pos.x, this.pos.y, x, y);
    if(d < this.r){
      return true;
    }
    else{
      return false;
    }
  }

  this.mitosis = function(){
    this.pos.x += random(-this.r*0.8, this.r*0.7);
    var cell = new Cell(this.pos, this.r/random(1.3,2), this.c);
    return cell;
  }
}