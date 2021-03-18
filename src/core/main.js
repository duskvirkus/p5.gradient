// p5.gradient.js

// library variables

p5.prototype._gradient = {};
p5.prototype._gradient.setupDone = false;
p5.prototype._gradient.shaders = {};
p5.prototype._gradient.texture = undefined;

// internal functions

p5.prototype._gradient.setup = function () {
  console.log('🌸 p5.gradient 🌸\nmade with 💜 by duskvirkus');

  noStroke();

  this.texture = createGraphics(1024, 1024, WEBGL);
  this.texture.noStroke();

  this.createLinearShader();
}

p5.prototype._gradient.pre = function () {
  if (!this._gradient.setupDone) {
    this._gradient.setup();
    this._gradient.setupDone = true;
  }
  translate(-width/2, -height/2);
};
p5.prototype.registerMethod('pre', p5.prototype._gradient.pre);

p5.prototype._gradient.renderTexture = function(shaderName) {
  if (shaderName === undefined) {
    throw new Error(`_gradient.renderTexture was expecting a shaderName argument but received undefined.`);
  } else if (!this.shaders.hasOwnProperty(shaderName)) {
    throw new Error(`${shaderName} was not found in this._gradient.shaders object.`);
  }
  this.texture.shader(this.shaders[shaderName]);
  this.shaders[shaderName].setUniform(
    'u_resolution',
    [
      this.texture.width,
      this.texture.height
    ]);
  this.texture.rect(
    0,
    0,
    this.texture.width,
    this.texture.height
  );
}

// public functions

p5.prototype.gradientFill = function () {
  // TODO Improve when to call renderTexture()
  this._gradient.renderTexture('linear');
  texture(this._gradient.texture);
};

// linear gradient
// TODO move to another file

p5.prototype._gradient.createLinearShader = function() {
  
  this.shaders.linear = createShader(
`// vert
#ifdef GL_ES
precision mediump float;
#endif

attribute vec3 aPosition;

void main() {
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0; 
  gl_Position = positionVec4;
}
`,
`// frag
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // This is passed in as a uniform from the sketch.js file

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy; 
  gl_FragColor = vec4(st.x,0.0,0.0,1.0); // R,G,B,A
}
`
  );

  this.shaders.linear._renderer = undefined;

}