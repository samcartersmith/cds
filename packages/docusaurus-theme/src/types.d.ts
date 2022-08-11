/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="@docusaurus/module-type-aliases" />
/// <reference types="@docusaurus/theme-classic" />

/* -------------------------------------------------------------------------- */
/*                                Landing Page                                */
/* -------------------------------------------------------------------------- */

declare module '@theme/LandingPage' {
  type LandingPageAnnouncementsProps =
    import('@theme/LandingPageAnnouncements').LandingPageAnnouncementsProps;
  type LandingPageCategoriesProps =
    import('@theme/LandingPageCategories').LandingPageCategoriesProps;

  type LandingPageFocusAreasProps =
    import('@theme/LandingPageFocusAreas').LandingPageFocusAreasProps;

  export type LandingPageProps = import('@cbhq/cds-web').Expand<
    LandingPageAnnouncementsProps &
      LandingPageCategoriesProps & {
        title?: string;
        categories: LandingPageCategoriesProps[];
      }
  >;

  export type LandingPageFields = {
    announcements: import('contentful').Entry<
      import('@theme/LandingPageAnnouncementItem').AnnouncementFields
    >[];
    focusAreas: import('contentful').Entry<
      import('@theme/LandingPageFocusAreas').FocusAreaSectionFields
    >[];
  };

  export default function LandingPage(props: LandingPageProps): JSX.Element;
}

type AnnouncementFields = {
  title: string;
  description: string;
  actionLabel?: string;
  actionUrl?: string;
};

declare module '@theme/LandingPageAnnouncementItem' {
  export type LandingPageAnnouncementItemProps = AnnouncementFields;

  export default function LandingPageAnnouncementItem(
    props: LandingPageAnnouncementItemProps,
  ): JSX.Element;
}

declare module '@theme/LandingPageAnnouncements' {
  export type ContentfulAnnouncements = import('contentful').Entry<AnnouncementFields>[];

  export type LandingPageAnnouncementsProps = {
    announcements: ContentfulAnnouncements | undefined | null;
  };

  export default function LandingPageAnnouncements(
    props: LandingPageAnnouncementsProps,
  ): JSX.Element;
}

declare module '@theme/LandingPageQuickLink' {
  type SpacingScale = import('@cbhq/cds-common/types').SpacingScale;
  type BoxProps = import('@cbhq/cds-web/layout/Box').BoxProps;

  export type LandingPageQuickLinkProps = {
    href?: string;
    onPress?: import('@cbhq/cds-web/system/Pressable').OnPress;
    caption?: string;
    title: string;
    gap?: SpacingScale;
  } & BoxProps;

  export default function LandingPageQuickLink(props: LandingPageQuickLinkProps): JSX.Element;
}

declare module '@theme/LandingPageCategoryItem' {
  export type LandingPageCategoryItemProps = {
    title: string;
    description: string;
    illustration: import('@cbhq/cds-common').IllustrationNames;
    actionLabel: string;
    href: string;
  };

  export default function LandingPageCategoryItem(props: LandingPageCategoryItemProps): JSX.Element;
}

declare module '@theme/LandingPageCategories' {
  export type LandingPageCategoriesProps = {
    categories?: import('@theme/LandingPageCategoryItem').LandingPageCategoryItemProps[];
  };

  export default function LandingPageCategories(props: LandingPageCategoriesProps): JSX.Element;
}

declare module '@theme/LandingPageFocusAreaItem' {
  export type LandingPageFocusAreaItemProps = {
    label: string;
    url: string;
  };

  export default function LandingPageFocusAreaItem(
    props: LandingPageFocusAreaItemProps,
  ): JSX.Element;
}

declare module '@theme/LandingPageFocusAreaGroup' {
  export type LandingPageFocusAreaGroupProps = {
    label: string;
    items: import('contentful').Entry<
      import('@theme/LandingPageFocusAreaItem').LandingPageFocusAreaItemProps
    >[];
  };

  export default function LandingPageFocusAreaGroup(
    props: LandingPageFocusAreaGroupProps,
  ): JSX.Element;
}

declare module '@theme/LandingPageFocusAreas' {
  export type FocusAreaSectionFields = {
    label: string;
    focusAreas: import('contentful').Entry<
      import('@theme/LandingPageFocusAreaGroup').LandingPageFocusAreaGroupProps
    >[];
  };

  export default function LandingPageFocusAreas(props: FocusAreaSectionFields): JSX.Element;
}

declare module '@theme/useComposePage' {
  export type ComposePageData = {
    pageData: import('@cb/cms').ComposePage<unknown> | null;
    handleError: (error: Error | string) => void;
  };
  export type FilterOptions = {
    slug: string;
  };
  export default function useComposePage({ slug }: FilterOptions): ComposePageData;
}

declare module '@theme/useContentfulConfig' {
  export type ContentfulOptions = {
    accessToken: string;
    space: string;
    host: string;
    clientKey?: string;
  };
  export default function useContentfulConfig(): ContentfulOptions;
}

