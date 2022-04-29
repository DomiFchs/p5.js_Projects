function Ship(){
    this.x = width/2;
    this.xDir = 0;
    
    this.show = function(){
        fill(255);
        rectMode(CENTER);
        rect(this.x, height-20, 60, 60);
    }

    this.move = function(dir){
        this.x += this.xDir * 5;
    }

    this.setDir = function(dir){
        this.xDir = dir;
    }
}