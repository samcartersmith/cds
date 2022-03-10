import { renderHook } from '@testing-library/react-hooks';

import { xSmall, large } from '../../styles/scale';
import { DenseScaleProvider } from '../../system/ThemeProvider';
import { useLineHeightMap } from '../useLineHeightMap';

describe('useLineHeightMap', () => {
  it('returns the correct value for large scale', () => {
    const { result } = renderHook(() => useLineHeightMap());
    expect(result.current.body).toEqual(large.typography.body.lineHeight);
  });
  it('returns the correct value for xSmall scale', () => {
    const { result } = renderHook(() => useLineHeightMap(), { wrapper: DenseScaleProvider });
    expect(result.current.body).toEqual(xSmall.typography.body.lineHeight);
  });
});
