import React, { useEffect, memo } from 'react';
import { createPortal } from 'react-dom';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { PortalContext } from '@cbhq/cds-common/overlays/PortalContext';
import { usePortalState, PortalNode } from '@cbhq/cds-common/overlays/usePortalState';
import { ThemeProvider } from '../system';

const portalRoot = document?.createElement('div');
export const portalRootId = 'portalRoot';
export const modalContainerId = 'modalsContainer';
export const alertContainerId = 'alertsContainer';

const PortalHost = memo(() => {
  useEffect(() => {
    const target = document?.body;

    // prevent duplicate portal root
    if (document?.getElementById(portalRootId)) return undefined;

    portalRoot.id = portalRootId;
    portalRoot.style.zIndex = String(zIndex.overlays.portal);
    // enable stack order
    portalRoot.style.position = 'fixed';
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
  }, []);

  // prevent duplicate host
  if (document?.getElementById(portalRootId)) return null;

  return createPortal(
    <ThemeProvider>
      <div id={modalContainerId} style={{ zIndex: zIndex.overlays.modal }} />
      <div id={alertContainerId} style={{ zIndex: zIndex.overlays.alert }} />
    </ThemeProvider>,
    portalRoot,
  );
});

export const PortalProvider: React.FC = ({ children }) => {
  const portalState = usePortalState();

  return (
    <PortalContext.Provider value={portalState}>
      <PortalHost />
      {portalState.nodes.map((node: PortalNode) => node.element)}
      {children}
    </PortalContext.Provider>
  );
};
