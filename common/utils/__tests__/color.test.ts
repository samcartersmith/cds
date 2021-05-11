import {
  rgba2hex,
  overrideAlpha,
  getColorLuminosity,
  extractHueStep,
  paletteValueToTuple,
} from '../color';

describe('color', () => {
  it('rgba2hex', () => {
    expect(rgba2hex('rgb(255,255,255)')).toEqual('#ffffff');
    expect(rgba2hex('rgba(255,255,255, 1)')).toEqual('#ffffff');

    expect(rgba2hex('rgb(0,0,0)')).toEqual('#000000');
    expect(rgba2hex('rgba(0,0,0,0)')).toEqual('#000000');
  });

  it('overrideAlpha', () => {
    expect(overrideAlpha('rgba(255,255,255,1)', 0.5)).toEqual('rgba(255,255,255,0.5)');
  });

  it('getColorLuminosity', () => {
    expect(getColorLuminosity('#000000')).toEqual('dark');
    expect(getColorLuminosity('rgb(0,0,0)')).toEqual('dark');
    expect(getColorLuminosity('rgba(0,0,0,0)')).toEqual('dark');

    expect(getColorLuminosity('#ffffff')).toEqual('light');
    expect(getColorLuminosity('rgb(255,255,255)')).toEqual('light');
    expect(getColorLuminosity('rgba(255,255,255,1)')).toEqual('light');
  });

  it('extractHueStep', () => {
    expect(extractHueStep('blue30')).toEqual(30);
    expect(extractHueStep(['blue60', 0.9])).toEqual(60);
  });

  it('paletteValueToTuple', () => {
    expect(paletteValueToTuple('blue30')).toEqual(['blue30', 1]);
    expect(paletteValueToTuple(['blue60', 0.9])).toEqual(['blue60', 0.9]);
  });
});
