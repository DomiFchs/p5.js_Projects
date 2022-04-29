var tree = [];
var leaves = [];
var count = 0;
var fall = false;
var treeheight = 8;

function setup() {
  frameRate(3);
  createCanvas(400, 400);
  var a = createVector(width/2, height);
  var b = createVector(width/2, height - 100);
  var root = new Branch(a,b);

  tree[0] = root;


}

function draw() {
  background(51);

  for(var i = 0; i < tree.length; i++){
    tree[i].show();
  }

  if(count >= 4)
  {
    if(count <= treeheight){
      for(var i = 0; i < tree.length; i++){
        if(!tree[i].finished){
          var leaf = tree[i].end.copy();
          leaves.push(leaf);
        }
      }
    }
  }

  if(count <= treeheight - 1){

    for(var i = tree.length - 1; i >= 0; i--){
      
      if(!tree[i].finished){
        tree.push(tree[i].branchR());
        tree.push(tree[i].branchL());
      }
      tree[i].finished = true;
    }
  }
  if(count <= treeheight){
    count ++;
  }

    for(var i = 0; i < leaves.length; i++){
      noStroke();
      fill(0,150,0);
      ellipse(leaves[i].x, leaves[i].y, 4, 8);
    }


  if(fall){
    frameRate(60);
    for(var i = 0; i < leaves.length; i++){
      if(leaves[i].y < height){
        leaves[i].y += random(0,1);
      }
    }
  }
}

function mousePressed(){

  if(count === treeheight + 1){
    fall = true;
  }
}


function Branch(begin, end){
  this.begin = begin;
  this.end = end;
  this.finished = false;

  this.show = function(){
    stroke(255);
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  }

  this.branchR = function(){
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(PI/random(4,8));
    dir.mult(.67);
    var newEnd = p5.Vector.add(this.end, dir);
    var right = new Branch(this.end, newEnd);
    return right;
  }
  this.branchL = function(){
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(-PI/random(4,8));
    dir.mult(.67);
    var newEnd = p5.Vector.add(this.end, dir);
    var left = new Branch(this.end, newEnd);
    return left;
  }
}
