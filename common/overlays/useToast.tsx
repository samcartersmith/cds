import React, { ComponentType, useCallback, useContext, useMemo } from 'react';

import { ToastBaseProps, ToastText, ToastOptions } from '../types';
import { ToastContext } from './ToastProvider';
import {
  defaultDuration,
  withActionDuration,
  perCharsDuration,
  charsThreshold,
} from '../tokens/toast';

export const useToast = <T,>(Toast: ComponentType<ToastBaseProps>) => {
  const { addToast, removeToast, clearToastQueue } = useContext(ToastContext);

  const showToast = useCallback(
    (text: ToastText, options?: ToastOptions & T) => {
      // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
      const onDidHide = () => {
        options?.onDidHide?.();
        void removeToast(false);
      };

      const calculateDuration = () => {
        let duration = defaultDuration;

        if (options?.action) duration += withActionDuration;
        // when more than 50 chars, add 0.3s per 10 chars
        if (text.length > charsThreshold)
          duration += Math.round(((text.length - charsThreshold) / 10) * perCharsDuration);

        return duration;
      };

      addToast(
        <Toast text={text} {...options} onDidHide={onDidHide} />,
        options?.dangerouslySetDuration ?? calculateDuration(),
      );
    },
    [addToast, removeToast, Toast],
  );

  return useMemo(
    () => ({ show: showToast, hide: removeToast, clearQueue: clearToastQueue }),
    [showToast, removeToast, clearToastQueue],
  );
};
