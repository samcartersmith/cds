import React, { useCallback, useEffect, useRef } from 'react';

import { LottiePlayer } from '@cbhq/cds-common';
import { nux, NuxLottie } from '@cbhq/cds-lottie-files';
import { Lottie } from '@cbhq/cds-web/animation/Lottie';

type LottieRef = LottiePlayer<NuxLottie>;

export const NuxBanner = () => {
  const lottie = useRef<LottieRef>(null);

  // Play animation all the way through on mount
  useEffect(() => {
    lottie.current?.play();
  }, []);

  // onAnimationFinish will get triggered after our first useEffect
  // play completes and then after each play within onAnimationFinish completes.
  // Essentially creating a loop after fully playing through the entire animation once.
  const onAnimationFinish = useCallback(
    () => lottie.current?.playMarkers('loopStart', 'loopEnd'),
    []
  );

  return <Lottie ref={lottie} source={nux} height={500} onAnimationFinish={onAnimationFinish} />;
};
