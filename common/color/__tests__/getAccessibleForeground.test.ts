import { PaletteValue } from '../../types';
import { getAccessibleForeground } from '../getAccessibleForeground';

describe('getAccessibleForeground', () => {
  const transformFn = jest.fn((value: PaletteValue) =>
    typeof value === 'string' ? value : `${value[0]},${value[1]}`,
  );

  it('returns the color passed in if meets accessibility requirements', () => {
    const color = getAccessibleForeground('#ffffff', '#000000', 'graphic', transformFn);
    expect(color).toEqual('#000000');
  });

  it('returns the closest spectrum color if it does not meet accessibility requirements', () => {
    const color = getAccessibleForeground('#ffffff', '#fff000', 'graphic', transformFn);
    expect(color).toEqual('yellow50');
  });

  it('returns gray100 for non accessible gray colors', () => {
    const color = getAccessibleForeground('#ffffff', '#dddddd', 'graphic', transformFn);
    expect(color).toEqual('gray100');
  });
});
