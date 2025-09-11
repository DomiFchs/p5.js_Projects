function Drop(x, y){
    this.x = x;
    this.y = y;
    this.r = 8;
    this.deletable = false;
    
    this.show = function(){
        noStroke();
        fill(150,0,255);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    this.move = function(){
        this.y = this.y - 5;
    }

    this.hits = function(enemy){
        var d = dist(this.x, this.y, enemy.x, enemy.y);
        if(d < this.r + enemy.r){
            return true;
        }
        else{
            return false;
        }
    }

    this.deleteDrop = function(){
        this.deletable = true;
    }
}