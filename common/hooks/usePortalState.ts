import { ReactNode, useCallback, useMemo, useState } from 'react';

export type PortalNode = { key: string; node: ReactNode };

export const usePortalState = () => {
  const [nodes, setNodes] = useState<PortalNode[]>([]);

  const addNode = useCallback(
    (key: string, node: ReactNode) =>
      setNodes((prevNodes) => {
        const index = prevNodes.findIndex((item) => item.key === key);
        if (index !== -1) return prevNodes;

        return [...prevNodes, { key, node }];
      }),
    [],
  );

  const removeNode = useCallback(
    (key: string) => setNodes((prevNodes) => prevNodes.filter((item) => item.key !== key)),
    [],
  );

  return useMemo(() => ({ nodes, addNode, removeNode }), [nodes, addNode, removeNode]);
};
