import React, { ReactNode, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { OverlayZIndexKeys, zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { PortalContext } from '@cbhq/cds-common/overlays/PortalContext';
import { usePortalState, PortalNode } from '@cbhq/cds-common/overlays/usePortalState';

export const PortalProvider: React.FC = ({ children }) => {
  const { nodes, addNode, removeNode } = usePortalState();

  const addPortalNode = useCallback(
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

  const contextValue = useMemo(
    () => ({ nodes, addNode: addPortalNode, removeNode }),
    [nodes, addPortalNode, removeNode],
  );

  return (
    <PortalContext.Provider value={contextValue}>
      <View>{nodes.map((item: PortalNode) => item.node)}</View>
      {children}
    </PortalContext.Provider>
  );
};
