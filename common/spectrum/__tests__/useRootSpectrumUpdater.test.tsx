import { useEffect } from 'react';

import { renderHook } from '@testing-library/react-hooks';

import { RootSpectrumProvider } from '../RootSpectrumProvider';
import { useRootSpectrum } from '../useRootSpectrum';
import { useRootSpectrumUpdater } from '../useRootSpectrumUpdater';

describe('useRootSpectrumUpdater', () => {
  it('updates with the correct value', () => {
    for (const spectrum of ['light', 'dark'] as const) {
      const { result } = renderHook(
        () => {
          const updateScale = useRootSpectrumUpdater();
          useEffect(() => {
            updateScale(spectrum);
          }, [updateScale]);
          return useRootSpectrum();
        },
        {
          wrapper: RootSpectrumProvider,
        },
      );
      expect(result.current).toBe(spectrum);
    }
  });
});
