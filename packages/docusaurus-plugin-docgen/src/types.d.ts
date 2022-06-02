/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="@docusaurus/module-type-aliases" />
/// <reference types="@docusaurus/theme-classic" />

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

declare module '@theme/ParentTypesList' {
  type ParentTypes = import('./scripts/types').ProcessedDoc['parentTypes'];
  type SharedParentTypes = import('./scripts/types').SharedParentTypes;
  type SharedTypeAliases = import('./scripts/types').SharedTypeAliases;

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

declare module '@theme/PropsTable' {
  type ProcessedPropItem = import('./scripts/types').ProcessedPropItem;
  type SharedTypeAliases = import('./scripts/types').SharedTypeAliases;

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
  type ProcessedPropItem = import('./scripts/types').ProcessedPropItem;
  type SharedTypeAliases = import('./scripts/types').SharedTypeAliases;
  export type TypeAliasModalContentProps = {
    typeAlias: string;
  };

  export type PropsTableRowProps = {
    prop: ProcessedPropItem;
    sharedTypeAliases: SharedTypeAliases;
  };

  export default function PropsTableRow(props: PropsTableRowProps): JSX.Element;
}

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
