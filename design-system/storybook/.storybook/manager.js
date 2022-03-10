import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

addons.setConfig({
  panelPosition: 'right',
  toolbar: {
    title: { hidden: true },
    zoom: { hidden: true },
    eject: { hidden: true },
    copy: { hidden: true },
    fullscreen: { hidden: true },
    background: { hidden: true },
  },
});
