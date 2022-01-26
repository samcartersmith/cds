import { blendColors } from '../blendColors';

describe('blendColors', () => {
  it('returns second color if the second color does not have opacity', () => {
    expect(blendColors([255, 255, 255, 1], [33, 98, 238, 1])).toBe('rgb(33, 98, 238)');
    expect(blendColors([33, 98, 238, 1], [255, 255, 255, 1])).toBe('rgb(255, 255, 255)');
    expect(blendColors([33, 98, 238, 0.2], [255, 255, 255, 1])).toBe('rgb(255, 255, 255)');
  });

  it('returns blended color if the second color has opacity', () => {
    expect(blendColors([255, 255, 255, 1], [33, 98, 238, 0.2])).toBe('rgb(211, 224, 252)');
  });
});
