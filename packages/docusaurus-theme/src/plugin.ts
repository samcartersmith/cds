import { Plugin } from '@docusaurus/types';
import path from 'path';

const PLUGIN_ID = '@cbhq/docusaurus-theme';

export default async function theme(): Promise<Plugin<void>> {
  return {
    name: PLUGIN_ID,
    getThemePath(): string {
      return path.resolve(__dirname, './theme');
    },
    getTypeScriptThemePath(): string {
      return path.resolve(__dirname, '..', 'src', 'theme');
    },
    getClientModules() {
      return [
        require.resolve('schedulely/dist/index.css'),
        require.resolve('@cbhq/cds-fonts/fonts.css'),
        require.resolve('@cbhq/cds-web/styles/icon-font.css'),
        require.resolve('./css/styles.css'),
        require.resolve('./js/init.js'),
      ];
    },
  };
}
