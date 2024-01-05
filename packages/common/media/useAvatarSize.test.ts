import { renderHook } from '@testing-library/react-hooks';

import { getDenseAvatarPixelSize, getNormalAvatarPixelSize, useAvatarSize } from './useAvatarSize';

describe('useAvatarSize', () => {
  it('returns normal avatar size', () => {
    expect(getNormalAvatarPixelSize('m')).toBe(24);
  });

  it('returns dense avatar size', () => {
    expect(getDenseAvatarPixelSize('xl')).toBe(36);
    expect(getDenseAvatarPixelSize('xxl')).toBe(44);
  });

  it('returns avatar size', () => {
    const { result } = renderHook(() => {
      return useAvatarSize('l');
    });

    expect(result.current).toBe(32);
  });
});
