import React, { memo, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { PortalContext } from '@cbhq/cds-common/overlays/PortalContext';
import { ToastProvider } from '@cbhq/cds-common/overlays/ToastProvider';
import { PortalNode, usePortalState } from '@cbhq/cds-common/overlays/usePortalState';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';

import { ThemeProvider } from '../system';
import { isBrowser } from '../utils/browser';

export const portalRootId = 'portalRoot';
export const modalContainerId = 'modalsContainer';
export const alertContainerId = 'alertsContainer';
export const toastContainerId = 'toastsContainer';
export const tooltipContainerId = 'tooltipContainer';

const PortalHost = memo(() => {
  const portalRoot = useMemo(
    // prevent duplicate portal root
    () => document.createElement('div'),
    [],
  );

  useEffect(() => {
    const target = document?.body;

    // prevent duplicate host
    if (document?.getElementById(portalRootId) || !portalRoot) return undefined;

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

  return createPortal(
    <ThemeProvider>
      <div id={modalContainerId} style={{ zIndex: zIndex.overlays.modal }} />
      <div id={toastContainerId} style={{ zIndex: zIndex.overlays.toast }} />
      <div id={alertContainerId} style={{ zIndex: zIndex.overlays.alert }} />
      <div id={tooltipContainerId} style={{ zIndex: zIndex.overlays.tooltip }} />
    </ThemeProvider>,
    portalRoot,
  );
});

export const PortalProvider: React.FC = memo(({ children }) => {
  const portalState = usePortalState();

  return (
    <PortalContext.Provider value={portalState}>
      <ToastProvider>
        {isBrowser() && <PortalHost />}
        {portalState.nodes.map((node: PortalNode) => node.element)}
        {children}
      </ToastProvider>
    </PortalContext.Provider>
  );
});
