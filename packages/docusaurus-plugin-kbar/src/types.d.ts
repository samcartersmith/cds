/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="@docusaurus/theme-classic" />

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

declare module '@theme/useThemeActions' {
  export default function useThemeActions(): void;
}

declare module '@theme/KBar' {
  export type Action = import('kbar').Action;

  export type KBarAction = Action & {
    slug?: string;
  };

  export type KBarProps = {
    actions?: KBarAction[];
    children?: import('react').ReactNode;
  };

  export function useFormatKBarActions(actions: KBarAction[]): Action[];
  export default function KBar(props: KBarProps): JSX.Element;
}

declare module '@theme/KBarModal' {
  export default function KBarModal(): JSX.Element;
}

declare module '@theme/KBarAnimator' {
  export type KBarAnimatorProps = {
    children?: import('react').ReactNode;
  };
  export default function KBarAnimator(props: KBarAnimatorProps): JSX.Element;
}

declare module '@theme/KBarResults' {
  export default function KBarResults(props: { children?: React.ReactNode }): JSX.Element;
}

declare module '@theme/KBarCellAccessory' {
  type IconName = import('@cbhq/cds-common/types').IconName;
  type IconProps = import('@cbhq/cds-web/icons/IconProps').IconProps;

  export type KBarCellAccessoryProps = {
    children?: import('react').ReactNode;
  };

  export default function KBarCellAccessory(props: KBarCellAccessoryProps): JSX.Element;
}

declare module '@theme/KBarListCell' {
  import type { CellSharedProps } from '@cbhq/cds-web/cells/Cell';
  import type { Expand, ListCellBaseProps } from '@cbhq/cds-common/types';

  export type KBarListCellProps = Expand<
    Omit<ListCellBaseProps, 'accessory'> &
      CellSharedProps & {
        accessory?: import('react').ReactNode;
      }
  >;

  export default function KBarListCell(
    props: PropsWithoutRef<KBarListCellProps> & RefAttributes<HTMLElement>,
  ): JSX.Element;
}

declare module '@theme/KBarResultItem' {
  export type KBarResultItemProps = {
    action: import('kbar').ActionImpl & {
      illustration?: import('@cbhq/cds-web').IllustrationNames;
    };
    active: boolean;
    currentRootActionId?: string | null | undefined;
  };
  export default function KBarResultItem(props: KBarResultItemProps): JSX.Element;
}

declare module '@cbhq/docusaurus-plugin-kbar' {
  export type Plugin = import('@docusaurus/types').Plugin;
  export type DocsPluginOptions = import('@docusaurus/plugin-content-docs').PluginOptions;

  export type PluginOptions = { id?: string; docs: DocsPluginOptions };
  export default function plugin(
    context: import('@docusaurus/types').LoadContext,
    options: PluginOptions,
  ): Promise<Plugin<Action[] | undefined>>;
}

declare module '@theme/KBarActions' {
  export type Action = import('kbar').Action;

  export type KBarAction = Action & {
    slug?: string;
  };

  const actions: KBarAction[];
  export default actions;
}
