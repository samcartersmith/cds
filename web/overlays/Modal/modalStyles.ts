import { css } from 'linaria';
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

const devices = {
  phone: `max-width: ${breakpoints.phone}px`,
  tablet: `max-width: ${breakpoints.tablet}px`,
};

// these properties will be animated
const modalAnimationStyles = {
  opacity: modalHiddenOpacity,
  transform: `scale(${modalHiddenScale})`,
};

export const modalDefaultClassName = css`
  ${modalAnimationStyles}
  position: absolute;
  top: ${spacing[10]};
  width: 612px;
  max-height: calc(100vh - ${spacing[10]}*2);
  border-radius: ${borderRadius.standard}px;
`;

export const modalResponsiveClassName = css`
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
`;

const overlayAnimationStyles = {
  opacity: overlayHiddenOpacity,
};

export const overlayResponsiveClassName = css`
  ${overlayAnimationStyles}
  @media only screen and (${devices.phone}) {
    display: none;
  }
`;

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

export const modalFooterClassName = css`
  @media only screen and (${devices.phone}) {
    ${stacked}
  }

  @media only screen and (${devices.tablet}) {
    ${block}
  }
`;
