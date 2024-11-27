import { addons } from '@storybook/addons';

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
