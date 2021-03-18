

function setup() {
  createCanvas(400, 400, WEBGL);
}

function draw() {
  background(0);

  gradientFill(color(255, 0, 0), color(127, 0, 255), -frameCount * 0.02);
  ellipse(width / 2, height / 2, 300, 300, 50);

  gradientFill(color(255, 0, 0), color(127, 0, 255), frameCount * 0.03);
  ellipse(width / 2, height / 2, 150, 150, 50);
}
