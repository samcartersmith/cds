import {
  animatePaddleConfig,
  paddleHiddenOpacity,
  paddleVisibleOpacity,
} from '@cbhq/cds-common/animation/paddle';
import { usePreviousValues } from '@cbhq/cds-common/hooks/usePreviousValues';
import { RefObject, useEffect } from 'react';
import { Animated } from '../../animation/Animated';

type UseAnimatePaddleVisibility = {
  ref: RefObject<HTMLElement>;
  show: boolean;
};

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const useAnimatePaddleVisibility = ({ ref, show }: UseAnimatePaddleVisibility) => {
  const { getPreviousValue, addPreviousValue } = usePreviousValues<number>([0]);
  const toValue = show ? paddleVisibleOpacity : paddleHiddenOpacity;
  addPreviousValue(toValue);

  useEffect(() => {
    const fromValue = getPreviousValue();
    Animated.timing(ref, { ...animatePaddleConfig, fromValue, toValue })?.start();
  }, [getPreviousValue, ref, toValue]);
};
