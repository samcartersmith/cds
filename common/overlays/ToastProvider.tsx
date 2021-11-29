import React, { createContext } from 'react';
import { useToastQueue, ToastNode } from './useToastQueue';

export type ToastProviderStates = {
  activeToast?: ToastNode;
  addToast: (element: ToastNode['element'], duration: number) => void;
  removeToast: () => void;
};

export const ToastContext = createContext<ToastProviderStates>({
  activeToast: undefined,
  addToast: () => {},
  removeToast: () => {},
});

export const ToastProvider: React.FC = ({ children }) => {
  const toastState = useToastQueue();

  return (
    <ToastContext.Provider value={toastState}>
      {toastState.activeToast?.element}
      {children}
    </ToastContext.Provider>
  );
};
