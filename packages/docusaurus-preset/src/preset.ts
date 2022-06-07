import presetClassic from '@docusaurus/preset-classic';
import type { LoadContext, PresetOptions } from '@cbhq/docusaurus-preset';

export default function preset(context: LoadContext, opts: PresetOptions = {}) {
  const { docgen, kbar, ...classicOptions } = opts;

  const { themes, plugins } = presetClassic(context, classicOptions);

  themes.push(require.resolve('@docusaurus/theme-live-codeblock'));
  themes.push(require.resolve('@cbhq/docusaurus-theme'));

  if (docgen) {
    plugins.push([require.resolve('@cbhq/docusaurus-plugin-docgen'), docgen]);
  }

  plugins.push([
    require.resolve('@cbhq/docusaurus-plugin-kbar'),
    {
      ...kbar,
      docs: kbar?.docs ?? classicOptions.docs,
    },
  ]);

  return { themes, plugins };
}
