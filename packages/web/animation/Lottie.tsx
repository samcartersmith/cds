import React, { forwardRef, memo, useCallback, useImperativeHandle } from 'react';
import {
  ForwardedRef,
  getLottieMarkers,
  LottieMarkersAsMap,
  LottiePlayer,
  LottieSource,
} from '@cbhq/cds-common';
import { noop } from '@cbhq/cds-utils';

import { Box } from '../layout/Box';

import { lottieStyles } from './lottieStyles';
import { LottieProps } from './types';
import { useLottieHandlers } from './useLottieHandlers';
import { useLottieListeners } from './useLottieListeners';
import { useLottieLoader } from './useLottieLoader';

const defaultFilterSize = {
  width: '200%',
  height: '200%',
  x: '-50%',
  y: '-50%',
};

export const Lottie = memo(
  forwardRef(
    <Marker extends string, Source extends LottieSource<Marker>>(
      {
        source,
        loop = false,
        autoplay = false,
        onAnimationFinish,
        handlers,
        resizeMode = 'contain',
        filterSize = defaultFilterSize,
        ...otherProps
      }: LottieProps<Marker, Source>,
      // String wont work on literal unions, so use any here
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      forwardedRef: ForwardedRef<LottiePlayer<LottieSource<any>>>,
    ) => {
      const { containerRef, animationRef } = useLottieLoader({
        source,
        autoplay,
        loop,
        resizeMode,
        filterSize,
      });

      const play = useCallback(
        (startFrame?: number, endFrame?: number) => {
          animationRef.current?.playSegments(
            [
              startFrame ?? animationRef.current?.currentFrame,
              endFrame ?? animationRef.current?.totalFrames,
            ],
            true,
          );
        },
        [animationRef],
      );

      const reset = useCallback(() => {
        animationRef.current?.goToAndStop(0, true);
      }, [animationRef]);

      useImperativeHandle(
        forwardedRef,
        () => ({
          play,
          playMarkers: (
            startFrame: keyof LottieMarkersAsMap<Source>,
            endFrame: keyof LottieMarkersAsMap<Source>,
          ) => {
            const markers = getLottieMarkers(source);
            if (markers) {
              play(markers[startFrame] ?? 0, markers[endFrame] ?? 0);
            } else {
              play();
            }
          },
          pause: animationRef.current?.pause ?? noop,
          resume: play,
          reset,
        }),
        [source, play, animationRef, reset],
      );

      const listeners = useLottieHandlers(
        onAnimationFinish
          ? { complete: onAnimationFinish, loopComplete: onAnimationFinish }
          : handlers,
      );
      useLottieListeners(animationRef, listeners);

      return <Box ref={containerRef} as="div" className={lottieStyles} {...otherProps} />;
    },
  ),
);

Lottie.displayName = 'Lottie';
