// p5.gradient.js

// library variables

p5.prototype._gradient = {};
p5.prototype._gradient.setupDone = false;
p5.prototype._gradient.shaders = {};
p5.prototype._gradient.texture = undefined;

// internal functions

p5.prototype._gradient.setup = function () {
  console.log('🌸 p5.gradient 🌸\nmade with 💜 by duskvirkus');
  // TODO assert webgl

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

p5.prototype._gradient.renderTexture = function(shaderName, colorNodes, angle) {
  if (shaderName === undefined) {
    throw new Error(`_gradient.renderTexture was expecting a shaderName argument but received undefined.`);
  } else if (!this.shaders.hasOwnProperty(shaderName)) {
    throw new Error(`${shaderName} was not found in this._gradient.shaders object.`);
  } else if (!Array.isArray(colorNodes) && colorNodes.length !== 2) {
    throw new Error(`_gradient.renderTexture an array of 2 color nodes.`);
  }
  this.texture.shader(this.shaders[shaderName]);
  this.shaders[shaderName].setUniform(
    'u_resolution',
    [
      this.texture.width,
      this.texture.height
    ]
  );
  this.shaders[shaderName].setUniform(
    'u_color0',
    [
      colorNodes[0].color.levels[0] / 255.0,
      colorNodes[0].color.levels[1] / 255.0,
      colorNodes[0].color.levels[2] / 255.0,
      colorNodes[0].color.levels[3] / 255.0
    ]
  );
  this.shaders[shaderName].setUniform(
    'u_color1',
    [
      colorNodes[1].color.levels[0] / 255.0,
      colorNodes[1].color.levels[1] / 255.0,
      colorNodes[1].color.levels[2] / 255.0,
      colorNodes[1].color.levels[3] / 255.0
    ]
  );
  this.shaders[shaderName].setUniform(
    'u_angle',
    angle ? angle : 0
  );
  this.texture.rect(
    0,
    0,
    this.texture.width,
    this.texture.height
  );
}

// public functions

p5.prototype.gradientFill = function (c1, c2, angle) {
  // TODO Improve when to call renderTexture()
  this._gradient.renderTexture(
    'linear',
    [{
      color: c1,
    },{
      color: c2,
    }],
    angle
  );
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

uniform vec2 u_resolution;
uniform vec4 u_color0;
uniform vec4 u_color1;
uniform float u_angle;

mat2 rotate2d(float _angle){
  return mat2(cos(_angle),-sin(_angle),
              sin(_angle),cos(_angle));
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st -= vec2(0.5);
  st = rotate2d(u_angle) * st;
  st += vec2(0.5);

  gl_FragColor = mix(u_color0, u_color1, st.x);
}
`
  );

  this.shaders.linear._renderer = undefined;

}