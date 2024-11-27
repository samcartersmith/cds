import { css } from '@linaria/core';

import { deviceBreakpoints } from '../../layout/breakpoints';
import { palette, spacing } from '../../tokens';

// tokens
const gutter = spacing[4];
const contentMaxWidth = 800;
const secondaryContentWidth = 400;
const spacingStartSmall = 80;
const spacingStartLarge = 240;

export const primaryContentContainerClassName = 'fsm-primary-content-container';
export const secondaryContentContainerClassName = 'fsm-secondary-content-container';
export const secondaryContentDividerClassName = 'fsm-secondary-content-divider';

export const containerClassName = css`
  width: 100%;
  height: 100%;
`;

export const contentScrollContainer = css`
  overflow: auto;
  height: 100%;
`;

export const contentClassName = css`
  display: flex;
  flex-direction: column;
  padding: ${gutter};
  min-height: 100%;

  .${primaryContentContainerClassName} {
    margin-bottom: ${gutter};
  }

  .${secondaryContentContainerClassName} {
    width: 100%;
  }

  .${secondaryContentDividerClassName} {
    padding: ${gutter} 0 0 0;
    border-top: 1px solid ${palette.line};
  }

  @media only screen and (min-width: ${deviceBreakpoints.phoneLandscape}px) {
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
    padding: 0 ${gutter};
    flex-direction: row;

    .${primaryContentContainerClassName} {
      padding: ${gutter} 0;
      margin-right: ${gutter};
      margin-bottom: 0;
    }

    .${secondaryContentContainerClassName} {
      width: ${secondaryContentWidth}px;
      padding: ${gutter} 0 0 0;

      &.${secondaryContentDividerClassName} {
        width: calc(${secondaryContentWidth}px + ${gutter});
        padding: ${gutter} 0 0 ${gutter};
        border-top: 0;
        border-left: 1px solid ${palette.line};
      }
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

  @media only screen and (min-width: ${deviceBreakpoints.phoneLandscape}px) {
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
