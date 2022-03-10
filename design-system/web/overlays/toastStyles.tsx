import { css } from 'linaria';
import { animateInOpacityConfig, animateInBottomConfig } from '@cbhq/cds-common/animation/toast';
import { cx } from '../utils/linaria';
import { spacing } from '../tokens';

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
