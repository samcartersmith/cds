/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { Animated } from 'react-native';
import { NoopFn } from '@cbhq/cds-common';
import { noop } from '@cbhq/cds-utils';

import { Box } from '../layout/Box';

import { LottieProps } from './LottieProps';

export const LottieMock = ({
  autoplay: _1 = false,
  colorFilters: _2,
  loop: _3 = false,
  progress: _4,
  resizeMode: _5 = 'contain',
  source: _6,
  onAnimationFinish,
  ...boxProps
}: LottieProps) => {
  useEffect(() => {
    onAnimationFinish?.();
  }, [onAnimationFinish]);

  return <Box {...boxProps} />;
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
