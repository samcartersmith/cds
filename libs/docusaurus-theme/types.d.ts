/// <reference types="@docusaurus/module-type-aliases" />
/// <reference types="@docusaurus/theme-classic" />

/* -------------------------------------------------------------------------- */
/*                                    KBar                                    */
/* -------------------------------------------------------------------------- */
declare module '@theme/KBarProvider' {
  export type KBarProviderProps = {
    children?: import('react').ReactNode;
  };
  export default function KBarProvider(props: KBarProviderProps): React.ReactNode;
}

declare module '@theme/KBarModal' {
  export default function KBarModal(): React.ReactNode;
}

declare module '@theme/KBarAnimator' {
  export type KBarAnimatorProps = {
    children?: import('react').ReactNode;
  };
  export default function KBarAnimator(props: KBarAnimatorProps): React.ReactNode;
}

declare module '@theme/KBarCellAccessory' {
  type IconName = import('@cbhq/cds-common/types').IconName;
  type IconProps = import('@cbhq/cds-web/icons/IconProps').IconProps;

  export type KBarCellAccessoryProps = {
    children?: import('react').ReactNode;
  };

  export default function KBarCellAccessory(props: KBarCellAccessoryProps): React.ReactNode;
}

declare module '@theme/KBarListCell' {
  type CellSharedProps = import('@cbhq/cds-web/cells/Cell').CellSharedProps;
  type ListCellBaseProps = import('@cbhq/cds-web').ListCellBaseProps;

  export type KBarListCellProps = import('@cbhq/cds-web').Expand<
    Omit<ListCellBaseProps, 'accessory'> &
      CellSharedProps & {
        accessory?: import('react').ReactNode;
      }
  >;

  export default function KBarListCell(
    props: import('react').PropsWithoutRef<KBarListCellProps> & {
      ref?: import('react').Ref<HTMLElement>;
    },
  ): React.ReactNode;
}

declare module '@theme/KBarResultItem' {
  export type KBarResultItemProps = {
    action: import('kbar').ActionImpl & {
      spotSquare?: import('@cbhq/cds-web').SpotSquareName;
      pictogram?: import('@cbhq/cds-web').PictogramName;
      image?: string;
    };
    active: boolean;
    currentRootActionId?: string | null | undefined;
  };
  export default function KBarResultItem(props: KBarResultItemProps): React.ReactNode;
}

declare module '@theme/KBarResults' {
  export default function KBarResults(props: { children?: React.ReactNode }): React.ReactNode;
}

declare module '@theme/useKBarPluginData' {
  type PluginData = import('@cbhq/docusaurus-plugin-kbar').PluginData;
  export default function useKBarPluginData(): PluginData;
}

declare module '@theme/useKBarThemeActions' {
  export default function useKBarThemeActions(): import('@cbhq/docusaurus-plugin-kbar').KBarAction[];
}

/* -------------------------------------------------------------------------- */
/*                                   Docgen                                   */
/* -------------------------------------------------------------------------- */
declare module '@theme/DocgenProjectProvider' {
  export type DocgenProjectProviderProps = {
    children?: import('react').ReactNode;
  };
  export default function DocgenProjectProvider(props: DocgenProjectProviderProps): React.ReactNode;
}

declare module '@theme/DocgenProjectSelector' {
  export default function DocgenProjectSelector(): React.ReactNode;
}

declare module '@theme/useDocgenPluginData' {
  type PluginData = import('@cbhq/docusaurus-plugin-docgen').PluginData;
  export default function useDocgenPluginData(): PluginData;
}

declare module '@theme/ParentTypesList' {
  type ParentTypes = import('@cbhq/docusaurus-plugin-docgen').ProcessedDoc['parentTypes'];
  type SharedParentTypes = import('@cbhq/docusaurus-plugin-docgen').SharedParentTypes;
  type SharedTypeAliases = import('@cbhq/docusaurus-plugin-docgen').SharedTypeAliases;

  export type ParentTypesItem = {
    name: string;
    props: string[];
    sharedTypeAliases: SharedTypeAliases;
    sharedParentTypes: SharedParentTypes;
  };

  export type ParentTypesListProps = {
    parentTypes: ParentTypes;
    sharedTypeAliases: SharedTypeAliases;
    sharedParentTypes: SharedParentTypes;
  };

  export default function ParentTypesList(props: ParentTypesListProps): React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/*                             Docgen Props Table                             */
/* -------------------------------------------------------------------------- */

declare module '@theme/PropsTable' {
  type ProcessedPropItem = import('@cbhq/docusaurus-plugin-docgen').ProcessedPropItem;
  type SharedTypeAliases = import('@cbhq/docusaurus-plugin-docgen').SharedTypeAliases;

  export type PropsTableProps = {
    props: ProcessedPropItem[];
    sharedTypeAliases: SharedTypeAliases;
  };

