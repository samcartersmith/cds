export type ForwardedRef<T> = T extends keyof JSX.IntrinsicElements
  ? React.RefObject<React.ElementRef<T>>
  : ((instance: T | null) => void) | React.MutableRefObject<T | null> | React.RefObject<T> | null;
