import { useCallback, useEffect, useRef } from 'react';

import { LottiePlayer } from '../types/LottiePlayer';
import { LottieSource } from '../types/LottieSource';
import { LottieStatusAnimationType } from '../types/LottieStatusAnimationProps';

// TODO: Figure out where we can codegen these types from lottie-files
type TradeStatusLottie = LottieSource<
  | 'loadingStart'
  | 'loadingEnd'
  | 'successStart'
  | 'successEnd'
  | 'successCardStart'
  | 'successCardEnd'
  | 'failureStart'
  | 'failureEnd'
  | 'pendingStart'
  | 'pendingEnd'
>;

type UseStatusAnimationPollerParams = {
  status?: LottieStatusAnimationType;
  playMarkers?: LottiePlayer<TradeStatusLottie>['playMarkers'];
  onFinish?: VoidFunction;
};

export const useStatusAnimationPoller = ({
  status = 'loading',
  playMarkers,
  onFinish,
}: UseStatusAnimationPollerParams) => {
  const isRunning = useRef(false);
  const isComplete = useRef(false);

  useEffect(() => {
    // Play loading animation on mount if we aren't already running
    if (!isRunning.current && !!playMarkers) {
      playMarkers('loadingStart', 'loadingEnd');
      isRunning.current = true;
    }
  }, [playMarkers]);

  // onAnimationFinish will get triggered after our first useEffect
  // play completes and then after each play within onAnimationFinish completes.
  return useCallback(() => {
    if (status === 'loading') {
      playMarkers?.('loadingStart', 'loadingEnd');
    } else if (!isComplete.current) {
      switch (status) {
        case 'success': {
          playMarkers?.('successStart', 'successEnd');
          break;
        }
        case 'cardSuccess': {
          playMarkers?.('successCardStart', 'successCardEnd');
          break;
        }
        case 'failure': {
          playMarkers?.('failureStart', 'failureEnd');
          break;
        }
        case 'pending':
        default: {
          playMarkers?.('pendingStart', 'pendingEnd');
          break;
        }
      }
      isComplete.current = true;
      onFinish?.();
    }
  }, [onFinish, playMarkers, status]);
};
