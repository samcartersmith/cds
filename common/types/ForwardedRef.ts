import type { MutableRefObject, RefObject } from 'react';

export type ForwardedRef<T> = T extends keyof JSX.IntrinsicElements
  ? React.RefObject<React.ElementRef<T>>
  : ((instance: T | null) => void) | MutableRefObject<T | null> | RefObject<T> | null;
