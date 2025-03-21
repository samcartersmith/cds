import { css } from '@linaria/core';

export const globalStyles = css`
  :global() {
    *,
    ::before,
    ::after {
      box-sizing: border-box;
      border-style: solid;
      border-width: 0;
    }

    * {
      margin: 0;
    }

    html {
      -webkit-text-size-adjust: 100%;
      -webkit-tap-highlight-color: transparent;
    }

    body {
      padding: 0;
    }

    button {
      padding: 0;
      cursor: pointer;
      background-color: transparent;
      color: inherit;
      font-family: inherit;
      font-size: inherit;
      font-weight: inherit;
      line-height: inherit;
      font-variant: inherit;
      font-style: inherit;
      font-stretch: inherit;
    }

    a {
      cursor: pointer;
    }
  }
`;
