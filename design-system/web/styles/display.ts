import { css } from 'linaria';

export type Display = keyof typeof display;

export const display = {
  flex: css`
    display: flex;
  `,
  'inline-flex': css`
    display: inline-flex;
  `,
  contents: css`
    display: contents;
  `,
  none: css`
    display: none;
  `,
};
