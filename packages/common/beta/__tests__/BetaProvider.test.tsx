import { renderHook } from '@testing-library/react-hooks';

import { DEFAULT_BETA_CONTEXT } from '../BetaContext';
import { BetaProvider, BetaProviderProps } from '../BetaProvider';
import { useBeta } from '../useBeta';

describe('BetaProvider', () => {
  it('sets DEFAULT_BETA_CONTEXT iF no props are provided', () => {
    function Wrapper(props: BetaProviderProps) {
      return <BetaProvider {...props} />;
    }

    const { result } = renderHook(() => useBeta(), {
      wrapper: Wrapper,
    });
    expect(result.current).toEqual(DEFAULT_BETA_CONTEXT);
  });

  it('toggles all frontier features true if frontier: true', () => {
    const features = { frontier: true };

    function Wrapper(props: BetaProviderProps) {
      return <BetaProvider features={features} {...props} />;
    }

    const { result } = renderHook(() => useBeta(), {
      wrapper: Wrapper,
    });
    expect(result.current).toEqual({
      fabric: false,
      flexGap: false,
      frontier: true,
      frontierButton: true,
      frontierCard: true,
      frontierColor: true,
      frontierSparkline: true,
      frontierTypography: true,
    });
  });

  it('handles frontier: true and individual frontier overrides properly', () => {
    const features = { frontier: true, frontierButton: false };

    function Wrapper(props: BetaProviderProps) {
      return <BetaProvider features={features} {...props} />;
    }

    const { result } = renderHook(() => useBeta(), {
      wrapper: Wrapper,
    });
    expect(result.current).toEqual({
      fabric: false,
      flexGap: false,
      frontier: true,
      frontierCard: true,
      frontierColor: true,
      frontierSparkline: true,
      frontierTypography: true,
      frontierButton: false,
    });
  });
});
