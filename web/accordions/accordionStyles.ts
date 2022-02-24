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
    ${Animated.toCssTransition([
      { ...animateInRotateConfig, toValue: `rotateZ(${accordionVisibleRotate}deg)` },
    ])}
  `,
  collapsed: css`
    ${Animated.toCssTransition([
      {
        ...animateOutRotateConfig,
        toValue: `rotateZ(${accordionHiddenRotate}deg)`,
      },
    ])}
  `,
};
