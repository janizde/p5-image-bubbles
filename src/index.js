import p5 from 'p5';

import createSketch, { createDefaultSketch } from './sketch';
import createControls from './controls';

let currentSketch = new p5(createDefaultSketch());

createControls(config => {
  currentSketch.remove();
  currentSketch = new p5(createSketch(config));
});
