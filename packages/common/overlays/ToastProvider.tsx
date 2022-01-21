import React, { createContext, cloneElement, isValidElement } from 'react';
import { useToastQueue, ToastNode } from './useToastQueue';
import { NoopFn, DimensionValue } from '../types';

export type ToastProviderStates = {
  activeToast?: ToastNode;
  addToast: (element: ToastNode['element'], duration: number) => void;
  removeToast: (shouldTriggerAnimation?: boolean) => Promise<void>;
  clearToastQueue: NoopFn;
  pauseTimer: NoopFn;
  resumeTimer: NoopFn;
};

export type ToastProviderProps = {
  toastBottomOffset?: DimensionValue;
};

export const ToastContext = createContext<ToastProviderStates>({
  activeToast: undefined,
  addToast: () => {},
  // eslint-disable-next-line compat/compat
  removeToast: async () => Promise.resolve(),
  clearToastQueue: () => {},
  pauseTimer: () => {},
  resumeTimer: () => {},
});

export const ToastProvider: React.FC<ToastProviderProps> = ({ children, toastBottomOffset }) => {
  const { activeToast, ...contextValue } = useToastQueue();

  const element = activeToast?.element;

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {/* render as the last element for it to work on android */}
      {isValidElement(element) && toastBottomOffset
        ? cloneElement(element, { bottomOffset: toastBottomOffset })
        : element}
    </ToastContext.Provider>
  );
};
