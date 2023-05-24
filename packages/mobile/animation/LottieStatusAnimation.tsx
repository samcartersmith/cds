import React from 'react';
import { LottieStatusAnimationProps, useStatusAnimationPoller } from '@cbhq/cds-common';
import { tradeStatus } from '@cbhq/cds-lottie-files/tradeStatus';

import { useLottie } from './useLottie';

export const LottieStatusAnimation = ({
  status = 'loading',
  onFinish,
  testID,
  ...otherProps
}: LottieStatusAnimationProps) => {
  const { playMarkers, Lottie } = useLottie(tradeStatus);
  const handlePolling = useStatusAnimationPoller({ status, playMarkers, onFinish });

  return <Lottie {...otherProps} testID={testID} onAnimationFinish={handlePolling} />;
};
