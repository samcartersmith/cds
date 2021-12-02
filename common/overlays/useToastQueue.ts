import {
  useCallback,
  useState,
  useEffect,
  useRef,
  ReactElement,
  RefAttributes,
  cloneElement,
} from 'react';
import { ToastRefBaseProps, ToastBaseProps } from '../types';

export type ToastNode = {
  duration: number;
  element: ReactElement<ToastBaseProps & RefAttributes<ToastRefBaseProps>>;
};

export const useToastQueue = () => {
  const [activeToast, setActiveToast] = useState<ToastNode>();
  const toastQueue = useRef<ToastNode[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const activeToastRef = useRef<ToastRefBaseProps | null>(null);

  const clearTimer = useCallback(() => {
    clearTimeout(timeoutRef.current as ReturnType<typeof setTimeout>);
    timeoutRef.current = undefined;
  }, []);

  const removeToast = useCallback(
    async (shouldTriggerAnimation = true) => {
      if (shouldTriggerAnimation) {
        // wait for animation to finish
        await activeToastRef.current?.hide();
      }
      clearTimer();
      setActiveToast(undefined);
    },
    [clearTimer, setActiveToast, activeToastRef],
  );

  const setToast = useCallback(
    (toast?: ToastNode) => {
      if (!toast) return;

      activeToastRef.current = null;

      setActiveToast({
        ...toast,
        element: cloneElement(toast.element, { ref: activeToastRef }),
      });

      // remove toast after duration
      timeoutRef.current = setTimeout(() => {
        void removeToast();
      }, toast.duration);
    },
    [removeToast],
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
    void removeToast();
    toastQueue.current.length = 0;
  };

  return { activeToast, addToast, removeToast, clearToastQueue };
};
