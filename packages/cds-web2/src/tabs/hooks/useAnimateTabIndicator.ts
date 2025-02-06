import { useMemo } from 'react';
import { TabIndicatorProps } from '@cbhq/cds-common2';
import { animateTabIndicatorBaseSpec } from '@cbhq/cds-common2/animation/tabs';
import { usePreviousValues } from '@cbhq/cds-common2/hooks/usePreviousValues';

import { useMotionProps } from '../../motion/useMotionProps';

type UseAnimateTabIndicator = Pick<TabIndicatorProps, 'width' | 'x'>;

export const useAnimateTabIndicator = ({ width, x }: UseAnimateTabIndicator) => {
  const { getPreviousValue: getPreviousWidth, addPreviousValue: addPreviousWidth } =
    usePreviousValues<number>([]);
  const { getPreviousValue: getPreviousX, addPreviousValue: addPreviousX } =
    usePreviousValues<number>([]);

  addPreviousWidth(width);
  addPreviousX(x);

  const { property, easing, duration } = animateTabIndicatorBaseSpec;

  const widthMotionProps = useMotionProps({
    animate: {
      [property]: [getPreviousWidth(), width],
    },
    transition: { easing, duration },
  });

  const xMotionProps = useMotionProps({
    animate: {
      [property]: [getPreviousX(), x],
    },
    transition: { easing, duration },
  });

  return useMemo(
    () => ({
      widthMotionProps,
      xMotionProps,
    }),
    [widthMotionProps, xMotionProps],
  );
};
