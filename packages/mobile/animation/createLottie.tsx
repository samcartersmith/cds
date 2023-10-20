import React, { createRef, MutableRefObject } from 'react';
import { Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import {
  getLottieDuration,
  getLottieMarkers,
  LottiePlayer,
  LottieSource,
  NoopFn,
} from '@cbhq/cds-common';

import { Lottie } from './Lottie';
import { lottieProgressConfig } from './lottieProgresConfig';
import { LottieProps } from './LottieProps';

type ProgressListenerCallback = (frame: number) => void;
type ProgressTimingConfig = { startFrame?: number; endFrame?: number };
export type LottieProgress = {
  value: Animated.Value;
  timing: (config?: ProgressTimingConfig) => { start: (cb?: NoopFn) => void };
  play: (cb?: NoopFn) => void;
  pause: NoopFn;
  reset: NoopFn;
  addListener: (callback: ProgressListenerCallback) => void;
  removeListener: NoopFn;
};

export type LottiePlayerMobile<Source extends LottieSource = LottieSource> = {
  lottieRef: React.Ref<LottieView>;
  progress: LottieProgress;
  Lottie: {
    (props: Omit<LottieProps, 'source'>): JSX.Element;
    displayName: 'Lottie';
  };
} & LottiePlayer<Source>;

const noop = () => {};

export const createLottie = <Source extends LottieSource>(
  source: Source,
  progressOverride?: Animated.Value,
): LottiePlayerMobile<Source> => {
  const lottieRef = createRef<LottieView>();
  const progress = progressOverride ?? new Animated.Value(0);
  const progressAnim =
    createRef<Animated.CompositeAnimation>() as MutableRefObject<Animated.CompositeAnimation>;
  const duration = getLottieDuration(source);
  const markers = getLottieMarkers(source);

  progressAnim.current = Animated.timing(progress, {
    ...lottieProgressConfig,
    duration,
  });

  const play = (startFrame?: number, endFrame?: number) => {
    lottieRef.current?.play(startFrame, endFrame);
  };
  const playMarkers = (startFrame: keyof typeof markers, endFrame: keyof typeof markers) => {
    play(markers[startFrame] ?? 0, markers[endFrame] ?? 0);
  };

  const setProgressTiming = (
    { startFrame = 0, endFrame = 1 }: ProgressTimingConfig = { startFrame: 0, endFrame: 1 },
  ) => {
    const diff = endFrame - startFrame;
    const newDuration = duration * diff;
    progressAnim.current = Animated.timing(progress, {
      ...lottieProgressConfig,
      toValue: endFrame,
      duration: newDuration,
    });
    return {
      start: (callbackFn?: NoopFn) => {
        progressAnim.current.start(({ finished }) => {
          if (finished) {
            callbackFn?.();
          }
        });
      },
    };
  };

  const playProgress = (callbackFn?: NoopFn) => {
    progressAnim.current.start(({ finished }) => {
      if (finished) {
        callbackFn?.();
      }
    });
  };
  const pauseProgress = () => progressAnim.current.stop();
  const resetProgress = () => {
    progressAnim.current.stop();
    progress.setValue(0);
  };
  const addProgressListener = (callback: ProgressListenerCallback) => {
    progress.addListener(({ value }) => callback(value));
  };
  const removeProgressListener = () => {
    progress.removeAllListeners();
  };

  const LottieComponent = (props: Omit<LottieProps, 'source'>) => (
    <Lottie ref={lottieRef} progress={progress} source={source} {...props} />
  );

  LottieComponent.displayName = 'Lottie' as const;

  return {
    play,
    playMarkers,
    pause: lottieRef.current?.pause ?? noop,
    resume: lottieRef.current?.resume ?? noop,
    reset: lottieRef.current?.reset ?? noop,
    progress: {
      value: progress,
      timing: setProgressTiming,
      play: playProgress,
      pause: pauseProgress,
      reset: resetProgress,
      addListener: addProgressListener,
      removeListener: removeProgressListener,
    },
    lottieRef,
    Lottie: LottieComponent,
  };
};
