import { renderHook } from '@testing-library/react-hooks';
import { NormalScaleProvider, DenseScaleProvider } from '../../system/ThemeProvider';

import { useSpacingScale } from '../useSpacingScale';
import { large, xSmall } from '../../styles/scale';

describe('useSpacingScale', () => {
  it('returns correct value for normal scale', () => {
    const { result } = renderHook(() => useSpacingScale(), { wrapper: NormalScaleProvider });
    expect(result.current).toEqual(large.spacing);
  });

  it('returns correct value for dense scale', () => {
    const { result } = renderHook(() => useSpacingScale(), { wrapper: DenseScaleProvider });
    expect(result.current).toEqual(xSmall.spacing);
  });
});
