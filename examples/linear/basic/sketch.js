
const boarder = 100;
let size;

function setup() {
  createCanvas(400, 400, WEBGL);

  size = width - boarder * 2;
}

function draw() {
  background(0, 0, 255);

  gradientFill();

  rect(boarder, boarder, size, size);

  fill(0, 255, 255);

  circle(100, 100, 100);
  
  noLoop();
}
