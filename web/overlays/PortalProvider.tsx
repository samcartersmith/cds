import React, { useEffect, useMemo } from 'react';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { PortalContext } from '@cbhq/cds-common/overlays/PortalContext';
import { usePortalState, PortalNode } from '@cbhq/cds-common/overlays/usePortalState';

export const portalRootId = 'portalRoot';
export const modalContainerId = 'modalContainer';

export const PortalProvider: React.FC = ({ children }) => {
  const { nodes, addNode, removeNode } = usePortalState();

  useEffect(() => {
    const target = document?.body;
    const portalRoot = document?.createElement('div');
    const modalContainer = document?.createElement('div');

    // avoid duplicate containers
    if (!document?.getElementById(portalRootId)) {
      portalRoot.id = portalRootId;
      portalRoot.style.zIndex = String(zIndex.overlays.portal);
      // enable stack order
      portalRoot.style.position = 'fixed';
      // enable stack order on children
      portalRoot.style.display = 'flex';

      // contains all portal modals
      modalContainer.id = modalContainerId;
      modalContainer.style.zIndex = String(zIndex.overlays.modal);

      // append containers to portal root
      portalRoot.appendChild(modalContainer);
      // Append element to dom
      target?.appendChild(portalRoot);

      // TODO: Insert ThemeProvider inside portal

      // Moved into conditional to avoid removing child from other provider
      // This happens when multiple PortalProvider are defined
      return () => {
        // Remove element from dom
        target?.removeChild(portalRoot);
      };
    }

    return undefined;
  }, []);

  const contextValue = useMemo(
    () => ({ nodes, addNode, removeNode }),
    [nodes, addNode, removeNode],
  );

  return (
    <PortalContext.Provider value={contextValue}>
      {nodes.map((node: PortalNode) => node.element)}
      {children}
    </PortalContext.Provider>
  );
};
