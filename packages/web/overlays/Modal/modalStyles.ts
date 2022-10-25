import { css } from 'linaria';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';

import { deviceMqs } from '../../layout/breakpoints';
import { borderRadius, spacing } from '../../tokens';
import { cx } from '../../utils/linaria';

export const devices = {
  phone: deviceMqs.phone,
  tablet: deviceMqs.tablet,
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
    /* this makes sure modal dialogue displays on top of overlay */
    z-index: ${zIndex.overlays.modal};
  }
`;

export const modalResponsive = css`
  &.${modalStaticClassName} {
    @media only screen and (${devices.tablet}) {
      max-width: 612px;
      width: auto;
      margin-right: ${spacing[3]};
      margin-left: ${spacing[3]};
    }

    @media only screen and (${devices.phone}) {
      max-height: 100vh;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin-right: 0;
      margin-left: 0;
    }
  }
`;

export const modalDialogClassName = css`
  && {
    border-radius: ${borderRadius.rounded};
  }
`;

export const modalDialogResponsiveClassName = css`
  && {
    @media only screen and (${devices.phone}) {
      border-radius: ${borderRadius.roundedNone};
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
