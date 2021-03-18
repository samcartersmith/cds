import React, { useEffect } from 'react';

import { NoopFn } from '@cbhq/cds-common';
import { noop } from '@cbhq/cds-utils';
import { Animated } from 'react-native';

import { Box } from '../layout/Box';
import { LottieProps } from './LottieProps';

export const LottieMock = ({
  autoplay: _1 = false,
  colorFilters: _2,
  loop: _3 = false,
  progress: _4,
  resizeMode: _5 = 'contain',
  source,
  onAnimationFinish,
  ...boxProps
}: LottieProps) => {
  const aspectRatio = source.w / source.h;

  useEffect(() => {
    onAnimationFinish?.();
  }, [onAnimationFinish]);

  return <Box aspectRatio={aspectRatio} {...boxProps} />;
};

export const createLottieMock = {
  play: noop,
  playMarkers: noop,
  pause: noop,
  resume: noop,
  reset: noop,
  progress: {
    value: new Animated.Value(0),
    timing: () => ({ start: (cb?: NoopFn) => cb?.() }),
    play: noop,
    pause: noop,
    reset: noop,
    addListener: noop,
    removeListener: noop,
  },
  lottieRef: { current: { play: noop } },
  Lottie: LottieMock,
};
