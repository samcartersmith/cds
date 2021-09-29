import { createContext, ReactNode, useContext } from 'react';
import { PortalNode } from '../hooks/usePortalState';
import { OverlayZIndexKeys } from '../tokens/zIndex';

export type PortalProviderStates = {
  addPortal: (key: string, node: ReactNode, zIndexKey?: OverlayZIndexKeys) => void;
  removePortal: (key: string) => void;
  nodes: PortalNode[];
};

export const PortalContext = createContext<PortalProviderStates>({
  addPortal: () => {},
  removePortal: () => {},
  nodes: [],
});

export const usePortal = () => useContext(PortalContext);
