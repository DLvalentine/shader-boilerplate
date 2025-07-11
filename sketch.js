let s;
let vertShader;
let fragShader;

// Quick and dirty way to inject lygia functions. It currently can't inject function dependencies (e.g. if a space func depends on a math func), so you'll just need to include the dependencies yourself nbd
// NOTE: You need to declare precision BEFORE your includes.
// NOTE: lygia should exist outside of this directory, in its own dir. Be sure to change base if you move it
// NOTE: You must include the extension ex. #include "color/desaturate.glsl"
async function loadShaderWithIncludes(path, base = './', ignoreDeps = false){
  const code = await fetch(path).then(res => res.text());
  const lines = code.split('\n');
  const processed = await Promise.all(lines.map(async line => {
    const match = line.match(/#include\s+"(.+?)"/);
    if (match && !ignoreDeps) {
      const includePath = base + match[1];
      return await loadShaderWithIncludes(includePath, base, true);
    } else if (match && ignoreDeps){
      return '';
    } else {
      return line;
    }
  }));
  return processed.join('\n');
};


async function preload() {
  vertShader = await loadShaderWithIncludes('shader.vert', '../lygia/');
  fragShader = await loadShaderWithIncludes('shader.frag', '../lygia/');
  s = await new p5.Shader(this._renderer, vertShader, fragShader);
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
