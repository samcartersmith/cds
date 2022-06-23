import { css } from 'linaria';

export const spinner = {
  base: css`
    position: relative;
    border: 1.1em solid;
    border-radius: 50%;
    width: 10em;
    height: 10em;
  `,
};

export const materialSpinner = {
  circle: css`
    stroke-dasharray: 180;
    transform-origin: center;
  `,
};
