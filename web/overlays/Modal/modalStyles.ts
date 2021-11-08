import { css, cx } from 'linaria';
import { borderRadius } from '@cbhq/cds-common/tokens/border';
import { modalHiddenOpacity, modalHiddenScale } from '@cbhq/cds-common/animation/modal';
import { overlayHiddenOpacity } from '@cbhq/cds-common/animation/overlay';

import { spacing } from '../../tokens';

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

// these properties will be animated
const modalAnimationStyles = {
  opacity: modalHiddenOpacity,
  transform: `scale(${modalHiddenScale})`,
};

export const modalStaticClassName = 'cds-modal';
export const modalOverlayStaticClassName = 'cds-modal-overlay';
export const modalFooterStaticClassName = 'cds-modal-footer';

/** Modal styles */
export const modalDefault = css`
  &.${modalStaticClassName} {
    ${modalAnimationStyles}
    position: absolute;
    top: ${modalTopSpacing};
    width: 612px;
    max-height: calc(100vh - ${modalTopSpacing}*2);
    border-radius: ${borderRadius.standard}px;
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
const overlayAnimationStyles = {
  opacity: overlayHiddenOpacity,
};

export const modalOverlayDefault = css`
  &.${modalOverlayStaticClassName} {
    ${overlayAnimationStyles}
  }
`;

export const modalOverlayResponsive = css`
  &.${modalOverlayStaticClassName} {
    @media only screen and (${devices.phone}) {
      display: none;
    }
  }
`;

export const modalOverlayDefaultClassName = cx(modalOverlayStaticClassName, modalOverlayDefault);
export const modalOverlayResponsiveClassName = cx(
  modalOverlayStaticClassName,
  modalOverlayResponsive,
);

/** Footer actions layout */
const stacked = {
  'flex-direction': 'column-reverse',
  /* Set height for vertical Spacer */
  'span:nth-child(2)': {
    height: spacing[2],
  },
};

const block = {
  button: {
    flex: 1,
  },
};

export const modalFooterDefault = css`
  &.${modalFooterStaticClassName} {
    @media only screen and (${devices.phone}) {
      ${stacked}
    }

    @media only screen and (${devices.tablet}) {
      ${block}
    }
  }
`;

export const modalFooterClassName = cx(modalFooterStaticClassName, modalFooterDefault);
