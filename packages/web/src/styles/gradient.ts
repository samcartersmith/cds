import { css } from '@linaria/core';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';

import { palette } from '../tokens';
import { cx } from '../utils/linaria';

export const staticClassName = 'cds-gradient';
const baseGradient = css`
  &.${staticClassName} {
    display: block;
    position: absolute;
    pointer-events: none;
    z-index: ${zIndex.interactable};
    top: 0;
    width: 80px;
    height: 100%;
    &--left {
      background: linear-gradient(to right, currentColor 50%, ${palette.transparent} 100%);
      left: 0px;
      transform-origin: left;
    }
    &--right {
      background: linear-gradient(to left, currentColor 50%, ${palette.transparent} 100%);
      right: 0px;
      transform-origin: right;
    }
  }
`;

export const gradient = {
  left: cx(staticClassName, `${staticClassName}--left`, baseGradient),
  right: cx(staticClassName, `${staticClassName}--right`, baseGradient),
};
