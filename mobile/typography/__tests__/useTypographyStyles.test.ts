import { renderHook } from '@testing-library/react-hooks';

import { xSmall, large } from '../../styles/scale';
import { DenseScaleProvider } from '../../system/ThemeProvider';
import { useTypographyStyles } from '../useTypographyStyles';

describe('useTypographyStyles', () => {
  it('returns the correct value for body in large scale', () => {
    const { result } = renderHook(() => useTypographyStyles('body'));
    expect(result.current).toEqual(large.typography.body);
  });
  it('returns the correct value for xSmall scale', () => {
    const { result } = renderHook(() => useTypographyStyles('body'), {
      wrapper: DenseScaleProvider,
    });
    expect(result.current).toEqual(xSmall.typography.body);
  });
});
