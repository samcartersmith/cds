import { css } from 'linaria';

export const fontFaces = css`
  :global() {
    @font-face {
      font-family: 'Graphik';
      font-style: normal;
      font-weight: 400;
      src: url('../../../static/fonts/Graphik-Regular.woff') format('woff'),
        url('../../../static/fonts/Graphik-Regular.woff2') format('woff2');
    }

    @font-face {
      font-family: 'Graphik';
      font-style: normal;
      font-weight: 500;
      src: url('../../../static/fonts/Graphik-Medium.woff') format('woff'),
        url('../../../static/fonts/Graphik-Medium.woff2') format('woff2');
    }

    @font-face {
      font-family: 'Graphik';
      font-style: normal;
      font-weight: 600;
      src: url('../../../static/fonts/Graphik-Semibold.woff') format('woff'),
        url('../../../static/fonts/Graphik-Semibold.woff2') format('woff2');
    }

    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      src: url('../../../static/fonts/Inter-Regular.woff') format('woff'),
        url('../../../static/fonts/Inter-Regular.woff2') format('woff2');
    }

    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      src: url('../../../static/fonts/Inter-Medium.woff') format('woff'),
        url('../../../static/fonts/Inter-Medium.woff2') format('woff2');
    }

    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      src: url('../../../static/fonts/Inter-SemiBold.woff') format('woff'),
        url('../../../static/fonts/Inter-SemiBold.woff2') format('woff2');
    }
  }
`;
