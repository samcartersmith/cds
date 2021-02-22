import { css } from 'linaria';
// CSS Reset
import 'destyle.css';
import '@cbhq/cds-fonts/fonts.css';

import { fallbackStack } from './shared';

export const globalStyle = css`
  :global() {
    body {
      font-family: ${fallbackStack};
    }
  }
`;
