type PresetClassicOptions = import('@docusaurus/preset-classic/src/preset-classic').Options;
type LoadContext = import('@docusaurus/types').LoadContext;
type PluginConfigs = import('@docusaurus/types').PluginConfig[];

declare module '@docusaurus/preset-classic' {
  export default function preset(
    context: LoadContext,
    options: PresetClassicOptions,
  ): {
    themes: PluginConfigs;
    plugins: PluginConfigs;
  };
}

declare module '@cbhq/docusaurus-preset' {
  export type { LoadContext };
  export type PresetOptions = {
    theme?: undefined;
    docgen?: import('@cbhq/docusaurus-plugin-docgen').PluginOptions;
    kbar?: import('@cbhq/docusaurus-plugin-kbar').PluginOptions;
  } & PresetClassicOptions;

  export default function preset(
    context: LoadContext,
    options: PresetClassicOptions,
  ): {
    themes: (string | [string, undefined])[];
    plugins: PresetOptions[keyof PresetOptions][];
  };
}
