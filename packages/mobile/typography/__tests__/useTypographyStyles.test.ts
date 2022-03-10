import { renderHook } from '@testing-library/react-hooks';

import { xSmall, large } from '../../styles/scale';
import { DenseScaleProvider } from '../../system/ThemeProvider';
import { FeatureFlagProvider } from '../../system/FeatureFlagProvider';
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
  it('returns the correct value for display2 if frontierTypography is true', () => {
    const { result } = renderHook(() => useTypographyStyles('display2'), {
      wrapper: FeatureFlagProvider,
      initialProps: {
        frontierTypography: true,
      },
    });
    expect(result.current).toEqual(large.typography.display2Frontier);
  });
  it('returns the correct value for display2 if frontierTypography is false', () => {
    const { result } = renderHook(() => useTypographyStyles('display2'), {
      wrapper: FeatureFlagProvider,
      initialProps: {
        frontierTypography: false,
      },
    });
    expect(result.current).toEqual(large.typography.display2);
  });
  it('returns the correct mono font-family if mono arg is true', () => {
    const { result } = renderHook(() => useTypographyStyles('display2', true));
    expect(result.current.fontFamily).toContain('CoinbaseMono');
  });
});
