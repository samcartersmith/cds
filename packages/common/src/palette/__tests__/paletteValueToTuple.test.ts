/* eslint-disable @typescript-eslint/ban-ts-comment */
import { paletteValueToTuple } from '../paletteValueToTuple';

describe('paletteValueToTuple', () => {
  it('returns the correct step based on paletteValue', () => {
    expect(paletteValueToTuple('blue30')).toEqual(['blue30', 1]);
    expect(paletteValueToTuple(['blue60', 0.9])).toEqual(['blue60', 0.9]);
  });

  it('returns a tuple if the value passed in is a valid string', () => {
    // @ts-expect-error This should never happen, but meant to illsutrate that any valid string is fair game.
    expect(paletteValueToTuple('someString')).toEqual(['someString', 1]);
  });

  it('returns the value passed in if the value is a valid array', () => {
    // @ts-expect-error This should never happen, but meant to illsutrate that any valid array is fair game.
    expect(paletteValueToTuple(['some', 'array'])).toEqual(['some', 'array']);
  });

  it('returns gray100 tuple if an invalid string or non array type is passed in', () => {
    // @ts-expect-error
    expect(paletteValueToTuple(undefined)).toEqual(['gray100', 1]);
  });
});
