import React, { memo, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { PortalContext } from '@cbhq/cds-common/overlays/PortalContext';
import { ToastProvider, ToastProviderProps } from '@cbhq/cds-common/overlays/ToastProvider';
import { usePortal } from '@cbhq/cds-common/overlays/usePortal';
import { PortalNode, usePortalState } from '@cbhq/cds-common/overlays/usePortalState';

import { IsoHexagonClipPath } from '../media/Hexagon';
import { zIndex } from '../styles/styles';
import { BrowserOnly } from '../system/BrowserOnly';
import { getBrowserGlobals } from '../utils/browser';

export type PortalProviderProps = ToastProviderProps & {
  /**
   * By default the PortalProvider will render portal nodes. Disable this if you want to use the PortalNodes component to render the nodes instead.
   * @default true
   */
  renderPortals?: boolean;
};

export const portalRootId = 'portalRoot';
export const modalContainerId = 'modalsContainer';
export const alertContainerId = 'alertsContainer';
export const toastContainerId = 'toastsContainer';
export const tooltipContainerId = 'tooltipContainer';

const safeDocument = getBrowserGlobals()?.document;

export const PortalHost: React.FC = memo(() => {
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
    portalRoot.style.zIndex = 'var(--zIndex-portal)';
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
      <div className={zIndex.modal} data-testid="portal-modal-container" id={modalContainerId} />
      <div className={zIndex.toast} data-testid="portal-toast-container" id={toastContainerId} />
      <div className={zIndex.alert} data-testid="portal-alert-container" id={alertContainerId} />
      <div
        className={zIndex.tooltip}
        data-testid="portal-tooltip-container"
        id={tooltipContainerId}
      />
    </>,
    portalRoot,
  );
});

export const PortalProvider: React.FC<React.PropsWithChildren<PortalProviderProps>> = memo(
  ({ children, toastBottomOffset = 0, renderPortals = true }) => {
    const portalState = usePortalState();

    return (
      <PortalContext.Provider value={portalState}>
        <ToastProvider toastBottomOffset={toastBottomOffset}>
          {renderPortals && (
            <>
              <BrowserOnly>
                <PortalHost />
              </BrowserOnly>
              {portalState.nodes.map((node: PortalNode) => node.element)}
            </>
          )}
          {children}
          <IsoHexagonClipPath />
        </ToastProvider>
      </PortalContext.Provider>
    );
  },
);

export const PortalNodes = () => {
  const { nodes } = usePortal();
  return (
    <>
      <BrowserOnly>
        <PortalHost />
      </BrowserOnly>
      {nodes.map((node: PortalNode) => node.element)}
    </>
  );
};
