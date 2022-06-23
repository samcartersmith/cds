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

declare module '@cbhq/docusaurus-plugin-kbar' {
  export type Plugin = import('@docusaurus/types').Plugin;
  export type DocsPluginOptions = import('@docusaurus/plugin-content-docs').PluginOptions;

  export type KBarAction = import('kbar').Action;
  export type KBarCustomAction = KBarAction & {
    slug?: string;
    url?: string;
    illustration?: import('@cbhq/cds-common').IllustrationNames;
    image?: string;
  };

  export type SidebarItem =
    import('@docusaurus/plugin-content-docs/lib/sidebars/types').SidebarItem & {
      customProps?: {
        kbar?: KBarAction & {
          illustration?: import('@cbhq/cds-common').IllustrationNames;
          description?: string;
        };
      };
    };

  export type PluginData = {
    actions: KBarCustomAction[];
  };

  export type PluginOptions = {
    id?: string;
    docs: DocsPluginOptions;
    actions?: KBarCustomAction[];
  };
  export default function plugin(
    context: import('@docusaurus/types').LoadContext,
    options: PluginOptions,
  ): Promise<Plugin<PluginData>>;
}
