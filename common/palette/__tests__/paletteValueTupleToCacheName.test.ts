import { paletteValueTupleToCacheName } from '../paletteValueTupleToCacheName';

describe('paletteValueTupleToCacheName', () => {
  it('returns correct value for light spectrum', () => {
    expect(paletteValueTupleToCacheName(['blue60', 1], 'light')).toEqual('blue60-1-light');
  });

  it('returns correct value for dark spectrum', () => {
    expect(paletteValueTupleToCacheName(['blue60', 1], 'dark')).toEqual('blue60-1-dark');
  });

  it('returns correct value for tuple paletteValue', () => {
    expect(paletteValueTupleToCacheName(['blue60', 0.5], 'dark')).toEqual('blue60-0.5-dark');
  });

  it('returns correct value for frontier', () => {
    expect(paletteValueTupleToCacheName(['gray0', 1], 'light', true)).toEqual(
      'gray0-1-light-frontier',
    );
  });
});
