import { renderHook } from '@testing-library/react-hooks';

import { xSmall, large } from '../../styles/scale';
import { DenseScaleProvider } from '../../system/ThemeProvider';
import { useLineHeight } from '../useLineHeight';

describe('useLineHeight', () => {
  it('returns the correct value for body in large scale', () => {
    const { result } = renderHook(() => useLineHeight('body'));
    expect(result.current).toEqual(large.typography.body.lineHeight);
  });
  it('returns the correct value for xSmall scale', () => {
    const { result } = renderHook(() => useLineHeight('body'), { wrapper: DenseScaleProvider });
    expect(result.current).toEqual(xSmall.typography.body.lineHeight);
  });
});
