
var s;
var scl = 20;
var food;

function setup() {
  createCanvas(600, 600);
  s = new Snake();
  frameRate(10);
  pickLocation();
}

function draw() {
  background(51);
  
  if(s.eat(food)){
    pickLocation();
  }

  s.death();
  s.update();
  s.show();

  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
}

function pickLocation(){
  var cols = floor(width/scl);
  var rows = floor(height/scl);

  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}
function keyPressed(){
  if(keyCode === UP_ARROW && s.Edir !== "d"){
    s.dir(0,-1);
    s.Edir = "u";
  }
  else if (keyCode === DOWN_ARROW && s.Edir !== "u"){
    s.dir(0,1);
    s.Edir = "d";
  }
  else if(keyCode === LEFT_ARROW && s.Edir !== "r"){
      s.dir(-1,0);
      s.Edir = "l";
  }
  else if(keyCode === RIGHT_ARROW && s.Edir !== "l"){
    s.dir(1,0);
    s.Edir = "r";
  }
}



