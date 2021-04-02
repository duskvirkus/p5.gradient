import p5 from '../core/main';

// linear gradient

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

export default p5;
