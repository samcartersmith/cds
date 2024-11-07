import { renderHook } from '@testing-library/react-hooks';
import {
  remoteImageDarkFallbackSrc,
  remoteImageLightFallbackSrc,
} from '@cbhq/cds-common/media/remoteImageFallbackSrc';

import { useRemoteImageSrc } from '../useRemoteImageSrc';

describe('useRemoteImageSrc', () => {
  it('spectrum={dark}, src={undefined} returns remote image dark mode fallback', () => {
    const { result } = renderHook(() => useRemoteImageSrc('dark', undefined));
    expect(result.current).toBe(remoteImageDarkFallbackSrc);
  });

  it('spectrum={light}, src={undefined} returns remote image light mode fallback', () => {
    const { result } = renderHook(() => useRemoteImageSrc('light', undefined));
    expect(result.current).toBe(remoteImageLightFallbackSrc);
  });

  it('spectrum={dark}, src={something} returns the dummy url', () => {
    const { result } = renderHook(() => useRemoteImageSrc('dark', 'something'));
    expect(result.current).toBe('something');
  });
});
