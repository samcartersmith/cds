import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

addons.setConfig({
  selectedPanel: 'STORYBOOK_ADDON_DESIGNS/panel',
  panelPosition: 'bottom',
  previewTabs: {
    // make docs tab appear first
    'storybook/docs/panel': {
      index: 0,
    },
    canvas: null,
  },
  theme: create({
    base: 'light',
    // TODO (hannah): brandImage, brandUrl
    brandTitle: 'Coinbase Design System',
  }),
});
