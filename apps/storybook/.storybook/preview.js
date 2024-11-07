// @ts-check
import './polyfills';
import 'focus-visible';
import '@cbhq/cds-fonts/fonts.css';
import '@cbhq/cds-icons/fonts/web/icon-font.css';
import { globalStyles } from '@cbhq/cds-web/styles/global';
import { withPerformance } from 'storybook-addon-performance';
import { StoryContainer } from '@cbhq/cds-web/storybook-decorators/StoryContainer';
import { withDesign } from 'storybook-addon-designs';
import { themes } from '@storybook/theming';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

/** @type {(import('@storybook/react').DecoratorFn)[]} */
export const decorators = [StoryContainer, withPerformance, withDesign];

/** @type {import('@storybook/react').Parameters} */
export const parameters = {
  layout: 'fullscreen',
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Design Tokens', 'Layout', 'Core Components', 'Icons'],
    },
  },
  viewport: {
    viewports: {
      PercyMobile: {
        name: 'Percy Mobile',
        styles: {
          width: '375px',
          height: '812px',
        },
        type: 'mobile',
      },
      PercyDesktop: {
        name: 'Percy Desktop',
        styles: {
          width: '1280px',
          height: '800px',
        },
        type: 'desktop',
      },
      ...INITIAL_VIEWPORTS,
    },
  },
  globalStyles, // linaria requires usage to generate the styles
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark, appContentBg: 'black', barBg: 'black' },
    light: themes.normal,
  },
};

export const globalTypes = {
  // TODO: Update this once we have CDS provider to handle i18n related stylistic changes
  locale: {
    name: 'Locale',
    description: 'i18n',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇺🇸', title: 'English' },
        { value: 'fr', right: '🇫🇷', title: 'Français' },
        { value: 'es', right: '🇪🇸', title: 'Español' },
        { value: 'zh', right: '🇨🇳', title: '中文' },
        { value: 'kr', right: '🇰🇷', title: '한국어' },
      ],
    },
  },
  density: {
    name: 'Density',
    description: 'Toggle between normal and dense modes',
    defaultValue: 'normal',
    toolbar: {
      icon: 'expand',
      items: [
        { value: 'normal', title: 'Normal' },
        { value: 'dense', title: 'Dense' },
      ],
    },
  },
};
