import { css } from '@linaria/core';

import { cx } from '../utils/linaria';

export const toastStaticClassName = 'cds-toast';

export const toastPosition = css`
  &.${toastStaticClassName} {
    position: fixed;
    left: 0;
    width: 100%;
  }
`;

export const toastClassName = cx(toastStaticClassName, toastPosition);
