import { renderHook } from '@testing-library/react-hooks';

import { useInteractableTokens } from '../useInteractableTokens';

describe('useInteractableTokens', () => {
  const defaultParams = {
    overlayColor: 'primary',
    disabled: false,
    pressed: false,
  } as const;

  it('returns the original overlayColor value when not interacted with', () => {
    const { result } = renderHook(() => useInteractableTokens(defaultParams));

    expect(result.current).toEqual({
      backgroundColor: 'rgba(0,82,255,1)',
      contentOpacity: 1,
    });
  });

  it('returns the disabled color from getBlendedColors when disabled', () => {
    const { result } = renderHook(() =>
      useInteractableTokens({ ...defaultParams, disabled: true })
    );

    expect(result.current).toEqual({
      backgroundColor: 'rgb(158, 189, 255)',
      contentOpacity: 1,
    });
  });

  it('returns the pressed color from getBlendedColors when pressed', () => {
    const { result } = renderHook(() => useInteractableTokens({ ...defaultParams, pressed: true }));

    expect(result.current).toEqual({
      backgroundColor: 'rgb(1, 72, 221)',
      contentOpacity: 0.86,
    });
  });
});
