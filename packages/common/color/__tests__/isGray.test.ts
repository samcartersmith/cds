import { hsl } from '@cbhq/d3/color';

import { isGray } from '../isGray';

describe('isGray', () => {
  it('returns the correct value', () => {
    expect(isGray(hsl('yellow'))).toBe(false);
    expect(isGray(hsl('blue'))).toBe(false);
    expect(isGray(hsl('#ffffff'))).toBe(true);
    expect(isGray(hsl('#dddddd'))).toBe(true);
    expect(isGray(hsl('#000000'))).toBe(true);
  });
});
