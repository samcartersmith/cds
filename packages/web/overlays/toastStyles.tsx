import { css } from 'linaria';

import { spacing } from '../tokens';
import { cx } from '../utils/linaria';

export const toastStaticClassName = 'cds-toast';

export const toastPosition = css`
  &.${toastStaticClassName} {
    position: fixed;
    bottom: ${spacing[4]};
    left: 0;
    width: 100%;
  }
`;

export const toastClassName = cx(toastStaticClassName, toastPosition);
