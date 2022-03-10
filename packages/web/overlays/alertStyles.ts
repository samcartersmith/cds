import { css } from 'linaria';

import { spacing } from '../tokens';
import { cx } from '../utils/linaria';

import { devices, modalStaticClassName, modalTopSpacing } from './Modal/modalStyles';

export const alertStaticClassName = 'cds-alert';

export const alertOverModal = css`
  &.${alertStaticClassName} {
    .${modalStaticClassName} {
      top: calc(${modalTopSpacing} + ${spacing[3]});

      @media only screen and (${devices.phone}) {
        position: static;
      }
    }
  }
`;

export const alertOverModalClassName = cx(alertStaticClassName, alertOverModal);
