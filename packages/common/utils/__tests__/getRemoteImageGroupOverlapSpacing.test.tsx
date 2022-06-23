import { getRemoteImageGroupOverlapSpacing } from '../getRemoteImageGroupOverlapSpacing';

describe('getRemoteImageGroupOverlapSpacing', () => {
  it('size={m} returns a 1 spacing', () => {
    const spacing = getRemoteImageGroupOverlapSpacing('m');
    expect(spacing).toBe(1);
  });
  it('size={l} returns a 1 spacing', () => {
    const spacing = getRemoteImageGroupOverlapSpacing('l');
    expect(spacing).toBe(1);
  });
  it('size={xl} returns a 1 spacing', () => {
    const spacing = getRemoteImageGroupOverlapSpacing('xl');
    expect(spacing).toBe(1);
  });
  it('size <= 40  returns a 1 spacing', () => {
    const smallSizes = [12, 9, 30, 40, 25];

    smallSizes.forEach((size) => {
      const spacing = getRemoteImageGroupOverlapSpacing(size);
      expect(spacing).toBe(1);
    });
  });
  it('size={xxl} returns a 2 spacing', () => {
    const spacing = getRemoteImageGroupOverlapSpacing('xxl');
    expect(spacing).toBe(2);
  });
  it('size={xxxl} returns a 2 spacing', () => {
    const spacing = getRemoteImageGroupOverlapSpacing('xxxl');
    expect(spacing).toBe(2);
  });

  it('size > 40  returns a 2 spacing', () => {
    const smallSizes = [41, 42, 50, 100, 57];

    smallSizes.forEach((size) => {
      const spacing = getRemoteImageGroupOverlapSpacing(size);
      expect(spacing).toBe(2);
    });
  });
});
