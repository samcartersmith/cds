import React, { createContext } from 'react';
import { useToastQueue, ToastNode } from './useToastQueue';

export type ToastProviderStates = {
  activeToast?: ToastNode;
  addToast: (element: ToastNode['element'], duration: number) => void;
  removeToast: (shouldTriggerAnimation?: boolean) => Promise<void>;
};

export const ToastContext = createContext<ToastProviderStates>({
  activeToast: undefined,
  addToast: () => {},
  removeToast: async () => Promise.resolve(),
});

export const ToastProvider: React.FC = ({ children }) => {
  const toastState = useToastQueue();

  return (
    <ToastContext.Provider value={toastState}>
      {children}
      {/* render as the last element for it to work on android */}
      {toastState.activeToast?.element}
    </ToastContext.Provider>
  );
};
