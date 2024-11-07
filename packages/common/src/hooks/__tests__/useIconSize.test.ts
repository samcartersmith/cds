import { renderHook } from '@testing-library/react-hooks';

import { useIconSize } from '../useIconSize';

describe('useIconSize', () => {
  it('returns icon size', () => {
    const { result } = renderHook(() => {
      return useIconSize('s');
    });

    expect(result.current.wrapperSize).toBe(16);
    expect(result.current.iconSize).toBe(16);
  });

  it('returns bordered icon size', () => {
    const { result } = renderHook(() => {
      return useIconSize('m', true);
    });

    expect(result.current.wrapperSize).toBe(24);
    expect(result.current.iconSize).toBe(12);
  });

  it('returns large bordered icon size', () => {
    const { result } = renderHook(() => {
      return useIconSize('l', true);
    });

    expect(result.current.wrapperSize).toBe(32);
    expect(result.current.iconSize).toBe(16);
  });
});
