import { useCallback, useRef } from 'react';

import { useMergedRef, AnyRef, CallbackRef } from '@cbhq/cds-common/hooks/useMergedRef';
import { ScrollView } from 'react-native';

export type ScrollRef = CallbackRef<ScrollView> | null;
export type ScrollToParams = { x?: number; y?: number; animated?: boolean };
export type ScrollToFn = (params: ScrollToParams) => void;

export const useScrollTo = (ref?: AnyRef<ScrollView>): [ScrollRef, ScrollToFn] => {
  const internalRef = useRef<ScrollView>();
  const scrollRef = useMergedRef(ref, internalRef);
  const scrollTo = useCallback(
    ({ x = 0, y = 0, animated = true }) => internalRef.current?.scrollTo({ x, y, animated }),
    []
  );
  return [scrollRef, scrollTo];
};
