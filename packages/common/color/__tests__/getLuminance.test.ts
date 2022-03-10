import { getLuminance } from '../getLuminance';

describe('getLuminance', () => {
  it('returns 0 if color is transparent', () => {
    expect(getLuminance('transparent')).toEqual(0);
    expect(getLuminance('rgba(0,0,0,0)')).toEqual(0);
    expect(getLuminance('rgba(255,255,255,0)')).toEqual(0);
  });

  it('returns 0 if color is black', () => {
    expect(getLuminance('black')).toEqual(0);
    expect(getLuminance('#000000')).toEqual(0);
    expect(getLuminance('rgb(0,0,0)')).toEqual(0);
    expect(getLuminance('rgba(0,0,0,1)')).toEqual(0);
  });

  it('returns 1 if color is white', () => {
    expect(getLuminance('white')).toEqual(1);
    expect(getLuminance('#ffffff')).toEqual(1);
    expect(getLuminance('rgb(255,255,255)')).toEqual(1);
    expect(getLuminance('rgba(255,255,255,1)')).toEqual(1);
  });

  it('returns undefined if color is invalid', () => {
    expect(getLuminance('')).toBeUndefined();
    expect(getLuminance('#')).toBeUndefined();
    expect(getLuminance('rgb()')).toBeUndefined();
    expect(getLuminance('rgba()')).toBeUndefined();
  });
});
