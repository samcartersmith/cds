import React, { memo, useCallback, useRef, useState } from 'react';
import { useStatusAnimationPoller } from '@cbhq/cds-common2/lottie/useStatusAnimationPoller';
import type { LottiePlayer } from '@cbhq/cds-common2/types/LottiePlayer';
import type { LottieStatusAnimationProps } from '@cbhq/cds-common2/types/LottieStatusAnimationProps';
import { tradeStatus, TradeStatusLottie } from '@cbhq/cds-lottie-files2/tradeStatus';

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
        ref={handleRef}
        onAnimationFinish={handlePolling}
        source={tradeStatus}
        testID={testID}
        {...otherProps}
      />
    );
  },
);
