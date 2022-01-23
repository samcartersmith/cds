import { getLuminance } from '../getLuminance';

describe('getLuminance', () => {
  it('returns 0 if color is transparent', () => {
    expect(getLuminance('transparent')).toBe(0);
    expect(getLuminance('rgba(0,0,0,0)')).toBe(0);
    expect(getLuminance('rgba(255,255,255,0)')).toBe(0);
  });

  it('returns 0 if color is black', () => {
    expect(getLuminance('black')).toBe(0);
    expect(getLuminance('#000000')).toBe(0);
    expect(getLuminance('rgb(0,0,0)')).toBe(0);
    expect(getLuminance('rgba(0,0,0,1)')).toBe(0);
  });

  it('returns 1 if color is white', () => {
    expect(getLuminance('white')).toBe(1);
    expect(getLuminance('#ffffff')).toBe(1);
    expect(getLuminance('rgb(255,255,255)')).toBe(1);
    expect(getLuminance('rgba(255,255,255,1)')).toBe(1);
  });

  it('returns undefined if color is invalid', () => {
    expect(getLuminance('')).toBeUndefined();
    expect(getLuminance('#')).toBeUndefined();
    expect(getLuminance('rgb()')).toBeUndefined();
    expect(getLuminance('rgba()')).toBeUndefined();
  });
});
