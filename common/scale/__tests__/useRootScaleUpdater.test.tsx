import { useEffect } from 'react';

import { renderHook } from '@testing-library/react-hooks';

import { RootScaleProvider } from '../RootScaleProvider';
import { useRootScale } from '../useRootScale';
import { useRootScaleUpdater } from '../useRootScaleUpdater';

describe('useRootScaleUpdater', () => {
  it('updates with the correct value', () => {
    for (const scale of [
      'xSmall',
      'small',
      'medium',
      'large',
      'xLarge',
      'xxLarge',
      'xxxLarge',
    ] as const) {
      const { result } = renderHook(
        () => {
          const updateScale = useRootScaleUpdater();
          useEffect(() => {
            updateScale(scale);
          }, [updateScale]);
          return useRootScale();
        },
        {
          wrapper: RootScaleProvider,
        }
      );
      expect(result.current).toBe(scale);
    }
  });
});
