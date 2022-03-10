import { isLightOrDarkColor } from '../isLightOrDarkColor';

describe('isLightOrDarkColor', () => {
  it('returns dark if color is black', () => {
    expect(isLightOrDarkColor('black')).toEqual('dark');
    expect(isLightOrDarkColor('#000000')).toEqual('dark');
    expect(isLightOrDarkColor('rgb(0,0,0)')).toEqual('dark');
    expect(isLightOrDarkColor('rgba(0,0,0,1)')).toEqual('dark');
  });

  it('returns light if color is gray', () => {
    expect(isLightOrDarkColor('#d8d8d8')).toEqual('light');
    expect(isLightOrDarkColor('rgb(216,216,216)')).toEqual('light');
    expect(isLightOrDarkColor('rgba(216,216,216,1)')).toEqual('light');
  });

  it('returns light if color is white', () => {
    expect(isLightOrDarkColor('white')).toEqual('light');
    expect(isLightOrDarkColor('#ffffff')).toEqual('light');
    expect(isLightOrDarkColor('rgb(255,255,255)')).toEqual('light');
    expect(isLightOrDarkColor('rgba(255,255,255,1)')).toEqual('light');
  });

  it('returns dark if color is transparent', () => {
    expect(isLightOrDarkColor('transparent')).toEqual('dark');
    expect(isLightOrDarkColor('rgba(0,0,0,0)')).toEqual('dark');
    expect(isLightOrDarkColor('rgba(216,216,216,0)')).toEqual('dark');
    expect(isLightOrDarkColor('rgba(255,255,255,0)')).toEqual('dark');
  });

  it('returns light if color is invalid', () => {
    expect(isLightOrDarkColor('')).toEqual('light');
    expect(isLightOrDarkColor('rgba()')).toEqual('light');
    expect(isLightOrDarkColor('#')).toEqual('light');
  });
});
