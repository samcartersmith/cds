import { useEffect } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { RootSpectrumPreferenceProvider } from '../RootSpectrumPreferenceProvider';
import { useRootSpectrumPreference } from '../useRootSpectrumPreference';
import { useRootSpectrumPreferenceUpdater } from '../useRootSpectrumPreferenceUpdater';

describe('useRootSpectrumUpdater', () => {
  it('updates with the correct value', () => {
    for (const spectrum of ['light', 'dark'] as const) {
      const { result } = renderHook(
        () => {
          const updateScale = useRootSpectrumPreferenceUpdater();
          useEffect(() => {
            updateScale(spectrum);
          }, [updateScale]);
          return useRootSpectrumPreference();
        },
        {
          wrapper: RootSpectrumPreferenceProvider,
        },
      );
      expect(result.current).toBe(spectrum);
    }
  });
});
