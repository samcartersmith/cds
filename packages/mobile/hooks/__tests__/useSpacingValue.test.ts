import { renderHook } from '@testing-library/react-hooks';
import { NormalScaleProvider, DenseScaleProvider } from '../../system/ThemeProvider';

import { useSpacingValue } from '../useSpacingValue';

describe('useSpacingValue', () => {
  it('returns correct value for normal scale', () => {
    const { result } = renderHook(() => useSpacingValue(2), { wrapper: NormalScaleProvider });
    expect(result.current).toEqual(16);
  });

  it('returns correct value for dense scale', () => {
    const { result } = renderHook(() => useSpacingValue(2), { wrapper: DenseScaleProvider });
    expect(result.current).toEqual(12);
  });
});
