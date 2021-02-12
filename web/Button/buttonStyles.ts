import { css } from 'linaria';

import { palette } from '../styles/palette';

export const button = css`
  display: inline-flex;
  text-align: center;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: 0;
  position: relative;
  transition: color 150ms ease-in-out, background-color 150ms ease-in-out,
    border-color 150ms ease-in-out, box-shadow 150ms ease-in-out, transform 100ms;
  min-width: 100px;
  border: 1px solid transparent;

  // Removes weird bonus padding in Firefox
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
    margin: 0;
  }
`;

export const buttonCompact = css`
  min-width: auto;
`;

export const buttonBlock = css`
  display: flex;
  width: 100%;
  max-width: 100%;
  white-space: normal;
`;

export const radius = css`
  border-radius: 8px;
`;

export const radiusCompact = css`
  border-radius: 4px;
`;

export const primary = css`
  background-color: ${palette.primary};
  border-color: ${palette.primary};
  color: ${palette.primaryForeground};
`;

export const primaryCompact = css`
  background-color: ${palette.background};
  border-color: ${palette.stroke};
  color: ${palette.primary};
`;

export const secondary = css`
  background-color: ${palette.secondary};
  border-color: ${palette.stroke};
  color: ${palette.secondaryForeground};
`;

export const positive = css`
  background-color: ${palette.positive};
  border-color: ${palette.positive};
  color: ${palette.positiveForeground};
`;

export const negative = css`
  background-color: ${palette.background};
  border-color: ${palette.stroke};
  color: ${palette.negative};
`;
