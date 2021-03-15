import { css } from 'linaria';

import { devices } from '../layout/responsive';
import { sidebarWidth } from './navigationTokens';

export const rootStyles = css`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: grid;
  grid-template-columns: ${sidebarWidth.expanded}px auto;
  li {
    list-style: none;
    display: block;
  }

  @media (${devices.tablet}) {
    grid-template-columns: ${sidebarWidth.condensed}px auto;
  }
`;

export const scrollContent = css`
  position: relative;
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const sidebarItemStyles = css`
  white-space: nowrap;
  /* To ensure focus style is not cut off when tabbing */
  margin-bottom: 3px;
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
