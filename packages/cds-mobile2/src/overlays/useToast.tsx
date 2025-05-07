import React, { useCallback, useContext, useMemo } from 'react';
import { ToastContext } from '@cbhq/cds-common2/overlays/ToastProvider';
import {
  charsThreshold,
  defaultDuration,
  perCharsDuration,
  withActionDuration,
} from '@cbhq/cds-common2/tokens/toast';

import { Toast, type ToastBaseProps } from './Toast';

type ShowToastOptions = Omit<ToastBaseProps, 'text'> & {
  /**
   * Duration in milliseconds.
   * Duration is automatically calculated based on this formula https://docs.google.com/document/d/1s1u9CGb37HCeuMo2ZcVz7Zxo13HH6F10J7Z5W-8ks48
   * @danger This will override default calculated value.
   */
  duration?: number;
};

export const useToast = () => {
  const { addToast, removeToast, hideToast, clearToastQueue } = useContext(ToastContext);

  const showToast = useCallback(
    (text: string, options?: ShowToastOptions) => {
      const onDidHide = () => {
        options?.onDidHide?.();
        // unmount toast when using gesture or close button
        removeToast();
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
        options?.duration ?? calculateDuration(),
      );
    },
    [addToast, removeToast],
  );

  return useMemo(
    () => ({ show: showToast, hide: hideToast, clearQueue: clearToastQueue }),
    [showToast, clearToastQueue, hideToast],
  );
};
