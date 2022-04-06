import React, { memo } from 'react';
import { Platform } from 'react-native';
import { DimensionValue } from '@cbhq/cds-common';
import { PortalContext } from '@cbhq/cds-common/overlays/PortalContext';
import { ToastProvider } from '@cbhq/cds-common/overlays/ToastProvider';
import { PortalNode, usePortalState } from '@cbhq/cds-common/overlays/usePortalState';

export type PortalProviderProps = {
  toastBottomOffset?: DimensionValue;
};

type PortalHostProps = { nodes: PortalNode[] };

const PortalHost = memo(({ nodes }: PortalHostProps) => {
  if (!nodes.length) return null;

  const isAndroid = Platform.OS === 'android';

  const elements = nodes.map((node) => node.element);

  if (elements.length > 1) {
    // multiple modal doesn't work if they are at the same level
    // insert node into previous node as children to avoid it
    return elements.reduce((parent, child) => {
      return React.cloneElement(parent, {
        children: (
          <>
            {!isAndroid && child}
            {parent.props.children}
            {isAndroid && child}
          </>
        ),
      });
    }, nodes[0].element);
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{elements}</>;
});

export const PortalProvider: React.FC<PortalProviderProps> = ({
  children,
  toastBottomOffset = 0,
}) => {
  const portalState = usePortalState();

  return (
    <PortalContext.Provider value={portalState}>
      <ToastProvider toastBottomOffset={toastBottomOffset}>
        <PortalHost nodes={portalState.nodes} />
        {children}
      </ToastProvider>
    </PortalContext.Provider>
  );
};
