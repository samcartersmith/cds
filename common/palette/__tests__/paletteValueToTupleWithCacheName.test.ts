import { paletteValueToTupleWithCacheName } from '../paletteValueToTupleWithCacheName';

describe('paletteValueToTupleWithCacheName', () => {
  it('returns correct value for light spectrum', () => {
    expect(paletteValueToTupleWithCacheName('blue60', 'light')).toEqual([
      ['blue60', 1],
      'blue60-1-light',
    ]);
  });

  it('returns correct value for dark spectrum', () => {
    expect(paletteValueToTupleWithCacheName('blue60', 'dark')).toEqual([
      ['blue60', 1],
      'blue60-1-dark',
    ]);
  });

  it('returns correct value for tuple paletteValue', () => {
    expect(paletteValueToTupleWithCacheName(['blue60', 0.5], 'dark')).toEqual([
      ['blue60', 0.5],
      'blue60-0.5-dark',
    ]);
  });

  it('returns correct value for frontier', () => {
    expect(paletteValueToTupleWithCacheName(['gray0', 0.4], 'light', true)).toEqual([
      ['gray0', 0.4],
      'gray0-0.4-light-frontier',
    ]);
  });
});
