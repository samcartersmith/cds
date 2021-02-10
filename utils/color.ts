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
