// These have been expanded from './globalStyles'
import 'focus-visible';
import '@cbhq/cds-fonts/fonts.css';
import '@cbhq/cds-web/styles/icon-font.css';
import { globalStyles } from '@cbhq/cds-web/styles/global';
import { withPerformance } from 'storybook-addon-performance';
import { StoryContainer } from '@cbhq/cds-web/storybook-decorators/StoryContainer';
import { withDesign } from 'storybook-addon-designs';

export const decorators = [StoryContainer, withPerformance, withDesign];

export const parameters = {
  layout: 'fullscreen',
  controls: {
    expanded: true,
    hideNoControlsWarning: true,
    sort: 'none',
  },
  options: {
    storySort: {
      order: ['Design Tokens', 'Layout', 'Core Components', 'Icons'],
    },
  },
  viewMode: 'canvas',
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
  globalStyles, // linaria requires usage to generate the styles
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
};
