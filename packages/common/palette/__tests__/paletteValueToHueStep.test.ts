import { paletteValueToHueStep } from '../paletteValueToHueStep';

describe('paletteValueToHueStep', () => {
  it('returns the correct step based on paletteValue', () => {
    expect(paletteValueToHueStep('blue30')).toBe(30);
    expect(paletteValueToHueStep(['blue60', 0.9])).toBe(60);
  });
});
