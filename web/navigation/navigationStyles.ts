import { css } from 'linaria';

import { devices } from '../layout/responsive';
import { sidebarWidth } from './navigationTokens';

export const rootStyles = css`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: grid;
  grid-template-columns: ${sidebarWidth.expanded}px auto;

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

export const hideForCondensedStyles = css`
  @media (${devices.tablet}) {
    visibility: hidden;
  }
`;

export const showForCondensed = css`
  visibility: hidden;
  @media (${devices.tablet}) {
    visibility: visible;
  }
`;
