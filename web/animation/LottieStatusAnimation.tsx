import React, { useCallback, useRef, useState, memo } from 'react';

import {
  useStatusAnimationPoller,
  LottieStatusAnimationProps,
  LottiePlayer,
} from '@cbhq/cds-common';
import { tradeStatus, TradeStatusLottie } from '@cbhq/cds-lottie-files/tradeStatus';

import { Lottie } from './Lottie';

type LottiePlayerRef = LottiePlayer<TradeStatusLottie>;

export const LottieStatusAnimation = memo(
  ({ status = 'loading', onFinish, ...otherProps }: LottieStatusAnimationProps) => {
    const [_, forceUpdate] = useState(0);
    const lottie = useRef<LottiePlayerRef>();

    const handlePolling = useStatusAnimationPoller({
      status,
      playMarkers: lottie.current?.playMarkers,
      onFinish,
    });

    const handleRef = useCallback((el: LottiePlayerRef | null) => {
      if (el && !lottie.current) {
        lottie.current = el;
        forceUpdate(prev => prev + 1);
      }
    }, []);

    return (
      <Lottie
        ref={handleRef}
        source={tradeStatus}
        onAnimationFinish={handlePolling}
        {...otherProps}
      />
    );
  }
);
