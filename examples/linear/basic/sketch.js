
const boarder = 100;
let size;

function setup() {
  createCanvas(400, 400, WEBGL);
  size = width - boarder * 2;
}

function draw() {
  background(0);

  gradientFill(color(255, 0, 0), color(127, 0, 255));
  rect(
    boarder,
    boarder,
    constrain(mouseX - boarder, size/2, size),
    constrain(mouseY - boarder, size/2, size)
  );

  fill(255);
  circle(100, 100, 100);
}
