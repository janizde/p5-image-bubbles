import quicksettings from 'quicksettings';

export default function createControls(onUpdate) {
  const config = {
    SEED_COUNT: 1000,
    VARIATION: 5e-5,
    BUBBLE_BUFFER: 2,
    BUBBLE_OPACITY: 255,
    IMAGE: 'cat.jpg',
    BACKGROUND: 'white',
    GROWTH_RATE: 0.5,
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
  settings.bindRange("SEED_COUNT", 10, 10000, 1000, 1, config);
  settings.bindRange("VARIATION", 5e-5, 0.05, 5e-5, 1e-5, config);
  settings.bindRange("BUBBLE_BUFFER", -50, 50, 2, 1, config);
  settings.bindRange("BUBBLE_OPACITY", 0, 255, 255, 1, config);
  settings.bindRange("GROWTH_RATE", 0.05, 5, 0.5, 0.01, config);
  settings.bindDropDown("IMAGE", images, config);
  settings.bindDropDown("BACKGROUND", backgroundColors, config);
  settings.addButton("Apply", () => {
    onUpdate({
      ...config,
    });
  });
}
