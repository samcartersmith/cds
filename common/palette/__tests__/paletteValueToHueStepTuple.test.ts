/* eslint-disable @typescript-eslint/ban-ts-comment */
import { paletteValueToHueStepTuple } from '../paletteValueToHueStepTuple';

describe('paletteValueToHueStepTuple', () => {
  it('returns the correct step based on paletteValue', () => {
    expect(paletteValueToHueStepTuple('blue30')).toEqual(['blue', 30]);
    expect(paletteValueToHueStepTuple(['blue60', 0.9])).toEqual(['blue', 60]);
  });

  it('returns gray100 tuple if invalid value is passed in', () => {
    // @ts-ignore
    expect(paletteValueToHueStepTuple('')).toEqual(['gray', 100]);
    // @ts-ignore
    expect(paletteValueToHueStepTuple(undefined)).toEqual(['gray', 100]);
    // @ts-ignore
    expect(paletteValueToHueStepTuple(['', undefined])).toEqual(['gray', 100]);
  });
});
