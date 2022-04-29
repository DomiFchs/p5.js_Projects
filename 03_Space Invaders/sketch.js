var ship;
var enemies = [];
var drops = [];

function setup() {
  createCanvas(600, 400);
  ship = new Ship();
  for(var i = 0; i<5; i++){
    enemies[i] = new Enemy(60, i);
  }
}

function draw() {
  background(51);
  ship.show();
  ship.move();
  for(var i = 0; i < drops.length; i++){
    drops[i].show();
    drops[i].move();

    for(var j = 0; j < enemies.length; j++){
      enemies[j].show();
      if(drops[i].hits(enemies[j])){
        enemies[j].getDamage();
        drops[i].deleteDrop();
      }
    }
  }
  var edge = false;
  for(var i = 0; i < enemies.length; i++){
    enemies[i].show();
    enemies[i].move();

    if(enemies[i].x > width || enemies[i].x < 0){
      edge = true;
    }
  }

  if(edge){
    for(var i = 0; i < enemies.length; i++){
      enemies[i].shiftDown();
    }
  }

  for(var i = drops.length-1; i >= 0; i--){
    if(drops[i].deletable){
      drops.splice(i,1);
    }
  }
}

function keyReleased(){
  if(key != ' '){
    ship.setDir(0);
  }
}

function keyPressed(){

  if(key == ' '){
    var drop = new Drop(ship.x, 340);
    drops.push(drop);
  }


  if(keyCode === RIGHT_ARROW){
    ship.setDir(1);
  }
  if(keyCode === LEFT_ARROW){
    ship.setDir(-1);
  }
}
