import Sobel from 'sobel';

import Bubble from './Bubble';

export const defaultConfig = {
  SEED_COUNT: 1000,
  VARIATION: 5e-5,
  BUBBLE_BUFFER: 2,
  BUBBLE_OPACITY: 255,
  IMAGE: 'illu.jpg',
  BACKGROUND: 'white',
  GROWTH_RATE: 0.05,
};

export function createDefaultSketch() {
  return createSketch(defaultConfig);
}

export default function createSketch(config) {
  const {
    SEED_COUNT,
    VARIATION,
    BUBBLE_BUFFER,
    BUBBLE_OPACITY,
    IMAGE,
    BACKGROUND,
    GROWTH_RATE,
  } = config;

  return function sketch(s) {
    let
      image,
      width,
      height,
      backgroundColor;

    const sobelMap = [];
    const bubbles = [];

    s.preload = () => {
      image = s.loadImage(`/assets/${IMAGE}`);
    }

    s.setup = () => {
      // Set pixel density to 1, so that pixels from image are loaded in actual size
      s.pixelDensity(1);

      width = image.width;
      height = image.height;
      s.createCanvas(width, height);
      s.image(image, 0, 0);
      s.loadPixels();
      console.log(s.pixels.length);

      const backgroundMap = {
        black: s.color(0, 0, 0, 255),
        white: s.color(255, 255, 255, 255),
      };

      backgroundColor = backgroundMap[BACKGROUND];

      const sobelData = Sobel({
        width,
        height,
        data: s.pixels.slice(),
      });

      for (let x = 0; x < width; ++x) {
        for (let y = 0; y < height; ++y) {
          sobelMap[x + y * width] = s.map(sobelData[(x + y * width) * 4], 0, 255, VARIATION, 1 - VARIATION);
        }
      }

      // Set pixel density back to displayDensity for retina rendering
      s.pixelDensity(s.displayDensity());

      generateBubbles(SEED_COUNT);
    };

    s.draw = () => {
      s.background(backgroundColor);
      s.ellipseMode(s.RADIUS);

      bubbles.forEach((b) => {
        b.draw();

        if (b.isGrowing && b.hitsAny(bubbles, BUBBLE_BUFFER)) {
          b.isGrowing = false;
        }

        b.grow();
      });

      generateBubbles(10);
    };

    s.mousePressed = () => {
      const x = s.mouseX;
      const y = s.mouseY;

      const base = (x + y * width) * 4;
      const color = s.color(
        s.pixels[base],
        s.pixels[base + 1],
        s.pixels[base + 2],
        BUBBLE_OPACITY
      );

      const b = new Bubble(s, s.createVector(x, y), color, GROWTH_RATE);
      bubbles.push(b);
    };

    function generateBubbles(count) {
      for (let i = 0; i < count; ++i) {
        let x, y, b;
        outer: for (let j = 0; j <= 1000; ++j) {
          if (j === 1000) {
            return;
          }

          x = Math.floor(s.random(width));
          y = Math.floor(s.random(height));

          const sobel = sobelMap[x + y * width];
          if (Math.random() > sobel) {
            continue;
          }

          b = new Bubble(s, s.createVector(x, y), null, GROWTH_RATE);

          for (let k = 0; k < bubbles.length; ++k) {
            if (bubbles[k].hits(b, 5)) {
              continue outer;
            }
          }

          break;
        }

        const base = (x + y * width) * 4;
        b.color = s.color(
          s.pixels[base],
          s.pixels[base + 1],
          s.pixels[base + 2],
          BUBBLE_OPACITY
        );

        bubbles.push(b);
        ++i;
      }
    }
  }
}
