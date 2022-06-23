import React, { memo, useEffect } from 'react';

import { useRotateAnimation } from '../animation/useRotateAnimation';
import { Icon } from '../icons/Icon';
import { isRtl } from '../utils/isRtl';

export type CollapseArrowProps = {
  degrees?: number;
  collapsed?: boolean;
};

/** @deprecated Please use the AnimatedCaret component from @cbhq/cds-web/motion/AnimatedCaret */
export const CollapseArrow = memo(function CollapseArrow({
  degrees = 180,
  collapsed,
}: CollapseArrowProps) {
  const { rotateAnimationRef, animateClockwise, animateCounterClockwise } =
    useRotateAnimation(degrees);

  useEffect(() => {
    if (collapsed) {
      void animateCounterClockwise();
    } else {
      void animateClockwise();
    }
  }, [animateClockwise, animateCounterClockwise, collapsed]);

  return (
    <Icon
      ref={rotateAnimationRef}
      name={isRtl() ? 'caretLeft' : 'caretRight'}
      size="s"
      color="foregroundMuted"
    />
  );
});
