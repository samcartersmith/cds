import { renderHook } from '@testing-library/react-hooks';

import { AvatarSize } from '../types/AvatarSize';

import {
  denseScaleMap,
  getDenseAvatarPixelSize,
  getNormalAvatarPixelSize,
  normalScaleMap,
  useAvatarSize,
} from './useAvatarSize';

describe('useAvatarSize', () => {
  it('returns normal avatar sizes for all sizes', () => {
    Object.entries(normalScaleMap).forEach(([size, expectedSize]) => {
      expect(getNormalAvatarPixelSize(size as AvatarSize)).toBe(expectedSize);
    });
  });

  it('returns dense avatar sizes for all sizes', () => {
    Object.entries(denseScaleMap).forEach(([size, expectedSize]) => {
      expect(getDenseAvatarPixelSize(size as AvatarSize)).toBe(expectedSize);
    });
  });
  it('returns avatar size', () => {
    const { result } = renderHook(() => {
      return useAvatarSize('l');
    });

    expect(result.current).toBe(32);
  });
});
