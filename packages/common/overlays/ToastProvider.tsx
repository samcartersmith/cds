import React, { cloneElement, createContext, isValidElement, useMemo } from 'react';

import { DimensionValue, NoopFn } from '../types';

import { ToastNode, useToastQueue } from './useToastQueue';

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
  removeToast: async () => Promise.resolve(),
  clearToastQueue: () => {},
  pauseTimer: () => {},
  resumeTimer: () => {},
});

export const ToastProvider: React.FC<ToastProviderProps> = ({ children, toastBottomOffset }) => {
  const { activeToast, addToast, removeToast, clearToastQueue, pauseTimer, resumeTimer } =
    useToastQueue();

  const element = activeToast?.element;

  const memoizedContextValue = useMemo(
    () => ({
      addToast,
      removeToast,
      clearToastQueue,
      pauseTimer,
      resumeTimer,
    }),
    [addToast, removeToast, clearToastQueue, pauseTimer, resumeTimer],
  );

  return (
    <ToastContext.Provider value={memoizedContextValue}>
      {children}
      {/* render as the last element for it to work on android */}
      {isValidElement(element) && toastBottomOffset
        ? // props level offset should have higher specificity
          cloneElement(element, { bottomOffset: element.props.bottomOffset ?? toastBottomOffset })
        : element}
    </ToastContext.Provider>
  );
};
