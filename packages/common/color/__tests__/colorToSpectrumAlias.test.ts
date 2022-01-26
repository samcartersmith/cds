import { colorToSpectrumAlias } from '../colorToSpectrumAlias';

describe('colorToSpectrumAlias', () => {
  it('returns the closest equivalent spectrum color for hex color', () => {
    expect(colorToSpectrumAlias('#ffffff')).toBe('gray100');
    expect(colorToSpectrumAlias('#000000')).toBe('gray100');
    expect(colorToSpectrumAlias('#3498DB')).toBe('blue60');
    expect(colorToSpectrumAlias('#F2C084')).toBe('orange60');
    expect(colorToSpectrumAlias('#BDF284')).toBe('green60');
    expect(colorToSpectrumAlias('#EC6AB1')).toBe('pink60');
    expect(colorToSpectrumAlias('#9273FF')).toBe('purple60');
  });

  it('returns the closest equivalent spectrum color for rgb color', () => {
    expect(colorToSpectrumAlias('rgb(255,255,255)')).toBe('gray100');
    expect(colorToSpectrumAlias('rgb(0,0,0)')).toBe('gray100');
    expect(colorToSpectrumAlias('rgb(52,152,219)')).toBe('blue60');
    expect(colorToSpectrumAlias('rgb(242,192,132)')).toBe('orange60');
    expect(colorToSpectrumAlias('rgb(189,242,132)')).toBe('green60');
    expect(colorToSpectrumAlias('rgb(236,106,177)')).toBe('pink60');
    expect(colorToSpectrumAlias('rgb(146,115,255)')).toBe('purple60');
  });

  it('returns the closest equivalent spectrum color for rgba color', () => {
    expect(colorToSpectrumAlias('rgba(255,255,255,1)')).toBe('gray100');
    expect(colorToSpectrumAlias('rgba(0,0,0,1)')).toBe('gray100');
    expect(colorToSpectrumAlias('rgba(52,152,219,1)')).toBe('blue60');
    expect(colorToSpectrumAlias('rgba(242,192,132,1)')).toBe('orange60');
    expect(colorToSpectrumAlias('rgba(189,242,132,1)')).toBe('green60');
    expect(colorToSpectrumAlias('rgba(236,106,177,1)')).toBe('pink60');
    expect(colorToSpectrumAlias('rgba(146,115,255,1)')).toBe('purple60');
  });

  it('correctly handles invalid color', () => {
    expect(colorToSpectrumAlias('transparent')).toBe('gray100');
    expect(colorToSpectrumAlias('')).toBe('gray100');
    expect(colorToSpectrumAlias('rgb()')).toBe('gray100');
  });
});
