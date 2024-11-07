import { useMemo } from 'react';
import {
  AnimationControls,
  MotionProps as FramerMotionProps,
  Target,
  TargetAndTransition,
} from 'framer-motion';

import type { MotionConfigs, MotionState, MotionTransition, MotionVariant } from './types';
import { convertTransition, createVariant } from './utils';

export type UseMotionProps = {
  /**
   * Array of CDS Motion configs for enter animation
   */
  enterConfigs?: MotionConfigs;
  /**
   * Array of CDS Motion configs for exit animation
   */
  exitConfigs?: MotionConfigs;
  /**
   * FM initial prop
   * @default exit
   * @link https://www.framer.com/docs/component/###initial
   */
  initial?: MotionState | Target | boolean;
  /**
   * FM animate prop
   * @default enter
   * @link https://www.framer.com/docs/component/###animate
   */
  animate?: MotionState | TargetAndTransition | AnimationControls | boolean;
  /**
   * FM exit prop
   * @link https://www.framer.com/docs/component/###exit
   */
  exit?: MotionState | TargetAndTransition;
  /**
   * FM transition prop with CDS time-based tokens
   * @link https://www.framer.com/docs/component/###transition
   */
  transition?: MotionTransition;
} & Omit<FramerMotionProps, 'exit' | 'initial' | 'animate' | 'transition'>;

const getVariants = (enterConfigs?: MotionConfigs, exitConfigs?: MotionConfigs) => {
  if (!enterConfigs && !exitConfigs) return undefined;

  const variant: MotionVariant = {};

  if (enterConfigs) {
    variant.enter = createVariant(enterConfigs);
  }

  if (exitConfigs) {
    variant.exit = createVariant(exitConfigs);
  }

  return variant;
};

export const getMotionProps = ({
  enterConfigs,
  exitConfigs,
  initial = 'exit',
  animate = 'enter',
  transition,
  ...rest
}: UseMotionProps) => {
  return {
    variants: getVariants(enterConfigs, exitConfigs),
    initial,
    animate,
    transition: transition && convertTransition(transition),
    ...rest,
  };
};

/**
 * Convert CDS motion configs to framer motion props.
 * @warning Use the function version(getMotionProps) if possible to avoid unnecessary rerenders.
 * @link https://www.framer.com/docs/component/##animation
 */
export const useMotionProps = (props: UseMotionProps) => {
  return useMemo(() => getMotionProps(props), [props]);
};
