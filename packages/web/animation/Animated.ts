import { RefObject } from 'react';
import { Target, TargetAndTransition } from 'framer-motion';
import { MotionBaseSpec } from '@cbhq/cds-common';
import { curves, durations } from '@cbhq/cds-common/motion/tokens';
import { isStorybook } from '@cbhq/cds-utils';

import { convertMotionConfig } from './convertMotionConfig';

type MotionSpec = {
  toValue: MotionBaseSpec['toValue'] | string; // allow string values like scale(0.5)
  fromValue?: MotionBaseSpec['fromValue'] | string;
} & Omit<MotionBaseSpec, 'toValue' | 'fromValue'>;

type Options = {
  /**
   * return css properties and values without transition
   * This is useful for the initial prop on framer-motion component
   */
  propertiesOnly?: boolean;
};

type AnimationCompleteCallback = ({ finished }: { finished: boolean }) => void;

export type TimingReturnValues = {
  start: (cb?: AnimationCompleteCallback) => Promise<{ finished: boolean }>;
};

type TransitionReturnValue = {
  transition: string;
};

/** @deprecated Use Framer motion and the useMotionProps hook */
export class Animated {
  static timing(ref: RefObject<HTMLElement>, specs: MotionSpec): TimingReturnValues | null {
    const { property, ...restSpecs } = specs;
    const { toValue, fromValue, ...animationOptions } = convertMotionConfig(restSpecs);

    return {
      start: async (cb?) => {
        // don't animate anything in percy, it just leads to flakey snapshots
        const skipAnimation = isStorybook();
        if (skipAnimation) {
          return { finished: true };
        }
        if (!ref?.current?.animate) return { finished: false };

        const animation = ref.current.animate(
          { [property]: [fromValue, toValue] as number[] | string[] },
          animationOptions,
        );
        await animation?.finished;
        const resp = { finished: true };
        if (cb) {
          cb(resp);
        }
        return resp;
      },
    };
  }

  static parallel(timings: (TimingReturnValues | null)[]): TimingReturnValues {
    return {
      start: async (cb?: AnimationCompleteCallback) => {
        const resp = await Promise.all(timings.map((item) => item?.start()));
        const allFinished = { finished: resp.every((item) => item?.finished) };
        if (cb) {
          cb(allFinished);
        }
        return allFinished;
      },
    };
  }

  /**
   * Convert motion configs to CSS transition property
   * @param configs CDS Motion configs
   * @returns CSS transition property in object
   */
  static toCssTransition(configs: MotionSpec[]): TransitionReturnValue {
    return configs.reduce(
      (acc, config, index) => {
        const isLast = index === configs.length - 1;

        return {
          ...acc,
          [config.property]: config.toValue,
          transition: `${acc.transition} ${config.property} ${
            config.duration && durations[config.duration]
          }ms cubic-bezier(${curves[config.easing].join(',')}) ${isLast ? '' : ','}`,
        };
      },
      { transition: '' },
    );
  }

  /**
   * Convert motion configs to framer-motion transition styles
   * @param configs CDS Motion Configs
   * @returns framer-motion transition styles
   */
  static toFramerTransition(
    configs: MotionSpec[],
    options?: Options,
  ): TargetAndTransition | Target {
    const initialValue = options?.propertiesOnly ? {} : { transition: {} };

    return configs.reduce((acc, config) => {
      const transitions = {
        ...acc,
        [config.property]: config.toValue,
      };

      if (!options?.propertiesOnly) {
        transitions.transition = {
          ...acc.transition,
          [config.property]: {
            ease: curves[config.easing],
            duration: config.duration && durations[config.duration] / 1000,
            delay: config.delay && config.delay / 1000,
          },
        };
      }

      return transitions;
    }, initialValue);
  }
}
