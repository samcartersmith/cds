/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="@docusaurus/module-type-aliases" />
/// <reference types="@docusaurus/theme-classic" />

/* -------------------------------------------------------------------------- */
/*                                Landing Page                                */
/* -------------------------------------------------------------------------- */

declare module '@theme/LandingPage' {
  type LandingPageAnnouncementsProps =
    import('@theme/LandingPageAnnouncements').LandingPageAnnouncementsProps;
  type LandingPageFocusAreasProps =
    import('@theme/LandingPageFocusAreas').LandingPageFocusAreasProps;

  type LandingPageProjectCategoriesProps =
    import('@theme/LandingPageProjectCategories').LandingPageProjectCategoriesProps;

  export type LandingPageProps = import('@cbhq/cds-web').Expand<
    LandingPageAnnouncementsProps &
      LandingPageFocusAreasProps & {
        title?: string;
        quickLinks?: import('@theme/LandingPageQuickLink').LandingPageQuickLinkProps[];
        categories: LandingPageProjectCategoriesProps[];
      }
  >;

  export default function LandingPage(props: LandingPageProps): JSX.Element;
}

declare module '@theme/LandingPageProjectCategories' {
  export type Project = {
    label: string;
    href: string;
  };

  export type ProjectCategory = {
    label: string;
    items: Project[];
    type: 'category';
  };

  export type LandingPageProjectCategoriesProps = {
    label: string;
    items: ProjectCategory[];
    type: 'category';
  };

  export default function LandingPageProjectCategories(
    props: LandingPageProjectCategoriesProps,
  ): JSX.Element;
}

declare module '@theme/LandingPageAnnouncementItem' {
  export type LandingPageAnnouncementItemProps = {
    title: string;
    description: string;
    actionLabel?: string;
    href?: string;
  };

  export default function LandingPageAnnouncementItem(
    props: LandingPageAnnouncementItemProps,
  ): JSX.Element;
}

declare module '@theme/LandingPageAnnouncements' {
  export type LandingPageAnnouncementsProps = {
    announcements?: import('@theme/LandingPageAnnouncementItem').LandingPageAnnouncementItemProps[];
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

declare module '@theme/LandingPageFocusAreaItem' {
  export type LandingPageFocusAreaItemProps = {
    title: string;
    description: string;
    illustration: import('@cbhq/cds-common').IllustrationNames;
    actionLabel: string;
    href: string;
  };

  export default function LandingPageFocusAreaItem(
    props: LandingPageFocusAreaItemProps,
  ): JSX.Element;
}

declare module '@theme/LandingPageFocusAreas' {
  export type LandingPageFocusAreasProps = {
    focusAreas?: import('@theme/LandingPageFocusAreaItem').LandingPageFocusAreaItemProps[];
  };

  export default function LandingPageFocusAreas(props: LandingPageFocusAreasProps): JSX.Element;
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
  type ProcessedPropItem = import('@cbhq/docusaurus-plugin-docgen').ProcessedPropItem;
  type SharedTypeAliases = import('@cbhq/docusaurus-plugin-docgen').SharedTypeAliases;
  export type TypeAliasModalContentProps = {
    typeAlias: string;
  };

  export type PropsTableRowProps = {
    prop: ProcessedPropItem;
    sharedTypeAliases: SharedTypeAliases;
  };

  export default function PropsTableRow(props: PropsTableRowProps): JSX.Element;
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

declare module '@theme/TOCManager' {
  export const useTOC: typeof import('@theme/createTOCManager').useTOC;
  export const TOCProvider: typeof import('@theme/createTOCManager').TOCProvider;
  export const TOCUpdater: typeof import('@theme/createTOCManager').TOCUpdater;
}

/* -------------------------------------------------------------------------- */
/*                                    Misc                                    */
/* -------------------------------------------------------------------------- */

declare module '@theme/ExampleWithThemeToggles' {
  export type ExampleWithThemeTogglesProps = {
    children?: import('react').ReactNode;
  };

  export default function ExampleWithThemeToggles(props: ExampleWithThemeTogglesProps): JSX.Element;
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
  type LinkProps = import('@cbhq/cds-web/typography/Link').LinkProps;

  export type ModalLinkProps = {
    children: string;
    content: React.ReactNode;
  } & LinkProps;

  export default function ModalLink(props: ModalLinkProps): JSX.Element;
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
