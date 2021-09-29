import React, { ReactNode, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { OverlayZIndexKeys, zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { PortalContext, usePortal } from '@cbhq/cds-common/context/PortalContext';
import { usePortalState, PortalNode } from '@cbhq/cds-common/hooks/usePortalState';

export const PortalHost: React.FC = () => {
  const { nodes } = usePortal();

  return <View>{nodes.map((item: PortalNode) => item.node)}</View>;
};

export const PortalProvider: React.FC = ({ children }) => {
  const { nodes, addNode, removeNode } = usePortalState();

  const addPortal = useCallback(
    (portalKey: string, nodeChildren: ReactNode, zIndexKey?: OverlayZIndexKeys) => {
      addNode(
        portalKey,
        <View key={portalKey} style={{ zIndex: zIndexKey && zIndex.overlays[zIndexKey] }}>
          {nodeChildren}
        </View>,
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
