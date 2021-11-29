import { useCallback, useState, useEffect, useRef } from 'react';
import { PortalNode } from './usePortalState';

export type ToastNode = { duration: number } & Pick<PortalNode, 'element'>;

export const useToastQueue = () => {
  const [activeToast, setActiveToast] = useState<ToastNode>();
  const toastQueue = useRef<ToastNode[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const clearTimer = useCallback(
    () => clearTimeout(timeoutRef.current as ReturnType<typeof setTimeout>),
    [],
  );

  const removeToast = useCallback(() => {
    setActiveToast(undefined);
    clearTimer();
  }, [clearTimer]);

  const setToast = useCallback(
    (toast?: ToastNode) => {
      if (!toast) return;

      setActiveToast(toast);

      // remove toast after duration
      timeoutRef.current = setTimeout(() => {
        removeToast();
      }, toast.duration);
    },
    [setActiveToast, removeToast],
  );

  const addToast = useCallback(
    (element: ToastNode['element'], duration: number) => {
      const toast = { element, duration };
      if (activeToast) {
        toastQueue.current.push(toast);
      } else {
        setToast(toast);
      }
    },
    [toastQueue, setToast, activeToast],
  );

  useEffect(() => {
    // dequeue toast to active
    if (activeToast === undefined && toastQueue.current.length > 0) {
      setToast(toastQueue.current.shift());
    }
  }, [activeToast, toastQueue, setToast]);

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  const clearToastQueue = () => {
    removeToast();
    toastQueue.current.length = 0;
  };

  return { activeToast, addToast, removeToast, clearToastQueue };
};
