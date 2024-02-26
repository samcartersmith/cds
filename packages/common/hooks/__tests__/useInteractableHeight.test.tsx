import { renderHook } from '@testing-library/react-hooks';
import { entries } from '@cbhq/cds-utils';

import { SystemProvider } from '../../SystemProvider';
import { interactableHeight } from '../../tokens/interactableHeight';
import { Scale } from '../../types';
import { useInteractableHeight } from '../useInteractableHeight';

function createWrapper({ scale }: { scale: Scale }) {
  const Wrapper: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
    <SystemProvider scale={scale}>{children}</SystemProvider>
  );
  return Wrapper;
}

describe('useInteractableHeight', () => {
  entries(interactableHeight).forEach(([scale, { compact, regular }]) => {
    it(`returns correct height compact: true in ${scale} scale`, () => {
      const { result } = renderHook(() => useInteractableHeight(true), {
        wrapper: createWrapper({ scale }),
      });
      expect(result.current).toEqual(compact);
    });

    it(`returns correct height for compact: false in ${scale} scale`, () => {
      const { result } = renderHook(() => useInteractableHeight(false), {
        wrapper: createWrapper({ scale }),
      });
      expect(result.current).toEqual(regular);
    });
  });
});
