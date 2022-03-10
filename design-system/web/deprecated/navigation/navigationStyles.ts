import { css } from 'linaria';

import { devices } from '../../layout/responsive';
import { sidebarWidth } from './navigationTokens';

export const rootStyles = css`
  height: 100vh;
  overflow: hidden;
  li {
    list-style: none;
    display: block;
  }
`;

export const gridForSidebar = css`
  display: grid;
  grid-template-columns: ${sidebarWidth.expanded}px auto;
  @media (${devices.tablet}) {
    grid-template-columns: ${sidebarWidth.condensed}px auto;
  }

  @media (${devices.phone}) {
    grid-template-columns: 0 auto;
  }
`;

export const scrollContent = css`
  overflow: scroll;
  position: relative;
  scrollbar-width: none;
  /* stylelint-disable-next-line a11y/no-display-none */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const disableScroll = css`
  overflow-y: hidden;
`;

export const sidebarItemStyles = css`
  white-space: nowrap;
  /* To ensure focus style is not cut off when tabbing */
  margin-bottom: 3px;
`;

// ul padding reset and handle nested ul, will break if nested > 2 levels
export const sidebarListReset = css`
  padding-left: 0;
  ul {
    padding-left: 0;
  }
`;

const visuallyHidden = `
  visibility: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const unsetVisuallyHidden = `
  visibility: visible;
  clip: unset;
  clip-path: unset;
  height: unset;
  overflow: unset;
  position: unset;
  white-space: unset;
  width: unset;
`;

export const hideForCondensed = css`
  @media (${devices.tablet}) {
    ${visuallyHidden};
  }
`;

export const showForCondensed = css`
  ${visuallyHidden};
  @media (${devices.tablet}) {
    ${unsetVisuallyHidden};
  }
`;

export const hideForMobile = css`
  @media (${devices.phone}) {
    ${visuallyHidden};
  }
`;

export const showForMobile = css`
  ${visuallyHidden};
  @media (${devices.phone}) {
    ${unsetVisuallyHidden};
  }
`;