  export default function PropsTable(props: PropsTableProps): React.ReactNode;
}

declare module '@theme/PropsTableCellAccessory' {
  type IconName = import('@cbhq/cds-common/types').IconName;
  type IconProps = import('@cbhq/cds-web/icons/IconProps').IconProps;

  export type PropsTableCellAccessoryProps = {
    children?: import('react').ReactNode;
  };

  export default function PropsTableListCellAccessory(
    props: PropsTableCellAccessoryProps,
  ): React.ReactNode;
}

declare module '@theme/PropsTableListCell' {
  type CellSharedProps = import('@cbhq/cds-web/cells/Cell').CellSharedProps;
  type ListCellBaseProps = import('@cbhq/cds-web').ListCellBaseProps;

  export type PropsTableListCellProps = import('@cbhq/cds-web').Expand<
    Omit<ListCellBaseProps, 'accessory'> &
      Omit<CellSharedProps, 'detail' | 'subdetail'> & {
        accessory?: import('react').ReactNode;
        tags?: import('react').ReactNode;
        type?: import('react').ReactNode;
        defaultValue?: import('react').ReactNode;
      }
  >;

  export default function PropsTableListCell(
    props: import('react').PropsWithoutRef<PropsTableListCellProps> & {
      ref?: import('react').Ref<HTMLElement>;
    },
  ): React.ReactNode;
}

declare module '@theme/PropsTableRow' {
  export const TypeAliasModalContent: typeof import('./theme/PropsTableRow').TypeAliasModalContent;
  const PropsTableRow: typeof import('./theme/PropsTableRow').default;
  export default PropsTableRow;
}

/* -------------------------------------------------------------------------- */
/*                              Table of contents                             */
/* -------------------------------------------------------------------------- */

declare module '@theme/createTOCManager' {
  export type TOCItems = import('@docusaurus/types').TOCItem[] | undefined;

  export type TOCContextValue = {
    items: TOCItems;
    update: import('@cbhq/cds-common').SetState<TOCItems>;
  };

  export type TOCProviderProps = {
    children: import('react').ReactNode;
  };
  export type TOCUpdaterProps = { toc: TOCItems };

  const TOCContext: import('react').Context<TOCContextValue>;
  export function TOCProvider(props: TOCProviderProps): React.ReactNode;
  export function useTOC(): TOCContextValue;
  export function TOCUpdater(props: TOCUpdaterProps): React.ReactNode;

  export default function createTOCManager(): {
    useTOC: typeof useTOC;
    TOCProvider: typeof TOCProvider;
    TOCUpdater: typeof TOCUpdater;
  };
}

declare module '@theme/PropsTOCManager' {
  export const usePropsTOC: typeof import('@theme/createTOCManager').useTOC;
  export const PropsTOCProvider: typeof import('@theme/createTOCManager').TOCProvider;
  export const PropsTOCUpdater: typeof import('@theme/createTOCManager').TOCUpdater;
}

declare module '@theme/ChangelogTOCManager' {
  export const useChangelogTOC: typeof import('@theme/createTOCManager').useTOC;
  export const ChangelogTOCProvider: typeof import('@theme/createTOCManager').TOCProvider;
  export const ChangelogTOCUpdater: typeof import('@theme/createTOCManager').TOCUpdater;
}

declare module '@theme/TOCManager' {
  export const useTOC: typeof import('@theme/createTOCManager').useTOC;
  export const TOCProvider: typeof import('@theme/createTOCManager').TOCProvider;
  export const TOCUpdater: typeof import('@theme/createTOCManager').TOCUpdater;
}

/* -------------------------------------------------------------------------- */
/*                                  Changelog                                 */
/* -------------------------------------------------------------------------- */
declare module '@theme/ChangelogList' {
  export type ChangelogListProps = import('@cbhq/cds-web/layout/VStack').VStackProps;
  export default function ChangelogList(): React.ReactNode;
}

declare module '@theme/ChangelogListCell' {
  export type ChangelogListCellProps = import('@cbhq/cds-web/cells/ListCell').ListCellProps;
  export default function ChangelogListCell(): React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/*                                    Misc                                    */
/* -------------------------------------------------------------------------- */

declare module '@theme/Playground' {
  const Playground: typeof import('./theme/Playground').default;
  export default Playground;
}

declare module '@theme/Collection' {
  export type CollectionProps = import('./theme/Collection').CollectionProps;
  const Collection: typeof import('./theme/Collection').default;
  export default Collection;
}

declare module '@theme/CollectionItem' {
  export type CollectionItemProps = import('./theme/CollectionItem').CollectionItemProps;
  const CollectionItem: typeof import('./theme/CollectionItem').default;
  export default CollectionItem;
}

declare module '@theme/DoDont' {
  export const DontExample: typeof import('./theme/DoDont').DontExample;
  export const DoExample: typeof import('./theme/DoDont').DoExample;

