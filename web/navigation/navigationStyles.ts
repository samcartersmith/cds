import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { css, cx } from 'linaria';

import { devices } from '../layout/responsive';
import * as spacingStyles from '../styles/padding';
import { palette } from '../tokens';
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

export const stickyPositionStyles = css`
  position: sticky;
  z-index: ${zIndex.navbar};
`;

export const navbarAndTitleSectionStyles = css`
  position: relative;
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const navbarStyles = cx(
  css`
    top: 0;
    width: 100%;
    background-color: ${palette.background};
    display: flex;
    align-items: flex-start;
    justify-content: 'space-between';
  `,
  stickyPositionStyles,
  spacingStyles.left[gutter],
  spacingStyles.right[gutter],
  spacingStyles.top[gutter],
  spacingStyles.bottom[gutter]
);

export const displayTitleStyles = cx(
  spacingStyles.top[4],
  spacingStyles.left[4],
  spacingStyles.right[4]
);

export const appContentStyles = cx(spacingStyles.left[4], spacingStyles.right[4]);

export const sidebarItemStyles = css`
  white-space: nowrap;
`;

export const hideForCondensedStyles = css`
  @media (${devices.tablet}) {
    visibility: hidden;
  }
`;
