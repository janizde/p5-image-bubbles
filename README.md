# Image Bubbles

This is a project based on p5.js and inspired by Daniel Shiffman's [Coding Challenge on Circle Packing](http://bit.ly/2qPyMiJ) dealing with circle packing based on image edge detection with the help of the [Sobel operator](http://bit.ly/2qalITV).

> The sketch has been bootstrapped with the [generator-p5-webpack for Yeoman](http://bit.ly/2qPAhgF).

## Contents

* [How it works](#how-it-works)
* [Parameters](#parameters)
* [Running the project locally](#running-locally)
* [License](#license)

## <a name="how-it-works"></a>How it works

The basic idea is to spawn bubbles randomly on a canvas and let them grow until they hit another bubble so they never overlap each other.

In this specific project an arbitrary image is loaded into the p5 environment and then analyzed by the [sobel package on npm](http://bit.ly/2qa4PIV). The Sobel operator is then used to detect edges in the image. It results in a grayscale image emphasizing edges.

Each pixels value is then interpreted as a probability for a bubble to spwan at this specific pixel. When there is no change in the image at a specific pixel, it is very unlikely for a bubble to spawn there whereas it is very likely that a bubble will spawn at a pixel that lies on an edge in the image.

Each bubble is has the exact same color of the pixel it originated at in the original image.

During initialization 1.000 bubbles are generated and 10 more are added in each animation frame. When there is not so much space left and the algorithm did not find a matching origin in 10.000 tries, the try to spawn a bubble is discarded.

When clicking in a free spot, a new bubble is spawned regardless of the probability that pixel was assigned.

## <a name="parameters"></a>Parameters

|Name|Description|
|----|-----------|
|`SEED_COUNT`|The number of bubbles that are trying to be generated during initialization.|
|`PROBABILITY_THRESHOLD`|Offset of minimum and maximum probability of a bubble spawning at a certain pixel. E.g. when set to 0.05 the probability for a bubble to spawn at a specific pixel is in the range of 0.05 to 0.95. Tweaking this parameter has the effect that there might still be the possibility for a bubble to spawn in a specific spot although there is no change.|
|`BUBBLE_DISTANCE`|The minimum distance that to bubbles must be away from each other. May also be a negative value to allow overlapping.|
|`BUBBLE_OPACITY`|Opacity of each bubble between 0 and 255. This has a nice effect when `BUBBLE_DISTANCE` is negative.|
|`GROWTH_RATE`|The amount of size the radius of each bubble increases per animation frame.|
|`IMAGE`|An image preset|
|`BACKGROUND`|The sketche's background color. Either white or black.|

## <a name="running-locally"></a>Running the project locally

To run the project locally you have to perform the following steps:

1. Clone the repository
2. `npm install`
3. `npm start`

## <a name="license"></a>License

GPL-3.0 © [Jannik Portz](http://jannikportz.de)
