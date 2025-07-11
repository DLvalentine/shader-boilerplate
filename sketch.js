let s;

function preload() {
  s = loadShader('shader.vert', 'shader.frag');
};

function setup() {
  createCanvas(800, 600, WEBGL);
  noStroke();
};

function UpdateUniforms(s) {
  s.setUniform('u_mouse', [mouseX / width, mouseY / height]);
  s.setUniform('u_time', millis() / 1000.0);
};

function draw() {
  clear();
  shader(s);
  UpdateUniforms(s);
  ellipse(0, 0, width, height, 150);
};
