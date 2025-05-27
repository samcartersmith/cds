import { css } from '@linaria/core';

export const defaultFontStyles = css`
  :global() {
    :root {
      --defaultFont-sans: 'Inter', sans-serif;
      --defaultFont-mono: Menlo, Consolas, monospace;
    }
  }
`;
