import { paletteValueToHueStep } from '../paletteValueToHueStep';

describe('paletteValueToHueStep', () => {
  it('returns the correct step based on paletteValue', () => {
    expect(paletteValueToHueStep('blue30')).toEqual(30);
    expect(paletteValueToHueStep(['blue60', 0.9])).toEqual(60);
  });
});
