import { css } from 'linaria';
import {
  animateInOpacityConfig,
  animateOutOpacityConfig,
  animateInMaxHeightConfig,
  animateOutMaxHeightConfig,
} from '@cbhq/cds-common/animation/collapse';
import { Animated } from '../animation/Animated';

export const collapseStyles = {
  expanded: css`
    ${Animated.toTransition([animateInOpacityConfig, animateInMaxHeightConfig])}
  `,
  collapsed: css`
    ${Animated.toTransition([animateOutOpacityConfig, animateOutMaxHeightConfig])}
  `,
};
