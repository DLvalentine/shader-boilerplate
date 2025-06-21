precision mediump float; // setting the precision

// uniforms set from application code
uniform vec2 u_mouse; // mouse x/y pos
uniform float u_time; // time since starting the drawing

varying vec2 pos; // represents screen space pixel location, normalized from 0-1

// This makes a fun color gradient using some uniforms passed from P5 and a varying from our vert shader
void main() {
  vec3 color = vec3(u_mouse.x, pos.y, u_time * 0.75);
  gl_FragColor = vec4(abs(sin(color)), 1.0); // "output", what the frag color should be
}
