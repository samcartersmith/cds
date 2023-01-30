declare module '@docusaurus/plugin-content-docs' {
  export default function pluginContentDocs(
    context: import('@docusaurus/types').LoadContext,
    options: import('@docusaurus/plugin-content-docs').PluginOptions,
  ): Promise<{
    loadContent: () => Promise<import('@docusaurus/plugin-content-docs/lib/types').LoadedContent>;
  }>;
}

declare module '@docusaurus/plugin-content-docs/options' {
  export const DEFAULT_OPTIONS: import('@docusaurus/plugin-content-docs').PluginOptions;
}
