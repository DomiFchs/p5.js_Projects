
var n1 = .7;
var n2 = .7;
var n3 = .7;
var m = 5;
var a = 1;
var b = 1;

var osc = 0;

function setup() {
  createCanvas(400, 400);
}

function supershape(theta){
  
  var part1 = (1 / a) * cos(theta * m / 4);
  part1 = pow(abs(part1), n2);

  var part2 = (1 / b) * sin(theta * m / 4);
  part2 = pow(abs(part2), n3);


  var part3 = pow(part1 + part2, 1/n1);

  if(part3 === 0){
    return 0;
  }

  return (1/part3);
}

function draw() {
  m = map(sin(osc), -1, 1, 0, 10);

  osc += .005;

  background(51);
  translate(width/2, height/2);


  stroke(255);
  noFill();

  var radius = 100;
  var total = 500;
  var increment = TWO_PI/total;
  beginShape();
  for(var angle = 0; angle < TWO_PI; angle += increment){
    var r = supershape(angle);
    x = radius * r * cos(angle);
    y = radius * r * sin(angle);

    vertex(x,y);
  }
  endShape(CLOSE);
}
