import { useMemo } from 'react';
import { TabIndicatorProps } from '@cbhq/cds-common2';
import { animateTabIndicatorBaseSpec } from '@cbhq/cds-common2/animation/tabs';
import { usePreviousValues } from '@cbhq/cds-common2/hooks/usePreviousValues';
import { useMotionProps } from '@cbhq/cds-web2/motion/useMotionProps';

type UseAnimateTabIndicator = Pick<TabIndicatorProps, 'width' | 'x'>;

// modified from the useAnimateTabInidcator hook from cds by merging both x and width animation together.
export const useAnimateTabIndicator = ({ width, x }: UseAnimateTabIndicator) => {
  const { getPreviousValue: getPreviousWidth, addPreviousValue: addPreviousWidth } =
    usePreviousValues<number>([]);
  const { getPreviousValue: getPreviousX, addPreviousValue: addPreviousX } =
    usePreviousValues<number>([]);

  addPreviousWidth(width);
  addPreviousX(x);

  const { easing, duration } = animateTabIndicatorBaseSpec;

  const motionProps = useMotionProps({
    animate: {
      x: [getPreviousX(), x],
      width: [getPreviousWidth(), width],
    },
    transition: { easing, duration },
  });

  return useMemo(
    () => ({
      motionProps,
    }),
    [motionProps],
  );
};
