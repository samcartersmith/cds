import { renderHook } from '@testing-library/react-hooks';
import { entries } from '@cbhq/cds-utils';

import { FeatureFlagProvider } from '../../system/FeatureFlagProvider';
import { SystemProvider } from '../../SystemProvider';
import { compactHeight, defaultHeight } from '../../tokens/interactable';
import { interactableHeight } from '../../tokens/interactableHeight';
import { Scale } from '../../types';
import { useInteractableHeight } from '../useInteractableHeight';

function createWrapper({ frontierButton, scale }: { frontierButton: boolean; scale: Scale }) {
  const Wrapper: React.FC = ({ children }) => (
    <FeatureFlagProvider frontierButton={frontierButton}>
      <SystemProvider scale={scale}>{children}</SystemProvider>
    </FeatureFlagProvider>
  );
  return Wrapper;
}

describe('useInteractableHeight', () => {
  (['xSmall', 'large'] as const).forEach((scale) => {
    it(`returns correct height for frontier: false, comppact: true in ${scale} scale`, () => {
      const { result } = renderHook(() => useInteractableHeight(true), {
        wrapper: createWrapper({ frontierButton: false, scale }),
      });
      expect(result.current).toEqual(
        scale === 'xSmall' ? compactHeight.dense : compactHeight.normal,
      );
    });

    it(`returns correct height for frontier: false, compact: false in ${scale} scale`, () => {
      const { result } = renderHook(() => useInteractableHeight(false), {
        wrapper: createWrapper({ frontierButton: false, scale }),
      });
      expect(result.current).toEqual(
        scale === 'xSmall' ? defaultHeight.dense : defaultHeight.normal,
      );
    });
  });

  // Frontier tests
  entries(interactableHeight).forEach(([scale, { compact, regular }]) => {
    it(`returns correct height for frontier: true, comppact: true in ${scale} scale`, () => {
      const { result } = renderHook(() => useInteractableHeight(true), {
        wrapper: createWrapper({ frontierButton: true, scale }),
      });
      expect(result.current).toEqual(compact);
    });

    it(`returns correct height for frontier: true, compact: false in ${scale} scale`, () => {
      const { result } = renderHook(() => useInteractableHeight(false), {
        wrapper: createWrapper({ frontierButton: true, scale }),
      });
      expect(result.current).toEqual(regular);
    });
  });
});
