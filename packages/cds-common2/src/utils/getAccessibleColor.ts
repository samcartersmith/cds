export const getAccessibleColor = (backgroundColor: string | number[]) => {
  let r;
  let g;
  let b;
  if (typeof backgroundColor === 'string' && backgroundColor.startsWith('#')) {
    r = parseInt(backgroundColor.substring(1, 3), 16);
    g = parseInt(backgroundColor.substring(3, 5), 16);
    b = parseInt(backgroundColor.substring(5, 7), 16);
  } else
    [r, g, b] =
      typeof backgroundColor === 'string'
        ? backgroundColor.split(',').map(parseInt)
        : backgroundColor;
  const rLuminance = (r / 255) ** 2.2;
  const gLuminance = (g / 255) ** 2.2;
  const bLuminance = (b / 255) ** 2.2;
  // sRGB constants
  const colorLuminance = 0.2126 * rLuminance + 0.7151 * gLuminance + 0.0721 * bLuminance;
  return colorLuminance < 140 ? '#ffffff' : '#000000';
};
