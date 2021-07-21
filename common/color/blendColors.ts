import type { RgbaArray } from '../types';

/**
 * The overlayColor value must have an alpha less than 1 in order to output a different color.
 * @param underlayColor rgbaArray
 * @param overlayColor  rgbaArray
 * @returns rbgString
 */
export const blendColors = (underlayColor: RgbaArray, overlayColor: RgbaArray) => {
  const mix = [];
  mix[3] = 1 - (1 - overlayColor[3]) * (1 - underlayColor[3]); // alpha
  // red
  mix[0] = Math.round(
    (overlayColor[0] * overlayColor[3]) / mix[3] +
      (underlayColor[0] * underlayColor[3] * (1 - overlayColor[3])) / mix[3],
  );
  // green
  mix[1] = Math.round(
    (overlayColor[1] * overlayColor[3]) / mix[3] +
      (underlayColor[1] * underlayColor[3] * (1 - overlayColor[3])) / mix[3],
  );
  // blue
  mix[2] = Math.round(
    (overlayColor[2] * overlayColor[3]) / mix[3] +
      (underlayColor[2] * underlayColor[3] * (1 - overlayColor[3])) / mix[3],
  );

  return `rgb(${mix[0]}, ${mix[1]}, ${mix[2]})`;
};
