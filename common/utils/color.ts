import type { PaletteValue, RgbaArray, SpectrumAliasWithOpacity, SpectrumHueStep } from '../types';

const SPECTRUM_ALIAS_REGEX = /[a-z]+(\d+)/;

/**
 * Takes a paletteValue and extracts the hue step for the associated spectrum color.
 * @param paletteValue - 'blue60' | ['blue60', 0.4]
 * @returns number - 60
 */
export const extractHueStep = (paletteValue: PaletteValue): SpectrumHueStep => {
  const [alias] = paletteValueToTuple(paletteValue);
  const [, step] = alias.match(SPECTRUM_ALIAS_REGEX) || [];
  return Number(step) as SpectrumHueStep;
};

/**
 * Normalize palette value to be a spectrum alias & opacity tuple
 * @param paletteValue - 'blue60' | ['blue60', 0.4]
 * @returns spectrum alias & opacity tuple - ['blue60', 1] | ['blue60', 0.4]
 */
export const paletteValueToTuple = (paletteValue: PaletteValue): SpectrumAliasWithOpacity => {
  return typeof paletteValue === 'string' ? [paletteValue, 1] : paletteValue;
};

/**
 * Convert rgba string to 8 digit hex color. Opacity is ignored
 * @param rgbaString - `rgba(255, 255, 255, 1)`
 * @returns hex - `#ffffff`
 * @example https://jsfiddle.net/Mottie/xcqpF/1/light/
 */
export const rgba2hex = (rgbaString: string) => {
  const rgbaMatch = rgbaString.match(
    /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
  );
  return rgbaMatch && rgbaMatch.length === 4
    ? `#${`0${parseInt(rgbaMatch[1], 10).toString(16)}`.slice(-2)}${`0${parseInt(
        rgbaMatch[2],
        10
      ).toString(16)}`.slice(-2)}${`0${parseInt(rgbaMatch[3], 10).toString(16)}`.slice(-2)}`
    : '';
};

/**
 * Modify the alpha value of an rgba string
 * @param rgbaString - `rgba(255, 255, 255, 1)`
 * @param newOpacity - 0.5
 * @returns rgbaString - `rgba(255, 255, 255, 0.5)`
 */
export const overrideAlpha = (rgbaString: string, newOpacity: number) => {
  return rgbaString.replace(/,[^,]+$/, `,${newOpacity})`);
};

/**
 * Detect if rgba string is a light or dark color.
 * This is useful for determining whether to show light or dark content for StatusBar on mobile based on palette.background color.
 * @param  {string} rgbaString
 * @example https://codepen.io/andreaswik/pen/YjJqpK
 */
export const getColorLuminosity = (color: string) => {
  if (color.includes('rgb')) {
    // color is rgb or rgba value
    return isLightOrDark(rgba2hex(color));
  } else if (color.includes('#')) {
    // color is hex value
    return isLightOrDark(color);
  }
};

/**
 * These are not exported and only used internally for getColorLuminosity
 */

/**
 * Convert a hex value to an rgb array
 * @param hex - `#ffffff`
 * @returns rgbArray - `[255, 255, 255, 1]`
 */
const hex2RgbArray = (hex: string) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (_, red, green, blue) {
    return red + red + green + green + blue + blue;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] as const;
  }
};

const isLightOrDark = (hexValue: string) => {
  const hexAsArray = hex2RgbArray(hexValue);
  if (hexAsArray) {
    const [red, green, blue] = hexAsArray;
    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    const hsp = Math.sqrt(0.299 * (red * red) + 0.587 * (green * green) + 0.114 * (blue * blue));
    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {
      return 'light';
    } else {
      return 'dark';
    }
  }
  // Fallback to light luminosity
  return 'light';
};

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
      (underlayColor[0] * underlayColor[3] * (1 - overlayColor[3])) / mix[3]
  );
  // green
  mix[1] = Math.round(
    (overlayColor[1] * overlayColor[3]) / mix[3] +
      (underlayColor[1] * underlayColor[3] * (1 - overlayColor[3])) / mix[3]
  );
  // blue
  mix[2] = Math.round(
    (overlayColor[2] * overlayColor[3]) / mix[3] +
      (underlayColor[2] * underlayColor[3] * (1 - overlayColor[3])) / mix[3]
  );

  return `rgb(${mix[0]}, ${mix[1]}, ${mix[2]})`;
};
