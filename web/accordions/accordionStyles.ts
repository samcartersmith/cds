import { css } from 'linaria';
import {
  animateInRotateConfig,
  animateOutRotateConfig,
  accordionVisibleRotate,
  accordionHiddenRotate,
} from '@cbhq/cds-common/animation/accordion';
import { Animated } from '../animation/Animated';

export const iconStyles = {
  expanded: css`
    ${Animated.toTransition([
      { ...animateInRotateConfig, toValue: `rotateZ(${accordionVisibleRotate}deg)` },
    ])}
  `,
  collapsed: css`
    ${Animated.toTransition([
      {
        ...animateOutRotateConfig,
        toValue: `rotateZ(${accordionHiddenRotate}deg)`,
      },
    ])}
  `,
};
