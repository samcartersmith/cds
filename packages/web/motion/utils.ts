import { Target, TargetAndTransition } from 'framer-motion';
import { curves, durations } from '@cbhq/cds-common/motion/tokens';
import { isStorybook } from '@cbhq/cds-utils';

import type { MotionConfigs, MotionSpec, MotionTransition } from './types';

/**
 * Convert CDS easing and duration tokens to framer transition values
 * @link https://www.framer.com/docs/animation/##transitions
 */
export const convertTransition = (transition: MotionTransition) => {
  const { easing, duration, delay, ...rest } = transition;

  const convertedDuration = duration ? durations[duration] / 1000 : undefined;
  const convertedEasing = easing ? curves[easing] : undefined;

  const skipAnimation = isStorybook();

  return {
    ...rest,
    ease: convertedEasing,
    duration: skipAnimation ? 0 : convertedDuration,
    delay: skipAnimation ? 0 : delay && delay / 1000,
  };
};

/**
 * Convert CDS motion configs to framer transition styles
 * @param configs CDS Motion Configs
 * @returns framer transition styles
 */
export const convertMotionConfigs = (configs: MotionSpec[]): TargetAndTransition | Target =>
  configs.reduce(
    (acc, { toValue, property, easing, duration, delay }) => ({
      ...acc,
      [property]: toValue,
      transition: {
        ...acc.transition,
        [property]: convertTransition({ easing, duration, delay }),
      },
    }),
    { transition: {} },
  );

/**
 * Convert CDS motion configs to framer variant
 * @link https://www.framer.com/docs/component/###variants
 */
export const createVariant = (configs: MotionConfigs) => {
  if (Array.isArray(configs)) {
    return convertMotionConfigs(configs);
  }
  if (typeof configs === 'object' && configs.tokens) {
    const { tokens, transitionEnd } = configs;
    return { ...convertMotionConfigs(tokens), transitionEnd };
  }

  return {};
};
