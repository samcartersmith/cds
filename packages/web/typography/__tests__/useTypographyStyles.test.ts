import { renderHook } from '@testing-library/react-hooks';

import { FeatureFlagProvider } from '../../system/FeatureFlagProvider';
import { display2, display2Frontier } from '../textStyles';
import { useTypographyStyles } from '../useTypographyStyles';

describe('useTypographyStyles', () => {
  it('returns the correct value for display2 if frontierTypography is true', () => {
    const { result } = renderHook(() => useTypographyStyles('display2'), {
      wrapper: FeatureFlagProvider,
      initialProps: {
        frontierTypography: true,
      },
    });
    expect(result.current).toEqual(display2Frontier);
  });
  it('returns the correct value for display2 if frontierTypography is false', () => {
    const { result } = renderHook(() => useTypographyStyles('display2'), {
      wrapper: FeatureFlagProvider,
      initialProps: {
        frontierTypography: false,
      },
    });
    expect(result.current).toEqual(display2);
  });
});
