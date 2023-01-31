declare module '@docusaurus/preset-classic' {
  export default function preset(
    context: import('@docusaurus/types').LoadContext,
    options: import('@docusaurus/preset-classic/src/preset-classic').Options,
  ): {
    themes: import('@docusaurus/types').PluginConfig[];
    plugins: import('@docusaurus/types').PluginConfig[];
  };
}
