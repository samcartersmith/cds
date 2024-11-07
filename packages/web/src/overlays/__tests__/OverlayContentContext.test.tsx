/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import React from 'react';
import { renderHook } from '@testing-library/react';
import { useOverlayContentContext } from '@cbhq/cds-common/overlays/OverlayContentContext';

import { FullscreenModal } from '../Modal/FullscreenModal';
import { Modal } from '../Modal/Modal';
import { Overlay } from '../Overlay/Overlay';

describe('useOverlayContentContext', () => {
  it('should return isOverlay as true when rendered inside Overlay', () => {
    const { result } = renderHook(() => useOverlayContentContext(), {
      wrapper: Overlay,
    });
    expect(result.current.isOverlay).toBe(true);
    expect(result.current.isModal).toBeUndefined();
    expect(result.current.isDrawer).toBeUndefined();
  });

  it('should return isOverlay and isModal as true when rendered inside Modal', () => {
    const { result } = renderHook(() => useOverlayContentContext(), {
      wrapper: ({ children }) => (
        <Modal visible onRequestClose={() => void false}>
          {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
          <>{children}</>
        </Modal>
      ),
    });
    expect(result.current.isOverlay).toBe(true);
    expect(result.current.isModal).toBe(true);
    expect(result.current.isDrawer).toBeUndefined();
  });

  it('should return isOverlay and isModal as true when rendered inside FullscreenModal', () => {
    const { result } = renderHook(() => useOverlayContentContext(), {
      wrapper: ({ children }) => (
        <FullscreenModal
          visible
          onRequestClose={() => void false}
          // eslint-disable-next-line react/jsx-no-useless-fragment
          primaryContent={<>{children}</>}
        />
      ),
    });
    expect(result.current.isOverlay).toBe(true);
    expect(result.current.isModal).toBe(true);
    expect(result.current.isDrawer).toBeUndefined();
  });

  it('should return all values as undefined when rendered without provider', () => {
    const { result } = renderHook(() => useOverlayContentContext());
    expect(result.current.isOverlay).toBeUndefined();
    expect(result.current.isModal).toBeUndefined();
    expect(result.current.isDrawer).toBeUndefined();
  });
});
