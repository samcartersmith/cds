import { css } from 'linaria';
// CSS Reset
import 'destyle.css';
import '@cds/fonts/fonts.css';

import { fallbackStack } from './shared';

export const globalStyle = css`
  :global() {
    body {
      font-family: ${fallbackStack};
    }
  }
`;
