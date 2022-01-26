import React, { ComponentType, useCallback, useContext, useMemo } from 'react';

import {
  charsThreshold,
  defaultDuration,
  perCharsDuration,
  withActionDuration,
} from '../tokens/toast';
import { ToastBaseProps, ToastOptions, ToastText } from '../types';

import { ToastContext } from './ToastProvider';

export const useToast = (Toast: ComponentType<ToastBaseProps>) => {
  const { addToast, removeToast, clearToastQueue } = useContext(ToastContext);

  const showToast = useCallback(
    (text: ToastText, options?: ToastOptions) => {
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
