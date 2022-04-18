import { css } from 'linaria';

import { spacing } from '../../tokens';

// TODO: use CDS breakpoints
const breakpoints = {
  mobile: 612,
  tablet: 1040,
  desktopS: 1280,
};

// tokens
const gutter = spacing[4];
const contentMaxWidth = 800;
const secondaryContentWidth = 400;
const spacingStartSmall = 80;
const spacingStartLarge = 240;

export const containerClassName = css`
  width: 100%;
  height: 100%;
`;

export const contentClassName = css`
  display: flex;
  flex-direction: column;
  padding: ${gutter};
  overflow: auto;

  .fsm-primary-content-container {
    margin-bottom: ${gutter};
  }

  .fsm-secondary-content-container {
    width: 100%;
  }

  @media only screen and (min-width: ${breakpoints.mobile}px) {
    margin-left: ${spacingStartSmall}px;

    .fsm-primary-content-container {
      max-width: ${contentMaxWidth}px;
      width: 100%;
    }

    .fsm-secondary-content-container {
      max-width: ${contentMaxWidth}px;
    }
  }

  @media only screen and (min-width: ${breakpoints.tablet}px) {
    flex-direction: row;

    .fsm-primary-content-container {
      margin-right: ${gutter};
      margin-bottom: 0;
    }

    .fsm-secondary-content-container {
      width: ${secondaryContentWidth}px;
    }
  }

  @media only screen and (min-width: ${breakpoints.desktopS}px) {
    margin-left: ${spacingStartLarge}px;
  }
`;

export const headerClassName = css`
  .fsm-header-logo {
    display: none;
  }

  .fsm-header-logo-inner {
    display: flex;
  }

  @media only screen and (min-width: ${breakpoints.mobile}px) {
    .fsm-header-logo {
      display: flex;
      width: ${spacingStartSmall}px;
    }

    .fsm-header-logo-inner {
      display: none;
    }
  }

  @media only screen and (min-width: ${breakpoints.tablet}px) {
    .fsm-header-logo {
      display: flex;
      width: ${spacingStartSmall}px;
    }
  }

  @media only screen and (min-width: ${breakpoints.desktopS}px) {
    .fsm-header-logo {
      width: ${spacingStartLarge}px;
    }
  }
`;
