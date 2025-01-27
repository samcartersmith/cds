import React from 'react';
import { LottieStatusAnimationProps, useStatusAnimationPoller } from '@cbhq/cds-common2';
import { tradeStatus } from '@cbhq/cds-lottie-files2/tradeStatus';

import { useLottie } from './useLottie';

export const LottieStatusAnimation = ({
  status = 'loading',
  onFinish,
  testID,
  ...otherProps
}: LottieStatusAnimationProps) => {
  const { playMarkers, Lottie } = useLottie(tradeStatus);
  const handlePolling = useStatusAnimationPoller({ status, playMarkers, onFinish });

  return <Lottie {...otherProps} onAnimationFinish={handlePolling} testID={testID} />;
};
