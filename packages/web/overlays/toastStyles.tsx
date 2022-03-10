import { css } from 'linaria';
import { animateInBottomConfig, animateInOpacityConfig } from '@cbhq/cds-common/animation/toast';

import { spacing } from '../tokens';
import { cx } from '../utils/linaria';

export const toastStaticClassName = 'cds-toast';

// animated property
const toastAnimationStyles = {
  [animateInOpacityConfig.property]: animateInOpacityConfig.fromValue as number,
};

export const toastPosition = css`
  &.${toastStaticClassName} {
    ${toastAnimationStyles}
    position: fixed;
    bottom: ${spacing[4]};
    left: 0;
    width: 100%;
    justify-content: center;
    transform: translateY(${animateInBottomConfig.fromValue as number}px);
  }
`;

export const toastClassName = cx(toastStaticClassName, toastPosition);
