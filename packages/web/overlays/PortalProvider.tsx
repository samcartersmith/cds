import React, { memo, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { PortalContext } from '@cbhq/cds-common/overlays/PortalContext';
import { ToastProvider, ToastProviderProps } from '@cbhq/cds-common/overlays/ToastProvider';
import { PortalNode, usePortalState } from '@cbhq/cds-common/overlays/usePortalState';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';

import { IsoHexagonClipPath } from '../media/Hexagon';
import { BrowserOnly } from '../system/BrowserOnly';
import { getBrowserGlobals } from '../utils/browser';

export type PortalProviderProps = ToastProviderProps;

export const portalRootId = 'portalRoot';
export const modalContainerId = 'modalsContainer';
export const alertContainerId = 'alertsContainer';
export const toastContainerId = 'toastsContainer';
export const tooltipContainerId = 'tooltipContainer';

const safeDocument = getBrowserGlobals()?.document;

const PortalHost = memo(() => {
  const portalRoot = useMemo(
    // prevent duplicate portal root
    () => safeDocument?.createElement('div'),
    [],
  );

  useEffect(() => {
    const target = safeDocument?.body;

    // prevent duplicate host
    if (safeDocument?.getElementById(portalRootId) || !portalRoot) return undefined;

    portalRoot.id = portalRootId;
    portalRoot.style.zIndex = String(zIndex.overlays.portal);
    // enable stack order
    portalRoot.style.position = 'relative';
    // enable stack order on children
    portalRoot.style.display = 'flex';

    // Append element to dom
    target?.appendChild(portalRoot);

    // Avoid removing child from other provider
    // This happens when multiple PortalProvider are defined
    return () => {
      // Remove element from dom
      target?.removeChild(portalRoot);
    };
  }, [portalRoot]);

  if (!portalRoot) return null;

  return createPortal(
    <>
      <div
        id={modalContainerId}
        style={{ zIndex: zIndex.overlays.modal }}
        data-testid="portal-modal-container"
      />
      <div
        id={toastContainerId}
        style={{ zIndex: zIndex.overlays.toast }}
        data-testid="portal-toast-container"
      />
      <div
        id={alertContainerId}
        style={{ zIndex: zIndex.overlays.alert }}
        data-testid="portal-alert-container"
      />
      <div
        id={tooltipContainerId}
        style={{ zIndex: zIndex.overlays.tooltip }}
        data-testid="portal-tooltip-container"
      />
    </>,
    portalRoot,
  );
});

export const PortalProvider: React.FC<React.PropsWithChildren<PortalProviderProps>> = memo(
  ({ children, toastBottomOffset = 0 }) => {
    const portalState = usePortalState();

    return (
      <PortalContext.Provider value={portalState}>
        <ToastProvider toastBottomOffset={toastBottomOffset}>
          <BrowserOnly>
            <PortalHost />
          </BrowserOnly>
          {portalState.nodes.map((node: PortalNode) => node.element)}
          {children}
          <IsoHexagonClipPath />
        </ToastProvider>
      </PortalContext.Provider>
    );
  },
);

export { PortalHost };
