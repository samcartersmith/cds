import {
  rgba2hex,
  overrideAlpha,
  getColorLuminosity,
  extractHueStep,
  paletteValueToTuple,
  blendColors,
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

describe('blendColors', () => {
  it('returns second color if the second color does not have opacity', () => {
    expect(blendColors([255, 255, 255, 1], [33, 98, 238, 1])).toEqual('rgb(33, 98, 238)');
    expect(blendColors([33, 98, 238, 1], [255, 255, 255, 1])).toEqual('rgb(255, 255, 255)');
    expect(blendColors([33, 98, 238, 0.2], [255, 255, 255, 1])).toEqual('rgb(255, 255, 255)');
  });

  it('returns blended color if the second color has opacity', () => {
    expect(blendColors([255, 255, 255, 1], [33, 98, 238, 0.2])).toEqual('rgb(211, 224, 252)');
  });
});
