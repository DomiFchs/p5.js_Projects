var axiom = "F";
var sentence = axiom;
var len = 100;
var angle;

var rules = [];
rules[0] = {
  a:"F",
  b:"FF+[+F-F-F]-[-F+F+F]"
}


function generate(){
  var nextSentence = "";
  for(var i = 0; i < sentence.length; i++){
    var current = sentence.charAt(i);
    var found = false;
    for(var j = 0; j < rules.length; j++){
      if(current === rules[j].a){
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if(!found){
      nextSentence += current;
    }
  }

  sentence = nextSentence;
  turtle();
}

function turtle(){
  background(51);
  resetMatrix();
  translate(width/2, height);
  stroke(255);
  for(var i = 0; i < sentence.length; i++){
    var current = sentence.charAt(i);

    if(current === "F"){
      line(0,0,0, - len);
      translate(0, - len);
    }
    else if(current === "+"){
      rotate(angle);
    }
    else if(current === "-"){
      rotate(-angle);
    }
    else if(current === "["){
      push();
    }
    else if(current === "]"){
      pop();
    }
  }
  len *= .5;
}

function setup() {
  createCanvas(400,400);
  angle = radians(25);
  background(51);
  turtle();

  var button = createButton("generate");
  button.mousePressed(generate);
}
