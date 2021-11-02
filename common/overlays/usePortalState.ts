import { ReactElement, useCallback, useMemo, useState } from 'react';

export type PortalNode = { id: string; element: ReactElement };

export const usePortalState = () => {
  const [nodes, setNodes] = useState<PortalNode[]>([]);

  const addNode = useCallback((id: string, element: PortalNode['element']) => {
    setNodes((prevNodes) => {
      const index = prevNodes.findIndex((item) => item.id === id);
      if (index !== -1) return prevNodes;

      return [...prevNodes, { id, element }];
    });
  }, []);

  const removeNode = useCallback(
    (id: string) => setNodes((prevNodes) => prevNodes.filter((item) => item.id !== id)),
    [],
  );

  return useMemo(() => ({ nodes, addNode, removeNode }), [nodes, addNode, removeNode]);
};
