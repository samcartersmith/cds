import { PaletteValue } from '../../types';
import { getAccessibleForeground } from '../getAccessibleForeground';

describe('getAccessibleForeground', () => {
  const transformFn = jest.fn((value: PaletteValue) =>
    typeof value === 'string' ? value : `${value[0]},${value[1]}`,
  );

  it('returns the color passed in if meets accessibility requirements', () => {
    const color = getAccessibleForeground('#ffffff', '#000000', 'graphic', transformFn);
    expect(color).toBe('#000000');
  });

  it('returns the closest spectrum color if it does not meet accessibility requirements', () => {
    const color = getAccessibleForeground('#ffffff', '#fff000', 'graphic', transformFn);
    expect(color).toBe('yellow50');
  });

  it('returns black for non accessible gray foreground colors if black foreground has a higher contrast ratio than white', () => {
    const color = getAccessibleForeground('#ffffff', '#dddddd', 'graphic', transformFn);
    expect(color).toBe('rgb(0,0,0)');
  });

  it('returns white for non accessible gray foreground colors if white foreground has a higher contrast ratio than black', () => {
    const color = getAccessibleForeground('#000000', '#333333', 'graphic', transformFn);
    expect(color).toBe('rgb(255,255,255)');
  });
});
