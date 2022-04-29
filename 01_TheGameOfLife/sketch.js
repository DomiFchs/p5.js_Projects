
function Make2DArray(cols, rows){
  let arr = new Array(cols);

  for (let i = 0; i < arr.length; i++){
    arr[i] = new Array(rows);
  }

  return arr;
}


let grid;
let width = 700;
let height = 700;
let cols;
let rows;
let resolution = 4;

function setup() {
  createCanvas(width, height);
  cols = width / resolution;
  rows = height / resolution;
  grid = Make2DArray(cols, rows);
  for(x = 0; x < cols; x++){
    for(y = 0; y < rows; y++){
      grid[x][y] = floor(random(2));
    }
  }
}

function draw(){
  background(0);

  for(x = 0; x < cols; x++){
    for(y = 0; y < rows; y++){
      let i = x * resolution;
      let j = y * resolution;
      if(grid[x][y] == 1){
        fill(255);
        stroke(0);
        rect(i,j, resolution-1, resolution-1);
      }
    }
  }

  let next = Make2DArray(cols, rows);

  
  for(x = 0; x < cols; x++){
    for(y = 0; y < rows; y++){

        let state = grid[x][y];

        let sum = 0;
        let neighbors = countNeighbors(grid, x, y)
        
        if(state == 0 && neighbors == 3){
          next[x][y] = 1;
        }
        else if(state == 1 && (neighbors < 2 || neighbors > 3)){
          next[x][y] = 0;
        }
        else{
          next[x][y] = state;
        }
    }
  }
  grid = next;
}

function countNeighbors(grid, x, y){
  let sum = 0;
    for(let i = -1; i < 2; i++){
      for(let j = -1; j < 2; j++){

        let col = (x + i + cols) % cols;
        let row = (y + j + rows) % rows;


        sum += grid[col][row];
      }
    }

    sum-= grid[x][y];
    return sum;
}