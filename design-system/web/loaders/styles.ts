import { css } from 'linaria';

export const spinner = {
  base: css`
    position: relative;
    border-top: 1.1em solid;
    border-right: 1.1em solid;
    border-bottom: 1.1em solid;
    border-left: 1.1em solid;
    transform: translateZ(0);
    animation: load 1.1s infinite linear;
    border-radius: 50%;
    width: 10em;
    height: 10em;

    &::after {
      border-radius: 50%;
      width: 10em;
      height: 10em;
    }

    @keyframes load {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `,
};

export const materialSpinner = {
  spinner: css`
    animation: rotation 1.35s linear infinite;

    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  `,
  circle: css`
    stroke-dasharray: 180;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: turn 1.35s ease-in-out infinite;

    @keyframes turn {
      0% {
        stroke-dashoffset: 180;
      }

      50% {
        stroke-dashoffset: 45;
        transform: rotate(135deg);
      }

      100% {
        stroke-dashoffset: 180;
        transform: rotate(360deg);
      }
    }
  `,
};
