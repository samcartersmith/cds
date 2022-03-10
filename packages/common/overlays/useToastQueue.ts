import {
  cloneElement,
  ReactElement,
  RefAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useTimer } from '../hooks/useTimer';
import { ToastBaseProps, ToastRefBaseProps } from '../types';

export type ToastNode = {
  duration: number;
  element: ReactElement<ToastBaseProps & RefAttributes<ToastRefBaseProps>>;
};

export const useToastQueue = () => {
  const [activeToast, setActiveToast] = useState<ToastNode>();
  const toastQueue = useRef<ToastNode[]>([]);
  const activeToastRef = useRef<ToastRefBaseProps | null>(null);
  const timer = useTimer();

  const removeToast = useCallback(
    async (shouldTriggerAnimation = true) => {
      if (shouldTriggerAnimation) {
        // wait for animation to finish
        await activeToastRef.current?.hide();
      }
      timer.clear();
      setActiveToast(undefined);
    },
    [timer, setActiveToast, activeToastRef],
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
      timer.start(() => {
        void removeToast();
      }, toast.duration);
    },
    [timer, removeToast],
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

  const clearToastQueue = useCallback(async () => {
    await removeToast();
    toastQueue.current.length = 0;
  }, [removeToast]);

  return {
    activeToast,
    addToast,
    removeToast,
    clearToastQueue,
    pauseTimer: timer.pause,
    resumeTimer: timer.resume,
  };
};
