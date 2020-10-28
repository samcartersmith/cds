import { css } from 'linaria';

// CSS Reset
import 'destyle.css';

export const globalStyle = css`
  :global() {
    @font-face {
      font-display: swap;
      font-family: 'Graphik';
      font-style: normal;
      font-weight: 400;
      src: url('../static/fonts/Graphik-Regular.woff2') format('woff2');
    }

    @font-face {
      font-display: swap;
      font-family: 'Graphik';
      font-style: normal;
      font-weight: 500;
      src: url('../static/fonts/Graphik-Medium.woff2') format('woff2');
    }

    @font-face {
      font-display: swap;
      font-family: 'Graphik';
      font-style: normal;
      font-weight: 600;
      src: url('../static/fonts/Graphik-Semibold.woff2') format('woff2');
    }

    @font-face {
      font-display: swap;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      src: url('../static/fonts/Inter-Regular.woff2') format('woff2');
    }

    @font-face {
      font-display: swap;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      src: url('../static/fonts/Inter-Medium.woff2') format('woff2');
    }

    @font-face {
      font-display: swap;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      src: url('../static/fonts/Inter-Semibold.woff2') format('woff2');
    }
  }
`;
