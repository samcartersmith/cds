import { PaletteValue } from '../../types/Palette';
import { getAccessibleForegroundGradient } from '../getAccessibleForegroundGradient';

describe('getAccessibleForegroundGradient', () => {
  const transformFn = jest.fn((value: PaletteValue) =>
    typeof value === 'string' ? value : `${value[0]},${value[1]}`,
  );

  it('returns the color passed in if meets accessibility requirements', () => {
    const output = getAccessibleForegroundGradient({
      background: '#ffffff',
      color: '#000000',
      usage: 'graphic',
      spectrum: 'light',
      transformFn,
    });
    // We can't make the second color any darker so these two colors are the same.
    expect(output).toEqual([
      { color: '#000000', offset: '0%' },
      { color: '#000000', offset: '100%' },
    ]);
  });

  it('returns the correct spectrum color if trying to render a dark color on dark background', () => {
    const output = getAccessibleForegroundGradient({
      background: '#000000',
      color: '#000000',
      usage: 'graphic',
      spectrum: 'dark',
      transformFn,
    });
    // In dark mode we disable gradient so these two colors are the same.
    expect(output).toEqual([
      { color: 'rgb(255,255,255)', offset: '0%' },
      { color: 'rgb(255,255,255)', offset: '100%' },
    ]);
  });

  it('returns the closest spectrum color if it does not meet accessibility requirements', () => {
    const output = getAccessibleForegroundGradient({
      background: '#ffffff',
      color: '#fff000',
      usage: 'graphic',
      spectrum: 'light',
      transformFn,
    });
    expect(output).toEqual([
      { color: 'yellow50', offset: '0%' },
      { color: 'yellow60', offset: '100%' },
    ]);
  });

  it('returns gray100 for non accessible gray colors', () => {
    const output = getAccessibleForegroundGradient({
      background: '#ffffff',
      color: '#dddddd',
      usage: 'graphic',
      spectrum: 'light',
      transformFn,
    });
    // gray100 is the highest hue step we can increment to so these two colors are the same.
    expect(output).toEqual([
      { color: 'gray100', offset: '0%' },
      { color: 'gray100', offset: '100%' },
    ]);
  });

  it('correctly returns the color passed in if meets accessibility requirements', () => {
    const output = getAccessibleForegroundGradient({
      background: '#ffffff',
      color: '#EC7030',
      usage: 'graphic',
      spectrum: 'light',
      transformFn,
    });
    expect(output).toEqual([
      { color: '#EC7030', offset: '0%' },
      { color: '#a54e22', offset: '100%' },
    ]);
  });
});
