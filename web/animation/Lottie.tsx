import { memo, useImperativeHandle, useCallback, forwardRef } from 'react';

import {
  getLottieMarkers,
  LottieSource,
  LottieMarkersAsMap,
  LottiePlayer,
  ForwardedRef,
} from '@cbhq/cds-common';
import { noop } from '@cbhq/cds-utils';

import { Box } from '../layout/Box';
import { lottieStyles } from './lottieStyles';
import { LottieProps } from './types';
import { useLottieHandlers } from './useLottieHandlers';
import { useLottieListeners } from './useLottieListeners';
import { useLottieLoader } from './useLottieLoader';

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
        ...otherProps
      }: LottieProps<Marker, Source>,
      forwardedRef: ForwardedRef<LottiePlayer<Source>>
    ) => {
      const { containerRef, animationRef } = useLottieLoader({
        source,
        autoplay,
        loop,
        resizeMode,
      });

      const play = useCallback(
        (startFrame?: number, endFrame?: number) => {
          animationRef.current?.playSegments(
            [
              startFrame ?? animationRef.current?.currentFrame,
              endFrame ?? animationRef.current?.totalFrames,
            ],
            true
          );
        },
        [animationRef]
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
            endFrame: keyof LottieMarkersAsMap<Source>
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
          reset: reset,
        }),
        [source, play, animationRef, reset]
      );

      const listeners = useLottieHandlers(
        onAnimationFinish
          ? { complete: onAnimationFinish, loopComplete: onAnimationFinish }
          : handlers
      );
      useLottieListeners(animationRef, listeners);

      return (
        <Box as="div" ref={containerRef} dangerouslySetClassName={lottieStyles} {...otherProps} />
      );
    }
  )
);

Lottie.displayName = 'Lottie';
