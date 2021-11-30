import { RefObject } from 'react';
import { MotionBaseSpec } from '@cbhq/cds-common';
import { convertMotionConfig } from './convertMotionConfig';

type MotionSpec = {
  toValue: MotionBaseSpec['toValue'] | string; // allow string values like scale(0.5)
  fromValue?: MotionBaseSpec['fromValue'] | string;
} & Omit<MotionBaseSpec, 'toValue' | 'fromValue'>;

type AnimationCompleteCallback = ({ finished }: { finished: boolean }) => void;

type TimingReturnValues = {
  start: (cb?: AnimationCompleteCallback) => Promise<{ finished: boolean }>;
};

export class Animated {
  static timing(ref: RefObject<HTMLElement>, specs: MotionSpec): TimingReturnValues | null {
    const { property, ...restSpecs } = specs;
    const { toValue, fromValue, ...animationOptions } = convertMotionConfig(restSpecs);

    return {
      start: async (cb?) => {
        // don't animate anything in percy, it just leads to flakey snapshots
        const skipAnimation = Boolean(process.env.PERCY_TOKEN);
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

  static parallel(timings: (TimingReturnValues | null)[]) {
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
}
