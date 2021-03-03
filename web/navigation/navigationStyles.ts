import { css } from 'linaria';

import { palette } from '../styles/palette';

export const app = css`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 237px 3fr;
  overflow: hidden;
`;

// TODO: add responsive styles
export const sidebar = css``;

export const content = css`
  overflow-y: scroll;
`;

export const sidebarItemStyles = css`
  border: none;
  background-color: transparent;

  &::before,
  &::after {
    border: 1px solid ${palette.background};
    border-radius: 8px;
  }

  &::before {
    background-color: ${palette.background};
  }
`;
