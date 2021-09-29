import React, { ReactNode, useCallback, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { OverlayZIndexKeys, zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { PortalContext, usePortal } from '@cbhq/cds-common/context/PortalContext';
import { usePortalState, PortalNode } from '@cbhq/cds-common/hooks/usePortalState';
import { isSSR } from '../utils/browser';

import { ThemeProvider } from '../system';

const portalContainer = document?.createElement('div');
const portalContainerId = 'portalRoot';

export const PortalHost: React.FC = () => {
  const { nodes } = usePortal();

  useEffect(() => {
    const target = document?.body;
    // avoid duplicate containers
    if (!document?.getElementById(portalContainerId)) {
      portalContainer.id = portalContainerId;
      portalContainer.style.zIndex = String(zIndex.overlays.portal);
      // enable stack order
      portalContainer.style.position = 'fixed';
      // enable stack order on children
      portalContainer.style.display = 'flex';
      // Append element to dom
      target?.appendChild(portalContainer);
    }

    return () => {
      // Remove element from dom
      target?.removeChild(portalContainer);
    };
  }, []);

  if (isSSR()) return null;

  return createPortal(
    <ThemeProvider>{nodes.map((item: PortalNode) => item.node)}</ThemeProvider>,
    portalContainer,
  );
};

export const PortalProvider: React.FC = ({ children }) => {
  const { nodes, addNode, removeNode } = usePortalState();

  const addPortal = useCallback(
    (portalKey: string, nodeChildren: ReactNode, zIndexKey?: OverlayZIndexKeys) => {
      addNode(
        portalKey,
        <div key={portalKey} style={{ zIndex: zIndexKey && zIndex.overlays[zIndexKey] }}>
          {nodeChildren}
        </div>,
      );
    },
    [addNode],
  );

  const removePortal = useCallback(
    (key: string) => {
      removeNode(key);
    },
    [removeNode],
  );

  const contextValue = useMemo(
    () => ({ nodes, addPortal, removePortal }),
    [nodes, addPortal, removePortal],
  );

  return (
    <PortalContext.Provider value={contextValue}>
      <PortalHost />
      {children}
    </PortalContext.Provider>
  );
};
