import React, { memo, useCallback, useRef, useState } from 'react';
import {
  LottiePlayer,
  LottieStatusAnimationProps,
  useStatusAnimationPoller,
} from '@cbhq/cds-common';
import { tradeStatus, TradeStatusLottie } from '@cbhq/cds-lottie-files/tradeStatus';

import { Lottie } from './Lottie';

type LottiePlayerRef = LottiePlayer<TradeStatusLottie>;

export const LottieStatusAnimation = memo(
  ({ status = 'loading', onFinish, testID, ...otherProps }: LottieStatusAnimationProps) => {
    const [, forceUpdate] = useState(0);
    const lottie = useRef<LottiePlayerRef>();

    const handlePolling = useStatusAnimationPoller({
      status,
      playMarkers: lottie.current?.playMarkers,
      onFinish,
    });

    const handleRef = useCallback((el: LottiePlayerRef | null) => {
      if (el && !lottie.current) {
        lottie.current = el;
        forceUpdate((prev) => prev + 1);
      }
    }, []);

    return (
      <Lottie
        testID={testID}
        ref={handleRef}
        source={tradeStatus}
        onAnimationFinish={handlePolling}
        {...otherProps}
      />
    );
  },
);
