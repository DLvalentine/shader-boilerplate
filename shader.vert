precision mediump float; // setting the precision

// r/o attributes - only available in fragment shaders
attribute vec3 aPosition; // world space for vertex
attribute vec2 aTexCoord; // coord for face we're rendering, in case we wanted to apply textures

// varying - read/write here, r/o in frag shader.
varying vec2 pos;

// uniform - variable from application code
uniform float u_time;

void main() {
  pos = aTexCoord; // Set pos to aTexCoord, which effectively makes it the normalized x/y position for the frag coord in a frag shader

  vec4 position = vec4(aPosition, 1.0); // 0 - 1 range of original position from application code
  position.xy = position.xy * 2.0 - 1.0; // normalization magic to make it from -1 - 1 range, which is expected in the vertex shader

  position.y += sin(u_time + position.x * 2.0)/2.0; // example of what we can do to vertices

  gl_Position = position; // "output" what the position should be for this vertex
}

