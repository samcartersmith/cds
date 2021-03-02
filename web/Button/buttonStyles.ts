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
  border: none;
  background-color: transparent;

  // Removes weird bonus padding in Firefox
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
    margin: 0;
  }

  // Add the border to the interactable
  &::before,
  &::after {
    border: 1px solid transparent;
    border-radius: 8px;
  }
`;

export const buttonCompact = css`
  min-width: auto;

  &::before,
  &::after {
    border-radius: 4px;
  }
`;

export const buttonBlock = css`
  display: flex;
  width: 100%;
  max-width: 100%;
  white-space: normal;
`;

export const primary = css`
  color: ${palette.primaryForeground};

  &::before {
    background-color: ${palette.primary};
    border-color: ${palette.primary};
  }
`;

export const primaryCompact = css`
  color: ${palette.primary};

  &::before {
    background-color: ${palette.background};
    border-color: ${palette.lineHeavy};
  }
`;

export const secondary = css`
  color: ${palette.secondaryForeground};

  &::before {
    background-color: ${palette.background};
    border-color: ${palette.lineHeavy};
  }
`;

export const positive = css`
  color: ${palette.positiveForeground};

  &::before {
    background-color: ${palette.positive};
    border-color: ${palette.positive};
  }
`;

export const negative = css`
  color: ${palette.negative};

  &::before {
    background-color: ${palette.background};
    border-color: ${palette.lineHeavy};
  }
`;
