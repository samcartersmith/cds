import { css } from 'linaria';
import '@cbhq/cds-fonts/fonts.css';

// focus visible polyfill
import 'focus-visible';

// we need resets to compile before everything else
import './resetStyles';

export const global = css`
  :global() {
    *,
    ::before,
    ::after {
      box-sizing: border-box;
      border-style: solid;
      border-width: 0;
    }

    body {
      margin: 0;
      padding: 0;
    }

    html {
      -webkit-text-size-adjust: 100%; /* 2 */
      -webkit-tap-highlight-color: transparent; /* 3*/
    }
    ul,
    ol {
      margin: 0;
      padding: 0;
    }
  }
`;
