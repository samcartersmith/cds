import { useEffect } from 'react';

import { LottieListener, LottieAnimationRef } from './types';

export const useLottieListeners = (
  animationRef: LottieAnimationRef,
  listeners: LottieListener[] = []
) => {
  useEffect(() => {
    if (!listeners.length) {
      return;
    }

    const deregisterList = listeners.map(listener => {
      animationRef.current?.addEventListener(listener.name, listener.handler);

      // Return a function to deregister this listener
      return () => {
        animationRef.current?.removeEventListener(listener.name, listener.handler);
      };
    });

    // Deregister listeners on unmount
    return () => {
      deregisterList.forEach(deregister => deregister());
    };
  }, [listeners, animationRef]);
};
