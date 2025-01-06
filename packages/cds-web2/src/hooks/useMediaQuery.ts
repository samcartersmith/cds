import { useCallback, useContext, useSyncExternalStore } from 'react';

import { MediaQueryContext } from '../system/MediaQueryProvider';

export const useMediaQuery = (query: string): boolean => {
  const context = useContext(MediaQueryContext);
  if (!context) throw new Error('useMediaQuery must be used within a MediaQueryProvider');
  const { subscribe, getSnapshot, getServerSnapshot } = context;
  const subscribeFn = useCallback(
    (callback: () => void) => subscribe(query, callback),
    [subscribe, query],
  );
  const getSnapshotFn = useCallback(() => getSnapshot(query), [getSnapshot, query]);
  const getServerSnapshotFn = useCallback(
    () => getServerSnapshot(query),
    [getServerSnapshot, query],
  );
  return useSyncExternalStore(subscribeFn, getSnapshotFn, getServerSnapshotFn);
};
