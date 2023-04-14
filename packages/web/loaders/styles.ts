import { css } from 'linaria';
import { durations } from '@cbhq/cds-common/motion/tokens';

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

export const spinnerAnimation = css`
  animation: spin ${durations.slow4}ms linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
