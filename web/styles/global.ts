import { css } from 'linaria';

// focus visible polyfill
import 'focus-visible';

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
  }
`;
