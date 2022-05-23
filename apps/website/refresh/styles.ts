import { css } from '@linaria/core';
import { defaultPalette, frontierSpectrumPalette } from '@cbhq/cds-common/palette/constants';
import { borderRadiusVariables } from '@cbhq/cds-web/styles/borderRadius';
import { borderWidthVariables } from '@cbhq/cds-web/styles/borderWidth';
import { largeVariables as normalScaleVariables } from '@cbhq/cds-web/styles/scale';
import {
  darkVariables,
  frontierDarkVariables,
  frontierLightVariables,
  lightVariables,
} from '@cbhq/cds-web/styles/spectrum';
import { borderRadius, palette, spacing } from '@cbhq/cds-web/tokens';
import { paletteValueToCssVar, setPaletteConfigToCssVars } from '@cbhq/cds-web/utils/palette';

/**
 * Any CSS included here will be global. The classic template
 * bundles Infima by default. Infima is a CSS framework designed to
 * work well for content-centric websites.
 */
const red0 = paletteValueToCssVar('red0');
const red60 = paletteValueToCssVar('red60');

const lightPalette = setPaletteConfigToCssVars({
  ...defaultPalette,
  ...frontierSpectrumPalette.light,
});
const darkPalette = setPaletteConfigToCssVars({
  ...defaultPalette,
  ...frontierSpectrumPalette.dark,
});

const styles = css`
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
      -webkit-tap-highlight-color: ${palette.transparent}; /* 3*/
    }

    :root {
      ${borderRadiusVariables};
      ${borderWidthVariables};
      ${normalScaleVariables};

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
      ${frontierLightVariables};
      ${lightPalette};
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
      ${frontierDarkVariables};
      ${darkPalette};
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
      flex-direction: row-reverse;
      gap: ${spacing[3]};
    }

    /* Search styles */

    /* In navbar - replace plugin icon with cds version */
    .aa-Autocomplete svg {
      display: none;
    }

    .aa-DetachedSearchButton {
      display: flex;
      align-items: center;
      gap: 8px;
      appearance: none;
      background-color: inherit;
      padding: 0;
      padding-left: 28px;
      padding-right: ${spacing[2]};
      font-family: var(--cds-font-sans);
      font-size: 16px;
      width: 280px;
    }

    .aa-DetachedSearchButton::before {
      content: '';
      font-family: var(--cds-font-icon);
      font-size: 16px;
      color: ${palette.foreground};
    }

    .aa-Form,
    .aa-InputWrapper,
    .aa-InputWrapperPrefix,
    .aa-Input,
    .aa-Label,
    .aa-SubmitButton,
    .aa-DetachedCancelButton {
      height: inherit;
    }

    .aa-DetachedOverlay {
      width: 100%;
      height: 100vh;
      left: 0;
      margin: 0;
      padding: 0;
      position: fixed;
      right: 0;
      top: 0;
      z-index: 9998;
      background-color: ${palette.backgroundOverlay};
    }

    .aa-DetachedContainer--modal {
      box-shadow: none;
      border-radius: var(--search-border-radius);
      bottom: inherit;
      height: auto;
      margin: 0 auto;
      position: absolute;
      top: 10%;
      width: 100%;
    }

    .aa-DetachedFormContainer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border: none;
      border-radius: var(--search-border-radius);
      height: var(--search-input-height);
      width: var(--search-width);
      margin: 0 auto;
      background-color: var(--elevation2);
      overflow: hidden;
    }

    .aa-Form {
      display: flex;
      width: 100%;
    }

    .aa-InputWrapper {
      width: 100%;
    }

    .aa-Input {
      width: 100%;
      padding: 0;
      border: none;
      appearance: none;
      outline: none;
      font-family: var(--cds-font-sans);
      caret-color: ${palette.primary};
      font-size: 16px;
      line-height: ${spacing[3]};
      background: inherit;
    }

    .aa-Input::-webkit-search-cancel-button {
      appearance: none;
    }

    .aa-InputWrapperSuffix {
      display: none;
    }

    .aa-SubmitButton {
      background-color: inherit;
      padding: 0;
      padding-left: 28px;
      padding-right: ${spacing[2]};
      font-family: var(--cds-font-sans);
      font-size: 16px;
    }

    .aa-SubmitButton svg {
      display: none;
    }

    .aa-SubmitButton::before {
      content: '';
      font-family: var(--cds-font-icon);
      font-size: 16px;
      color: ${palette.primary};
    }

    .aa-DetachedCancelButton {
      background-color: inherit;
      padding: 0;
      padding-left: 16px;
      padding-right: 28px;
      font-family: var(--cds-font-sans);
      font-size: 16px;
    }

    .aa-Panel {
      width: var(--search-width);
      border-radius: var(--search-border-radius);
      background-color: var(--elevation2);
      margin: 0 auto;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-bottom-left-radius: 16px;
      border-bottom-right-radius: 16px;
      border-top: 1px solid ${palette.line};
      position: relative;
    }

    .aa-Panel::before {
      content: '';
      background-color: var(--elevation2);
      width: 100%;
      height: var(--search-border-radius);
      position: absolute;
      top: calc(var(--search-border-radius) * -1);
      border-bottom: 1px solid ${palette.line};
    }

    /* List items in search panel */
    .aa-List {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .aa-PanelLayout {
      overflow: hidden;
    }

    .aa-Source,
    .aa-List:last-child {
      border-bottom-left-radius: 16px;
      border-bottom-right-radius: 16px;
    }

    .aa-Item {
      padding: ${spacing[1]} ${spacing[3]};
    }

    .aa-Item[aria-selected='true'] {
      background-color: ${palette.secondary};
    }

    .aa-ItemLink {
      text-decoration: none;
      font-family: var(--cds-font-sans);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: ${spacing[1]};
    }

    .aa-ItemLink:hover {
      text-decoration: none;
      color: initial;
    }

    .aa-ItemContentBody {
      display: flex;
      flex-direction: column;
      gap: ${spacing[0.5]};
    }

    .aa-ItemContentTitle {
      font-size: 16px;
      color: ${palette.foreground};
    }

    .aa-ItemContentDescription {
      font-size: 14px;
      color: ${palette.foregroundMuted};
    }

    .aa-ItemActionButton {
      background-color: inherit;
      padding: 0;
    }

    .aa-SourceNoResults {
      padding: ${spacing[3]};
    }

    /* Search result highlights */
    mark {
      background-color: unset;
      color: unset;
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
  }
`;

export default styles;
