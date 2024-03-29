var cols, rows;
var res = 40;
var grid = [];
var current;

var stack = [];

function setup() {
  createCanvas(600, 600);
  cols = floor(width/res);
  rows = floor(height/res);

  frameRate(15);

  for(j = 0; j < rows; j++){
    for(i = 0; i < rows; i++){
      var cell = new Cell(i,j);
      grid.push(cell);
    } 
  }

  current = grid[0];
}

function draw() {
  background(51);

  for(i = 0; i < grid.length; i++){
    grid[i].show();
  }

  current.visited = true;
  current.highlight();

  var next = current.checkNeighbors();
  if(next){
    next.visited = true;

    stack.push(current);

    removeWalls(current, next);

    current = next;
  }
  else if (stack.length > 0){
    var cell = stack.pop();
    current = cell;
  }
}


function index(i,j){
  if(i < 0 || j < 0 || i > cols-1 || j > rows-1){
    return -1;
  }
  return i + j * cols;
}

function Cell(i,j){
  this.i = i;
  this.j = j;
  this.walls = [true,true,true,true];
  this.visited = false;

  this.show = function(){
    var x = this.i * res;
    var y = this.j * res;
    stroke(255);
    if(this.walls[0]){
      line(x,y, x + res, y);
    }
    if(this.walls[1]){
      line(x + res, y, x + res, y + res);
    }
    if(this.walls[2]){
      line(x, y + res, x + res, y + res);
    }
    if(this.walls[3]){
      line(x,y, x, y + res);
    }

    if(this.visited){
      noStroke();
      fill(130, 10, 255, 100);
      rect(x,y,res,res);
    }
  }

  this.checkNeighbors = function(){
    var neighbors = [];
    var top = grid[index(i, j - 1)];
    var right = grid[index(i + 1, j)];
    var bottom = grid[index(i, j + 1)];
    var left = grid[index(i - 1, j)];

    if(top && !top.visited){
      neighbors.push(top);
    }
    if(right && !right.visited){
      neighbors.push(right);
    }
    if(bottom && !bottom.visited){
      neighbors.push(bottom);
    }
    if(left && !left.visited){
      neighbors.push(left);
    }

    if(neighbors.length > 0){
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    }
    else{
      return undefined;
    }
  }

  this.highlight = function(){
    var x = this.i * res;
    var y = this.j * res;
    noStroke();
    fill(0,255,0,200);
    rect(x + 10,y + 10,res - 20,res - 20);
  }

}

function removeWalls(a, b){
  var x = a.i - b.i;

  if(x === 1){
    a.walls[3] = false;
    b.walls[1] = false;
  }
  else if( x === -1){
    a.walls[1] = false;
    b.walls[3] = false;
  }

  var y = a.j - b.j;

  if(y === 1){
    a.walls[0] = false;
    b.walls[2] = false;
  }
  else if( y === -1){
    a.walls[2] = false;
    b.walls[0] = false;
  }
}