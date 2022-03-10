import { css } from 'linaria';
import { withPerformance } from 'storybook-addon-performance';
import { StoryContainer } from '../decorators/StoryContainer';
import '../../web/globalStyles';

export const decorators = [StoryContainer, withPerformance];

export const parameters = {
  layout: 'fullscreen',
  viewMode: 'docs',
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
