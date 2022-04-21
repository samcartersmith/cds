import { css } from 'linaria';

import { spacing } from '../../tokens';

// TODO: use CDS breakpoints
export const breakpoints = {
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

export const primaryContentContainerClassName = 'fsm-primary-content-container';
export const secondaryContentContainerClassName = 'fsm-secondary-content-container';

export const containerClassName = css`
  width: 100%;
  height: 100%;
`;

export const contentClassName = css`
  display: flex;
  flex-direction: column;
  padding: ${gutter};
  overflow: auto;

  .${primaryContentContainerClassName} {
    margin-bottom: ${gutter};
  }

  .${secondaryContentContainerClassName} {
    width: 100%;
  }

  @media only screen and (min-width: ${breakpoints.mobile}px) {
    margin-left: ${spacingStartSmall}px;

    .${primaryContentContainerClassName} {
      max-width: ${contentMaxWidth}px;
      width: 100%;
    }

    .${secondaryContentContainerClassName} {
      max-width: ${contentMaxWidth}px;
    }
  }

  @media only screen and (min-width: ${breakpoints.tablet}px) {
    flex-direction: row;

    .${primaryContentContainerClassName} {
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

export const headerLogoClassName = 'fsm-header-logo';
export const headerLogoInnerClassName = 'fsm-header-logo-inner';

export const headerClassName = css`
  .${headerLogoClassName} {
    display: none;
  }

  .${headerLogoInnerClassName} {
    display: flex;
  }

  @media only screen and (min-width: ${breakpoints.mobile}px) {
    .${headerLogoClassName} {
      display: flex;
      width: ${spacingStartSmall}px;
    }

    .${headerLogoInnerClassName} {
      display: none;
    }
  }

  @media only screen and (min-width: ${breakpoints.tablet}px) {
    .${headerLogoClassName} {
      display: flex;
      width: ${spacingStartSmall}px;
    }
  }

  @media only screen and (min-width: ${breakpoints.desktopS}px) {
    .${headerLogoClassName} {
      width: ${spacingStartLarge}px;
    }
  }
`;
