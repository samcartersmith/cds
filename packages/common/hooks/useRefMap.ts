import { useCallback, useMemo } from 'react';

export type RefMapItem = { id: string };

export type RefMapApi<RefValue> = {
  refs: WeakMap<RefMapItem, RefValue>;
  getRef: (id: string) => RefValue | null;
  registerRef: (id: string, ref: RefValue) => void;
};

export const useRefMap = <RefValue>(items: RefMapItem[]): RefMapApi<RefValue> => {
  const refs = useMemo(() => new WeakMap<RefMapItem, RefValue>(), []);

  const getRef = useCallback(
    (id: string) => {
      const item = items.find((item) => item.id === id);
      return item ? refs.get(item) || null : null;
    },
    [items, refs],
  );

  const registerRef = useCallback(
    (id: string, ref: RefValue) => {
      const item = items.find((item) => item.id === id);
      if (item) refs.set(item, ref);
    },
    [items, refs],
  );

  const api = useMemo(() => ({ refs, getRef, registerRef }), [refs, getRef, registerRef]);
  return api;
};
