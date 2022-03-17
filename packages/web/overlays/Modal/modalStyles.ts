import { css } from 'linaria';

import { spacing } from '../../tokens';
import { cx } from '../../utils/linaria';

// Temp breakpoints
// TODO: use breakpoints from tokens once they are set in stone
const breakpoints = {
  tablet: 660,
  phone: 414,
};

export const devices = {
  phone: `max-width: ${breakpoints.phone}px`,
  tablet: `max-width: ${breakpoints.tablet}px`,
};

export const modalTopSpacing = spacing[10];

export const modalStaticClassName = 'cds-modal';
export const modalOverlayStaticClassName = 'cds-modal-overlay';
export const modalFooterStaticClassName = 'cds-modal-footer';

/** Modal styles */
export const modalDefault = css`
  &.${modalStaticClassName} {
    position: absolute;
    top: ${modalTopSpacing};
    width: 612px;
    max-height: calc(100vh - ${modalTopSpacing}*2);
    display: flex;
    justify-content: center;
  }
`;

export const modalResponsive = css`
  &.${modalStaticClassName} {
    @media only screen and (${devices.tablet}) {
      max-width: 612px;
      width: auto;
      right: ${spacing[3]};
      left: ${spacing[3]};
    }

    @media only screen and (${devices.phone}) {
      max-height: 100vh;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      border-radius: 0;
    }
  }
`;

export const modalDefaultClassName = cx(modalStaticClassName, modalDefault);
export const modalResponsiveClassName = cx(modalStaticClassName, modalResponsive);

/** Overlay styles */
export const modalOverlayResponsive = css`
  &.${modalOverlayStaticClassName} {
    @media only screen and (${devices.phone}) {
      display: none;
    }
  }
`;

export const modalOverlayResponsiveClassName = cx(
  modalOverlayStaticClassName,
  modalOverlayResponsive,
);

/** Footer actions layout */
const stacked = {
  '& > button, a': {
    flex: 'none',
  },
  'flex-direction': 'column-reverse',
  /* Set height for vertical Spacer */
  'span:nth-child(2)': {
    height: spacing[2],
  },
};

const block = {
  '& > button, a': {
    flex: 1,
  },
};

export const modalFooterDefault = css`
  &.${modalFooterStaticClassName} {
    @media only screen and (${devices.tablet}) {
      ${block}
    }

    @media only screen and (${devices.phone}) {
      ${stacked}
    }
  }
`;

export const modalFooterClassName = cx(modalFooterStaticClassName, modalFooterDefault);
