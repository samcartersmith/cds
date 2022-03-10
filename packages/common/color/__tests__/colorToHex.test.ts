import { colorToHex } from '../colorToHex';

describe('colorToHex', () => {
  it('returns the correct hex value for rgb string', () => {
    expect(colorToHex('rgb(255,255,255)')).toBe('#ffffff');
    expect(colorToHex('rgb(0,0,0)')).toBe('#000000');
  });

  it('returns the correct hex value for rgba string', () => {
    expect(colorToHex('rgba(255,255,255, 1)')).toBe('#ffffff');
    expect(colorToHex('rgba(0,0,0,0)')).toBe('#000000');
  });

  it('returns the value passed in if the color is invalid', () => {
    expect(colorToHex('')).toBe('');
    expect(colorToHex('rgba()')).toBe('rgba()');
  });
});
