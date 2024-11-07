import { useEffect } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { RootScalePreferenceProvider } from '../RootScalePreferenceProvider';
import { useRootScalePreference } from '../useRootScalePreference';
import { useRootScalePreferenceUpdater } from '../useRootScalePreferenceUpdater';

describe('useRootScalePreferenceUpdater', () => {
  it('updates with the correct value', () => {
    for (const scale of [
      'xSmall',
      'small',
      'medium',
      'large',
      'xLarge',
      'xxLarge',
      'xxxLarge',
      'system',
    ] as const) {
      const { result } = renderHook(
        () => {
          const updateScale = useRootScalePreferenceUpdater();
          useEffect(() => {
            updateScale(scale);
          }, [updateScale]);
          return useRootScalePreference();
        },
        {
          wrapper: RootScalePreferenceProvider,
        },
      );
      expect(result.current).toBe(scale);
    }
  });
});
