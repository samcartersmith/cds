import { css } from 'linaria';
import {
  animateInOpacityConfig,
  animateOutOpacityConfig,
  animateInMaxHeightConfig,
  animateOutMaxHeightConfig,
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

export const panelStyles = {
  expanded: css`
    ${Animated.toTransition([animateInOpacityConfig, animateInMaxHeightConfig])}
  `,
  collapsed: css`
    ${Animated.toTransition([animateOutOpacityConfig, animateOutMaxHeightConfig])}
  `,
};