  export type DoDontProps = import('./theme/DoDont').DoDontProps;
  const DoDont: typeof import('./theme/DoDont').default;
  export default DoDont;
}

declare module '@theme/Image' {
  export type ImageProps = import('./theme/Image').ImageProps;
  const Image: typeof import('./theme/Image').default;
  export default Image;
}

declare module '@theme/ExampleWithThemeToggles' {
  export type ExampleWithThemeTogglesProps = {
    children?: import('react').ReactNode;
  };

  export default function ExampleWithThemeToggles(
    props: ExampleWithThemeTogglesProps,
  ): React.ReactNode;
}

declare module '@theme/Image' {
  export type ImageProps = import('./theme/Image').ImageProps;
  const Image: typeof import('./theme/Image').default;
  export default Image;
}

declare module '@theme/ImportBlock' {
  export type ImportBlockProps = { name: string; from: string };
  export default function ImportBlock(props: ImportBlockProps): React.ReactNode;
}

declare module '@theme/JSDocTag' {
  export const JSDOC_TAG_VARIANTS: JSDocTagVariant[];
  export type JSDocTagVariant = 'beta' | 'danger' | 'deprecated' | 'internal' | 'new' | 'required';

  type JSDocTagProps = {
    variant: JSDocTagVariant;
    order?: number;
  };

  export default function JSDocTag(props: JSDocTagProps): React.ReactNode;
}

declare module '@theme/ModalLink' {
  const ModaLink: typeof import('./theme/ModalLink').default;
  export default ModaLink;
}

declare module '@theme/NavbarPortal' {
  export type NavbarPortalProps = {
    children: React.ReactNode;
  };

  export default function NavbarPortal(props: NavbarPortalProps): React.ReactNode;
}

declare module '@theme/ThemeToggles' {
  export default function ThemeToggles(): React.ReactNode;
}

declare module '@theme/Calendar' {
  export type CalendarProps = import('schedulely').SchedulelyProps;
  export type CalendarEvent = import('schedulely').CalendarEvent;
  export default function Calendar(props: CalendarProps): React.ReactNode;
}

declare module '@theme/ScrollSnapCarousel' {
  type BoxProps = import('@cbhq/cds-web/layout/Box').BoxProps;

  export type ScrollSnapCarouselProps = {
    cards: unknown[] | undefined | null;
    renderCards: (cards: unknown[]) => React.ReactNode;
    loading?: boolean;
    dismissableCards?: boolean;
  } & BoxProps;

  export default function ScrollSnapCarousel(props: ScrollSnapCarouselProps): React.ReactNode;
}

declare module '@theme/Video' {
  export type VideoProps = import('./theme/Video').VideoProps;
  const Video: typeof import('./theme/Video').default;
  export default Video;
}

/* -------------------------------------------------------------------------- */
/*                                   Theming                                  */
/* -------------------------------------------------------------------------- */

declare module '@theme/createCustomTheme' {
  type PartialPaletteConfig = import('@cbhq/cds-common').PartialPaletteConfig;
  type OriginalThemeProviderProps = import('@cbhq/cds-web/system/ThemeProvider').ThemeProviderProps;

  type SpectrumAwarePartialPaletteConfig = import('@cbhq/cds-common').SpectrumConditionalConfig<
    PartialPaletteConfig,
    PartialPaletteConfig
  >;

  export type SpectrumAwareThemeProviderProps = Omit<OriginalThemeProviderProps, 'palette'> & {
    palette?: SpectrumAwarePartialPaletteConfig;
  };

  export type CustomThemeComponentType = React.ComponentType<
    React.PropsWithChildren<OriginalThemeProviderProps>
  >;

  function createCustomTheme(
    palette: SpectrumAwarePartialPaletteConfig,
  ): React.ComponentType<React.PropsWithChildren<SpectrumAwareThemeProviderProps>>;
  function createCustomTheme(
    palette: PartialPaletteConfig,
  ): React.ComponentType<React.PropsWithChildren<OriginalThemeProviderProps>>;

  export default function createCustomTheme(
    palette: PartialPaletteConfig | SpectrumAwarePartialPaletteConfig,
  ): CustomThemeComponentType;
}

declare module '@theme/useColorMode' {
  type ColorMode = import('@cbhq/cds-web').Spectrum;
  type SetColorMode = (spectrum: ColorMode) => void;
  export type UseColorModeReturnType = {
    colorMode: ColorMode;
    setColorMode: SetColorMode;
  };
  export default function useColorMode(): { colorMode: ColorMode; setColorMode: SetColorMode };
}

declare module '@cbhq/docusaurus-theme' {
  export type SidebarItemCustomProps = import('./theme/DocSidebarItem').SidebarItemCustomProps;
}
