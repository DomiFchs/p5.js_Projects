function Enemy(diff, count){
    this.x = diff + (diff + 60) * count;
    this.y = 50;
    this.r = 30;
    this.hp = 100;
    
    this.xDir = 1;


    this.show = function(){
        fill(255);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    this.getDamage = function(){
        this.hp -= 40;
        
    }

    this.move = function(){
        this.x = this.x + this.xDir;
    }

    this.shiftDown = function(){
        this.xDir *= -1;
        this.y += this.r;
    }
}