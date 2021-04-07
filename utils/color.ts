// Convert rgba string to 8 digit hex color. Opacity is ignored
// https://jsfiddle.net/Mottie/xcqpF/1/light/
export const rgba2hex = (rgba: string) => {
  const rgbaMatch = rgba.match(
    /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
  );
  return rgbaMatch && rgbaMatch.length === 4
    ? `#${`0${parseInt(rgbaMatch[1], 10).toString(16)}`.slice(-2)}${`0${parseInt(
        rgbaMatch[2],
        10
      ).toString(16)}`.slice(-2)}${`0${parseInt(rgbaMatch[3], 10).toString(16)}`.slice(-2)}`
    : '';
};

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
