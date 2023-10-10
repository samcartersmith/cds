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
        require.resolve('focus-visible'),
        require.resolve('schedulely/dist/index.css'),
        require.resolve('@cbhq/cds-fonts/fonts.css'),
        require.resolve('@cbhq/cds-icons/fonts/web/icon-font.css'),
        require.resolve('./css/styles.css'),
        require.resolve('./js/init.js'),
      ];
    },
  };
}