/* -------------------------------------------------------------------------- */
/*                                    KBar                                    */
/* -------------------------------------------------------------------------- */
declare module '@theme/KBarProvider' {
  export type KBarProviderProps = {
    children?: import('react').ReactNode;
  };
  export default function KBarProvider(props: KBarProviderProps): JSX.Element;
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

declare module '@theme/KBarCellAccessory' {
  type IconName = import('@cbhq/cds-common/types').IconName;
  type IconProps = import('@cbhq/cds-web/icons/IconProps').IconProps;

  export type KBarCellAccessoryProps = {
    children?: import('react').ReactNode;
  };

  export default function KBarCellAccessory(props: KBarCellAccessoryProps): JSX.Element;
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
    props: import('react').PropsWithoutRef<KBarListCellProps> &
      import('react').RefAttributes<HTMLElement>,
  ): JSX.Element;
}

declare module '@theme/KBarResultItem' {
  export type KBarResultItemProps = {
    action: import('kbar').ActionImpl & {
      illustration?: import('@cbhq/cds-web').IllustrationNames;
      image?: string;
    };
    active: boolean;
    currentRootActionId?: string | null | undefined;
  };
  export default function KBarResultItem(props: KBarResultItemProps): JSX.Element;
}

declare module '@theme/KBarResults' {
  export default function KBarResults(props: { children?: React.ReactNode }): JSX.Element;
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
  export default function DocgenProjectProvider(props: DocgenProjectProviderProps): JSX.Element;
}

declare module '@theme/DocgenProjectSelector' {
  export default function DocgenProjectSelector(): JSX.Element;
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

  export default function ParentTypesList(props: ParentTypesListProps): JSX.Element;
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

  export default function PropsTable(props: PropsTableProps): JSX.Element;
}

declare module '@theme/PropsTableCellAccessory' {
  type IconName = import('@cbhq/cds-common/types').IconName;
  type IconProps = import('@cbhq/cds-web/icons/IconProps').IconProps;

  export type PropsTableCellAccessoryProps = {
    children?: import('react').ReactNode;
  };

  export default function PropsTableListCellAccessory(
    props: PropsTableCellAccessoryProps,
  ): JSX.Element;
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
    props: import('react').PropsWithoutRef<PropsTableListCellProps> &
      import('react').RefAttributes<HTMLElement>,
  ): JSX.Element;
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
  export function TOCProvider(props: TOCProviderProps): JSX.Element;
  export function useTOC(): TOCContextValue;
  export function TOCUpdater(props: TOCUpdaterProps): JSX.Element;

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
  export default function ChangelogList(): JSX.Element;
}

declare module '@theme/ChangelogListCell' {
  export type ChangelogListCellProps = import('@cbhq/cds-web/cells/ListCell').ListCellProps;
  export default function ChangelogListCell(): JSX.Element;
}

/* -------------------------------------------------------------------------- */
/*                                    Misc                                    */
/* -------------------------------------------------------------------------- */

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

  export default function ExampleWithThemeToggles(props: ExampleWithThemeTogglesProps): JSX.Element;
}

declare module '@theme/Image' {
  export type ImageProps = import('./theme/Image').ImageProps;
  const Image: typeof import('./theme/Image').default;
  export default Image;
}

declare module '@theme/ImportBlock' {
  export type ImportBlockProps = { name: string; from: string };
  export default function ImportBlock(props: ImportBlockProps): JSX.Element;
}

declare module '@theme/JSDocTag' {
  export const JSDOC_TAG_VARIANTS: JSDocTagVariant[];
  export type JSDocTagVariant = 'beta' | 'danger' | 'deprecated' | 'internal' | 'new' | 'required';

  type JSDocTagProps = {
    variant: JSDocTagVariant;
    order?: number;
  };

  export default function JSDocTag(props: JSDocTagProps): JSX.Element;
}

declare module '@theme/ModalLink' {
  const ModaLink: typeof import('./theme/ModalLink').default;
  export default ModaLink;
}

declare module '@theme/NavbarPortal' {
  export type NavbarPortalProps = {
    children: React.ReactNode;
  };

  export default function NavbarPortal(props: NavbarPortalProps): JSX.Element;
}

declare module '@theme/ThemeToggles' {
  export default function ThemeToggles(): JSX.Element;
}

declare module '@theme/Calendar' {
  export type CalendarProps = import('schedulely').SchedulelyProps;
  export type CalendarEvent = import('schedulely').CalendarEvent;
  export default function Calendar(props: CalendarProps): JSX.Element;
}

declare module '@theme/ScrollSnapCarousel' {
  type BoxProps = import('@cbhq/cds-web/layout/Box').BoxProps;

  export type ScrollSnapCarouselProps = {
    cards: unknown[] | undefined | null;
    renderCards: (cards: unknown[]) => JSX.Element;
    loading?: boolean;
    dismissableCards?: boolean;
  } & BoxProps;

  export default function ScrollSnapCarousel(props: ScrollSnapCarouselProps): JSX.Element;
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

  export type CustomThemeComponentType = React.ComponentType<OriginalThemeProviderProps>;

  function createCustomTheme(
    palette: SpectrumAwarePartialPaletteConfig,
  ): React.ComponentType<SpectrumAwareThemeProviderProps>;
  function createCustomTheme(
    palette: PartialPaletteConfig,
  ): React.ComponentType<OriginalThemeProviderProps>;

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
