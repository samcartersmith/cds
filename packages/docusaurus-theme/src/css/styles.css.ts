import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { borderRadius, palette, spacing } from '@cbhq/cds-web/tokens';
import { paletteValueToCssVar } from '@cbhq/cds-web/utils/palette';

import css from '../utils/css';

import { baseVariables, darkVariables, lightVariables } from './variables';

/**
 * Any CSS included here will be global. The classic template
 * bundles Infima by default. Infima is a CSS framework designed to
 * work well for content-centric websites.
 */
const red0 = paletteValueToCssVar('red0');
const red60 = paletteValueToCssVar('red60');

export default css`
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
    -webkit-tap-highlight-color: ${palette.transparent}; /* 3*/
  }

  :root {
    ${baseVariables};

    --cds-font-fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica',
      'Arial', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    --cds-font-display: CoinbaseDisplay, var(--cds-font-fallback);
    --cds-font-sans: CoinbaseSans, var(--cds-font-fallback);
    --cds-font-text: CoinbaseText, var(--cds-font-fallback);
    --cds-font-mono: CoinbaseMono, var(--cds-font-fallback);
    --cds-font-icon: CoinbaseIcons;

    --ifm-global-radius: ${borderRadius.rounded};
    --ifm-global-shadow-lw: 0 1px 0 0 ${palette.line};
    --ifm-global-spacing: ${spacing[1]};

    --ifm-font-color-base: ${palette.foreground};
    --ifm-font-color-base-inverse: ${palette.background};
    --ifm-font-color-secondary: ${palette.secondary};
    --ifm-font-family-base: var(--cds-font-sans);
    --ifm-font-family-monospace: var(--cds-font-mono);

    --ifm-color-primary: ${palette.primary};
    --ifm-color-info: ${palette.primary};
    --ifm-color-danger: ${palette.negative};
    --ifm-color-success: ${palette.positive};

    --ifm-navbar-background-color: ${palette.background};
    --ifm-navbar-padding-horizontal: ${spacing[3]};
    --ifm-navbar-shadow: none;

    --ifm-pre-padding: ${spacing[3]};
    --ifm-pre-border-radius: ${borderRadius.rounded};

    --ifm-avatar-photo-size-md: 80px;
    --ifm-toc-border-color: ${palette.line};
    --ifm-link-color: ${palette.primary};

    --ifm-tabs-color: ${palette.foreground};
    --ifm-tabs-color-active: ${palette.primary};
    --ifm-tabs-color-active-border: ${palette.primary};

    --ifm-code-font-size: 95%;
    --ifm-code-border-radius: ${borderRadius.roundedSmall};

    --ifm-badge-border-radius: ${borderRadius.roundedLarge};
    --ifm-heading-margin-bottom: ${spacing[2]};

    --ifm-alert-border-color: ${palette.transparent};
    --ifm-alert-border-width: 1px;
    --ifm-alert-border-left-width: 1px;
    --ifm-alert-border-radius: ${borderRadius.roundedLarge};
    --ifm-alert-padding-vertical: ${spacing[3]};
    --ifm-alert-padding-horizontal: ${spacing[3]};
    --ifm-alert-shadow: none;

    --ifm-list-left-padding: ${spacing[1]};

    /* Search bar */
    --search-input-height: 61px;
    --search-width: 478px;
    --search-border-radius: ${borderRadius.roundedLarge};
  }

  :root[data-theme='light'] {
    ${lightVariables};
    --elevation1: ${palette.background};
    --elevation2: ${palette.background};

    --ifm-background-color: ${palette.background};
    --ifm-color-secondary-contrast-background: ${palette.secondary};
    --ifm-color-primary-dark: rgb(0, 82, 255);
    --ifm-color-primary-darker: rgb(0, 62, 193);
    --ifm-color-primary-darkest: rgb(0, 24, 77);
    --ifm-color-primary-light: rgb(70, 132, 255);
    --ifm-color-primary-lighter: rgb(115, 162, 255);
    --ifm-color-primary-lightest: rgb(176, 202, 255);

    --ifm-scrollbar-track-background-color: ${palette.transparent};
    --ifm-scrollbar-thumb-background-color: ${palette.backgroundAlternate};
    --ifm-scrollbar-thumb-hover-background-color: ${palette.backgroundAlternate};
  }

  :root[data-theme='dark'] {
    ${darkVariables};
    --elevation1: rgba(20, 21, 25, 1);
    --elevation2: rgba(30, 32, 37, 1);

    --ifm-background-color: ${palette.background};
    --ifm-color-primary-dark: rgb(87, 139, 250);
    --ifm-color-primary-darker: rgb(132, 170, 253);
    --ifm-color-primary-darkest: rgb(185, 207, 255);
    --ifm-color-primary-light: rgb(10, 72, 206);
    --ifm-color-primary-lighter: rgb(5, 59, 177);
    --ifm-color-primary-lightest: rgb(1, 42, 130);
    --ifm-color-secondary-contrast-background: var(--elevation1);

    --ifm-scrollbar-track-background-color: ${palette.transparent};
    --ifm-scrollbar-thumb-background-color: ${palette.backgroundAlternate};
    --ifm-scrollbar-thumb-hover-background-color: ${palette.backgroundAlternate};
  }

  /* Navbar */
  .navbar {
    border-bottom: 1px solid ${palette.line};
  }

  /* Admonition */
  .admonition {
    display: flex;
    flex-wrap: wrap;
    border: none;
  }

  .admonition-heading {
    flex-shrink: 0;
    width: 100%;
  }

  .admonition h5:not(span) {
    text-transform: capitalize;
    font-size: 16px;
    font-weight: 500;
  }

  .admonition-icon {
    margin-right: ${spacing[3]};
  }

  .admonition-content {
    font-weight: 400;
    padding-left: calc(22px + ${spacing[3]});
    color: ${palette.foregroundMuted};
  }

  /* TODO - finish mapping all admonitions to cds colors */
  .alert--warning {
    --ifm-alert-background-color: ${red0};
    --ifm-alert-foreground-color: ${red60};
  }

  /* Sidebar https://docusaurus.io/docs/next/styling-layout#theme-class-names */
  .theme-doc-sidebar-container > div {
    border-right: 1px solid ${palette.line};
  }

  .theme-doc-sidebar-container > div > nav {
    padding: 0;
  }

  .theme-doc-sidebar-menu {
    margin-right: calc(var(--ifm-global-spacing) * -1);
  }

  /* To get search in navbar to appear to the left of dark mode toggle */
  .navbar__items--right {
    gap: ${spacing[3]};

    & .search {
      order: -1;
    }
  }

  /* 
      Home page overrides. 
      You can target specific page by looking at last className added to html element.
      This will match the doc's id in sidebars.js.
    */
  .docs-doc-id-home\\/home {
    --ifm-container-width-xl: 100%;
  }

  .docs-doc-id-home\\/home main {
    --ifm-spacing-horizontal: 0;
    --ifm-spacing-vertical: 0;
  }

  .docs-doc-id-home\\/home main .container {
    padding-bottom: 0 !important;
  }

  /* Anchor links */
  a:hover {
    text-decoration: initial;
  }

  .footer-link {
    position: relative;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: var(--foreground);
      height: 1px;
      width: 100%;
    }
  }

  .docgen-project-selector-wrapper {
    border: 1px solid var(--palette-foreground);

    & button {
      flex: 1;
    }
  }

  .props-table-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    color: unset;
    margin: unset;
    position: relative;
    scroll-margin-top: calc(var(--ifm-navbar-height) + 0.5rem);
    isolation: isolate;

    & .hash-link {
      display: flex;
      align-self: flex-end;
      flex-direction: row;
      width: 95%;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      align-items: center;
      justify-content: flex-end;
      z-index: 1;
      font-size: 1.25rem;
    }

    & .type-aliases-link {
      z-index: 2;
    }

    /* Temporary until CDS offers underline prop on Link component  */
    & .cds-link span {
      text-decoration: underline;
      text-decoration-color: var(--primary);
    }
  }

  .playground-live-wrapper {
    font: var(--ifm-code-font-size) / var(--ifm-pre-line-height) var(--cds-font-mono) !important;
    /* rtl:ignore */
    direction: ltr;
  }

  .landing-page {
    button {
      width: fit-content;
    }

    & .hero-title {
      font-family: var(--cds-font-display);
      font-weight: 700;
      font-size: 90px;
      line-height: 83px;
      max-width: 670px;
      color: var(--foreground);
      padding-left: var(--spacing-${gutter});
      padding-top: var(--spacing-6);
      padding-bottom: var(--spacing-6);
    }

    & .project-categories-title {
      font-family: var(--cds-font-display);
      font-weight: 700;
      font-size: 55px;
      line-height: 63px;
      max-width: 320px;
      color: var(--foreground);
    }

    /* Temporary until CDS offers underline prop on Link component  */
    & .cds-link span {
      position: relative;
      width: fit-content;

      &:after {
        content: '';
        position: absolute;
        top: 90%;
        left: 0;
        background-color: var(--foreground);
        height: 1px;
        width: 100%;
      }
    }
  }
`;
