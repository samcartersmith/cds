import { css } from 'linaria';

import { deviceBreakpoints } from '../../layout/responsive';
import { spacing } from '../../tokens';

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

  @media only screen and (min-width: ${deviceBreakpoints.phoneLarge}px) {
    margin-left: ${spacingStartSmall}px;

    .${primaryContentContainerClassName} {
      max-width: ${contentMaxWidth}px;
      width: 100%;
    }

    .${secondaryContentContainerClassName} {
      max-width: ${contentMaxWidth}px;
    }
  }

  @media only screen and (min-width: ${deviceBreakpoints.tablet}px) {
    flex-direction: row;

    .${primaryContentContainerClassName} {
      margin-right: ${gutter};
      margin-bottom: 0;
    }

    .fsm-secondary-content-container {
      width: ${secondaryContentWidth}px;
    }
  }

  @media only screen and (min-width: ${deviceBreakpoints.desktop}px) {
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

  @media only screen and (min-width: ${deviceBreakpoints.phoneLarge}px) {
    .${headerLogoClassName} {
      display: flex;
      width: ${spacingStartSmall}px;
    }

    .${headerLogoInnerClassName} {
      display: none;
    }
  }

  @media only screen and (min-width: ${deviceBreakpoints.tablet}px) {
    .${headerLogoClassName} {
      display: flex;
      width: ${spacingStartSmall}px;
    }
  }

  @media only screen and (min-width: ${deviceBreakpoints.desktop}px) {
    .${headerLogoClassName} {
      width: ${spacingStartLarge}px;
    }
  }
`;
