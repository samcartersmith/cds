import { createContext, ReactNode } from 'react';
import { PortalNode } from './usePortalState';

export type PortalProviderStates = {
  addNode: (id: string, nodeChildren: ReactNode) => void;
  removeNode: (id: string) => void;
  nodes: PortalNode[];
};

export const PortalContext = createContext<PortalProviderStates>({
  addNode: () => {},
  removeNode: () => {},
  nodes: [],
});
