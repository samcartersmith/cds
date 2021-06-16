import { useCallback, useRef } from 'react';

import { useMergedRef, AnyRef, CallbackRef } from '@cbhq/cds-common/hooks/useMergedRef';
import { emptyObject } from '@cbhq/cds-utils';
import { ScrollView } from 'react-native';

export type ScrollRef = CallbackRef<ScrollView> | null;
export type ScrollToParams = { x?: number; y?: number; animated?: boolean };
export type ScrollToFn = (params: ScrollToParams) => void;
export type ScrollToEndFn = (params?: { animated?: boolean }) => void;
export type ScrollToFns = {
  scrollTo: ScrollToFn;
  scrollToEnd: ScrollToEndFn;
};

export const useScrollTo = (ref?: AnyRef<ScrollView>): [ScrollRef, ScrollToFns] => {
  const internalRef = useRef<ScrollView>();
  const scrollRef = useMergedRef(ref, internalRef);
  const scrollTo = useCallback(({ x = 0, y = 0, animated = true }) => {
    internalRef.current?.scrollTo({ x, y, animated });
  }, []);

  const scrollToEnd = useCallback(({ animated = true } = emptyObject) => {
    internalRef.current?.scrollToEnd({ animated });
  }, []);

  return [scrollRef, { scrollTo, scrollToEnd }];
};
