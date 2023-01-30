import type { SetOptional } from 'type-fest';
import type { IllustrationNames } from '@cbhq/cds-common';

export type Plugin = import('@docusaurus/types').Plugin;
export type DocsPluginOptions = import('@docusaurus/plugin-content-docs').PluginOptions;

export type KBarAction = import('kbar').Action;
export type KBarCustomAction = KBarAction & {
  slug?: string;
  url?: string;
  illustration?: IllustrationNames;
  image?: string;
};

export type SidebarItemCustomProps = {
  kbar?: SetOptional<KBarCustomAction, 'id' | 'name'> & {
    illustration?: IllustrationNames;
    description?: string;
  };
};

export type SidebarItem =
  import('@docusaurus/plugin-content-docs/lib/sidebars/types').SidebarItem & {
    customProps?: SidebarItemCustomProps;
  };

export type PluginData = {
  actions: KBarCustomAction[];
};

export type PluginOptions = {
  id?: string;
  docs: DocsPluginOptions;
  actions?: KBarCustomAction[];
};

export {};
