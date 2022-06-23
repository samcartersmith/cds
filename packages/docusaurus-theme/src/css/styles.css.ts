import { borderRadius, palette, spacing } from '@cbhq/cds-web/tokens';
import { paletteValueToCssVar } from '@cbhq/cds-web/utils/palette';

import { TOKENS } from '../theme/tokens';
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

    --ifm-global-radius: ${borderRadius.rounded} !important;
    --ifm-global-shadow-lw: 0 1px 0 0 ${palette.line} !important;
    --ifm-global-spacing: ${spacing[1]} !important;

    --ifm-font-color-base: ${palette.foreground} !important;
    --ifm-font-color-base-inverse: ${palette.background} !important;
    --ifm-font-color-secondary: ${palette.secondary} !important;
    --ifm-font-family-base: var(--cds-font-sans) !important;
    --ifm-font-family-monospace: var(--cds-font-mono) !important;

    --ifm-color-primary: ${palette.primary} !important;
    --ifm-color-info: ${palette.primary} !important;
    --ifm-color-danger: ${palette.negative} !important;
    --ifm-color-success: ${palette.positive} !important;

    --ifm-navbar-background-color: ${palette.background} !important;
    --ifm-navbar-padding-horizontal: ${spacing[3]} !important;
    --ifm-navbar-shadow: none !important;

    --ifm-pre-padding: ${spacing[3]} !important;
    --ifm-pre-border-radius: ${borderRadius.rounded} !important;

    --ifm-avatar-photo-size-md: 80px !important;
    --ifm-toc-border-color: ${palette.line} !important;
    --ifm-link-color: ${palette.primary} !important;

    --ifm-tabs-color: ${palette.foreground} !important;
    --ifm-tabs-color-active: ${palette.primary} !important;
    --ifm-tabs-color-active-border: ${palette.primary} !important;

    --ifm-badge-border-radius: ${borderRadius.roundedLarge} !important;

    --ifm-alert-border-color: ${palette.transparent} !important;
    --ifm-alert-border-width: 1px !important;
    --ifm-alert-border-left-width: 1px !important;
    --ifm-alert-border-radius: ${borderRadius.roundedLarge} !important;
    --ifm-alert-padding-vertical: ${spacing[3]} !important;
    --ifm-alert-padding-horizontal: ${spacing[3]} !important;
    --ifm-alert-shadow: none !important;

    --ifm-list-left-padding: ${spacing[2]};
    --ifm-paragraph-margin-bottom: unset !important;
    --ifm-heading-margin-bottom: unset !important;

    /* Search bar */
    --search-input-height: 61px;
    --search-width: 478px;
    --search-border-radius: ${borderRadius.roundedLarge};
  }

  html[data-theme='light'] {
    ${lightVariables};
    --elevation1: ${palette.background};
    --elevation2: ${palette.background};

    --ifm-background-color: ${palette.background} !important;
    --ifm-color-secondary-contrast-background: ${palette.secondary} !important;
    --ifm-color-primary-dark: rgb(0, 82, 255) !important;
    --ifm-color-primary-darker: rgb(0, 62, 193) !important;
    --ifm-color-primary-darkest: rgb(0, 24, 77) !important;
    --ifm-color-primary-light: rgb(70, 132, 255) !important;
    --ifm-color-primary-lighter: rgb(115, 162, 255) !important;
    --ifm-color-primary-lightest: rgb(176, 202, 255) !important;

    --ifm-scrollbar-track-background-color: ${palette.transparent} !important;
    --ifm-scrollbar-thumb-background-color: ${palette.backgroundAlternate} !important;
    --ifm-scrollbar-thumb-hover-background-color: ${palette.backgroundAlternate} !important;
  }

  html[data-theme='dark'] {
    ${darkVariables};
    --elevation1: rgba(20, 21, 25, 1);
    --elevation2: rgba(30, 32, 37, 1);

    --ifm-background-color: ${palette.background} !important;
    --ifm-color-primary-dark: rgb(87, 139, 250) !important;
    --ifm-color-primary-darker: rgb(132, 170, 253) !important;
    --ifm-color-primary-darkest: rgb(185, 207, 255) !important;
    --ifm-color-primary-light: rgb(10, 72, 206) !important;
    --ifm-color-primary-lighter: rgb(5, 59, 177) !important;
    --ifm-color-primary-lightest: rgb(1, 42, 130) !important;
    --ifm-color-secondary-contrast-background: var(--elevation1) !important;

    --ifm-scrollbar-track-background-color: ${palette.transparent} !important;
    --ifm-scrollbar-thumb-background-color: ${palette.backgroundAlternate} !important;
    --ifm-scrollbar-thumb-hover-background-color: ${palette.backgroundAlternate} !important;
  }

  /* Release Calendar */
  .schedulely {
    --schedulely-font-color: ${palette.foreground};
    --schedulely-grid-gap: 0em;
    --schedulely-day-of-week-header-bg-color: ${palette.background};
    --schedulely-day-of-week-header-text-color: ${palette.primaryForeground};
    --schedulely-day-height: 7em;
    --schedulely-border: 1px solid ${palette.line};
    --schedulely-border-radius: 0;
    font-family: var(--cds-font-sans);

    & .default-day-sibling {
      --schedulely-sibling-month-bg-color: ${palette.backgroundAlternate};
      --schedulely-sibling-month-font-color: ${palette.foregroundMuted};
    }

    & .current-month-indicator {
      background-color: ${palette.primary};
    }

    & .default-day-header {
      display: flex;
      justify-content: flex-end;
    }

    & .default-day-header--indicator {
      --schedulely-today-indicator-color: ${palette.primary};
      color: ${palette.primaryForeground};
      display: flex;
      justify-content: center;
      align-items: center;
    }

    & .default-day-header--text {
      top: unset;
      font-weight: unset;
      font-size: var(--label1-font-size);
      line-height: var(--label1-line-height);
    }

    & .event {
      box-shadow: unset;
      font-weight: unset;
      border: 1px solid var(--line);
      font-size: var(--label1-font-size);
      line-height: var(--label1-line-height);
    }

    & .day-of-week-layout {
      border-top: 1px solid var(--line);
    }
  }

  .schedulely[data-theme='minimal'] {
    --schedulely-sibling-month-bg-color: ${palette.backgroundAlternate};
    --schedulely-day-of-week-header-bg-color: ${palette.background};
    --schedulely-day-of-week-header-text-color: ${palette.foreground};
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

  /* Text paragraphs with links should be underlined */
  p > a {
    --ifm-link-decoration: underline;
  }

  .alert {
    --ifm-code-background: ${palette.background} !important;

    /* Alerts with links should always match primary styles */
    & a {
      color: ${palette.primary};
      text-decoration-color: ${palette.primary} !important;
    }

    & code {
      background: none;
      border: none;
      font-weight: 500;
      color: ${palette.foreground};
    }
  }

  /* TODO - finish mapping all admonitions to cds colors */
  .alert--warning {
    --ifm-alert-background-color: ${red0} !important;
    --ifm-alert-foreground-color: ${red60} !important;
    --ifm-alert-border-color: ${red60} !important;
  }

  .theme-doc-sidebar-container a:hover {
    text-decoration: initial;
  }

  /* Sidebar https://docusaurus.io/docs/next/styling-layout#theme-class-names */
  .theme-doc-sidebar-container > div {
    border-right: 1px solid ${palette.line};
  }

  .theme-doc-sidebar-container > div > nav {
    padding: 0;
  }

  .theme-doc-sidebar-menu {
    margin-right: calc(var(--ifm-global-spacing) * -1) !important;
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
    --ifm-container-width-xl: 100% !important;
  }

  .docs-doc-id-home\\/home main {
    --ifm-spacing-horizontal: 0 !important;
    --ifm-spacing-vertical: 0 !important;
  }

  .docs-doc-id-home\\/home main .container {
    padding-bottom: 0 !important;
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
    scroll-margin-top: calc(var(--ifm-navbar-height) + 0.5rem) !important;
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

  /* Ensure all headings on docs have consistent margin bottoms */

  .markdown > header > h1:first-child {
    margin-bottom: ${spacing[TOKENS.docItem.spacingVertical]};
  }

  .landing-page {
    & button {
      width: fit-content;
    }

    & .hero-title {
      font-family: var(--cds-font-display);
      font-weight: 700;
      font-size: 90px;
      line-height: 83px;
      max-width: 720px;
      color: var(--foreground);
      padding: ${spacing[TOKENS.docItem.spacingVertical]} ${spacing[3]};
      margin: 0;
    }

    & .project-categories-title {
      font-family: var(--cds-font-display);
      font-weight: 700;
      font-size: 55px;
      line-height: 63px;
      max-width: 320px;
      color: var(--foreground);
    }
  }

  .row .col {
    &:nth-child(2) {
      padding-left: ${spacing[4]};
    }
  }

  /* We handle using CDS spacing in DocItem with Box wrapper  */
  .row > div[class*='docItemCol_'] {
    padding: 0;
  }

  main[class*='docMainContainer_'] > .container {
    padding-top: ${spacing[TOKENS.docItem.spacingVertical]} !important;
  }

  .markdown li:nth-child(1) > p {
    margin-top: 0;
  }

  ul ul {
    margin-top: ${spacing[1]};
  }

  /* Fix button group inheriting the docusaurus overrides to li + li elements */
  .markdown .code-playground li + li {
    margin: unset;
  }

  /* Fix examples with CDS Text as h1 having margin applied */
  .markdown .code-playground h1:first-child {
    margin: unset;
  }

  /* Avoid showing anchor styles on hover of Changelog list cells */
  .changelog-list a {
    text-decoration: none;
  }
`;
