import { renderHook } from '@testing-library/react-hooks';

import { frontierFeaturesOn, DEFAULT_BETA_CONTEXT } from '../BetaContext';
import { BetaProvider } from '../BetaProvider';
import { useBeta } from '../useBeta';

describe('BetaProvider', () => {
  it('sets DEFAULT_BETA_CONTEXT iF no props are provided', () => {
    const { result } = renderHook(() => useBeta(), {
      wrapper: (props) => <BetaProvider {...props} />,
    });
    expect(result.current).toEqual(DEFAULT_BETA_CONTEXT);
  });

  it('toggles all frontier features true if frontier: true', () => {
    const features = { frontier: true };
    const { result } = renderHook(() => useBeta(), {
      wrapper: (props) => <BetaProvider features={features} {...props} />,
    });
    expect(result.current).toEqual({
      fontMigration: false,
      frontier: true,
      ...frontierFeaturesOn,
    });
  });

  it('handles frontier: true and individual frontier overrides properly', () => {
    const features = { frontier: true, frontierButton: false };
    const { result } = renderHook(() => useBeta(), {
      wrapper: (props) => <BetaProvider features={features} {...props} />,
    });
    expect(result.current).toEqual({
      fontMigration: false,
      frontier: true,
      ...frontierFeaturesOn,
      frontierButton: false,
    });
  });
});
