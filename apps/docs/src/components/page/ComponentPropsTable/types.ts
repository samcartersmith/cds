import {
  ProcessedPropItem,
  SharedParentTypes,
  SharedTypeAliases,
} from '@cbhq/docusaurus-plugin-docgen';

type ParentTypes = import('@cbhq/docusaurus-plugin-docgen').ProcessedDoc['parentTypes'];

export type PropsTableProps = {
  props: ProcessedPropItem[];
  sharedTypeAliases: SharedTypeAliases;
  searchTerm?: string;
};

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
