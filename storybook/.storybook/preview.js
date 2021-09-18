import { css } from 'linaria';
import { withPerformance } from 'storybook-addon-performance';
import { LightStoryContainer } from '../decorators/StoryContainer';
import '../../web/globalStyles';

export const decorators = [LightStoryContainer, withPerformance];

export const parameters = {
  layout: 'fullscreen',
  viewMode: 'docs',
  docs: {
    forceExtractedArgTypes: true,
  },
  // TODO (hannah): update background colors with real values
  backgrounds: {
    default: 'light',
    values: [
      { name: 'dark', value: '#000' },
      { name: 'light', value: '#fff' },
    ],
  },
  actions: { argTypesRegex: '^on.*' },
  design: {
    type: 'figma',
    embedHost: 'coinbase design system',
    allowFullscreen: true,
    // There's a bug in the addon that always assumes there's a url
    url: '',
    credential: {
      oauthClientId: process.env.FIGMA_OAUTH_CLIENT_ID,
      oauthClientSecret: process.env.FIGMA_OAUTH_CLIENT_SECRET,
    },
  },
  controls: { expanded: true },
  options: {
    storySort: {
      order: ['Design Tokens', 'Layout', 'Core Components', 'Icons'],
    },
  },
};
