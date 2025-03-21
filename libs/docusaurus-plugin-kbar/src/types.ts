import type { SetOptional } from 'type-fest';
import type { IconName, PictogramName, SpotSquareName } from '@cbhq/cds-common';

export type Plugin = import('@docusaurus/types').Plugin;
export type DocsPluginOptions = import('@docusaurus/plugin-content-docs').PluginOptions;

export type KBarAction = import('kbar').Action;
export type KBarCustomAction = KBarAction & {
  slug?: string;
  url?: string;
  pictogram?: PictogramName;
  spotSquare?: SpotSquareName;
  image?: string;
};

export type SidebarItemCustomProps = {
  icon?: IconName;
  kbar?: SetOptional<KBarCustomAction, 'id' | 'name'> & {
    description?: string;
  };
};

export type SidebarItem =
  import('@docusaurus/plugin-content-docs/lib/sidebars/types.js').SidebarItem & {
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
