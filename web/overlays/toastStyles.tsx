import { css, cx } from 'linaria';
import { animateInOpacityConfig, animateInBottomConfig } from '@cbhq/cds-common/animation/toast';
import { spacing } from '../tokens';

export const toastStaticClassName = 'cds-toast';

// animated property
const toastAnimationStyles = {
  [animateInOpacityConfig.property]: animateInOpacityConfig.fromValue as number,
};

export const toastTranslateX = '-50%';

export const toastPosition = css`
  &.${toastStaticClassName} {
    ${toastAnimationStyles}
    position: fixed;
    bottom: ${spacing[4]};
    left: 50%;
    transform: translate(${toastTranslateX}, ${animateInBottomConfig.fromValue as number}px);
  }
`;

export const toastClassName = cx(toastStaticClassName, toastPosition);
