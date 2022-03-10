import { renderHook } from '@testing-library/react-hooks';

import { FeatureFlagProvider } from '../../system/FeatureFlagProvider';
import { useButtonIconSize } from '../useButtonIconSize';

function createHook({ compact, frontier }: { compact?: boolean; frontier?: boolean }) {
  return renderHook(
    () => {
      return useButtonIconSize(compact);
    },
    frontier
      ? {
          wrapper: FeatureFlagProvider,
          initialProps: {
            frontierButton: true,
          },
        }
      : {},
  ).result.current;
}

describe('useButtonIconSize', () => {
  it('returns correct size for compact: false, frontier: false', () => {
    const value = createHook({ compact: false, frontier: false });
    expect(value).toBe('s');
  });

  it('returns correct size for compact: true, frontier: false', () => {
    const value = createHook({ compact: true, frontier: false });
    expect(value).toBe('xs');
  });

  // Frontier tests
  it('returns correct size for compact: false, frontier: true', () => {
    const value = createHook({ compact: false, frontier: true });
    expect(value).toBe('m');
  });

  it('returns correct size for compact: true, frontier: true', () => {
    const value = createHook({ compact: true, frontier: true });
    expect(value).toBe('s');
  });
});
