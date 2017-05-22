import quicksettings from 'quicksettings';

import { defaultConfig } from './../sketch';

export default function createControls(onUpdate) {
  const config = {
    ...defaultConfig,
  };

  const images = [
    'cat.jpg',
    'forest.jpg',
    'illu.jpg',
    'illu-2.jpg',
    'illu-3.jpg',
    'illu-4.jpg',
    'illu-5.jpg',
    'illu-6.jpg',
    'marienkaefer.jpg',
    'portrait.jpg',
    'text.png',
    'coca-cola.jpg',
    'apple.jpg',
    'apple-outline.png',
  ];

  const backgroundColors = [
    'white',
    'black',
  ];

  const settings = quicksettings.create();
  settings.bindRange("SEED_COUNT", 10, 10000, defaultConfig.SEED_COUNT, 1, config);
  settings.bindRange("VARIATION", 5e-5, 0.05, defaultConfig.VARIATION, 1e-5, config);
  settings.bindRange("BUBBLE_BUFFER", -50, 50, defaultConfig.BUBBLE_BUFFER, 1, config);
  settings.bindRange("BUBBLE_OPACITY", 0, 255, defaultConfig.BUBBLE_OPACITY, 1, config);
  settings.bindRange("GROWTH_RATE", 0.005, 5, defaultConfig.GROWTH_RATE, 0.01, config);
  settings.bindDropDown("IMAGE", images, config);
  settings.bindDropDown("BACKGROUND", backgroundColors, config);
  settings.addButton("Apply", () => {
    onUpdate({
      ...config,
    });
  });
}
