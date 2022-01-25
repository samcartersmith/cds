import { renderHook } from '@testing-library/react-hooks';

import { large, xSmall } from '../../styles/scale';
import { DenseScaleProvider } from '../../system/ThemeProvider';
import { useTypographyStylesMap } from '../useTypographyStylesMap';

describe('useTypographyStylesMap', () => {
  it('returns the correct value for large scale', () => {
    const { result } = renderHook(() => useTypographyStylesMap());
    expect(result.current).toEqual(large.typography);
  });
  it('returns the correct value for xSmall scale', () => {
    const { result } = renderHook(() => useTypographyStylesMap(), { wrapper: DenseScaleProvider });
    expect(result.current).toEqual(xSmall.typography);
  });
});
