import { RefObject, useEffect } from 'react';
import {
  animatePaddleOpacityConfig,
  animatePaddleScaleConfig,
  paddleHidden,
  paddleVisible,
} from '@cbhq/cds-common/animation/paddle';
import { usePreviousValues } from '@cbhq/cds-common/hooks/usePreviousValues';
import { durations } from '@cbhq/cds-common/tokens/motion';

import { Animated } from '../../animation/Animated';

type UseAnimatePaddleVisibility = {
  ref: RefObject<HTMLElement>;
  gradientRef: RefObject<HTMLElement>;
  show: boolean;
};

export const usePaddleVisibilityEffect = ({
  ref,
  gradientRef,
  show,
}: UseAnimatePaddleVisibility) => {
  const { getPreviousValue, addPreviousValue } = usePreviousValues<number>([0]);
  const toValue = show ? paddleVisible : paddleHidden;
  addPreviousValue(toValue);

  useEffect(() => {
    const fromValue = getPreviousValue();

    void Animated.parallel([
      Animated.timing(ref, { ...animatePaddleOpacityConfig, fromValue, toValue }),
      Animated.timing(ref, {
        ...animatePaddleScaleConfig,
        fromValue: `scale(${fromValue})`,
        toValue: `scale(${toValue})`,
        delay: show ? durations.fast1 : 0,
      }),
    ]).start();
  }, [getPreviousValue, gradientRef, ref, show, toValue]);
};
