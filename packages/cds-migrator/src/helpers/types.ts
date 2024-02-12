import { ProjectConfiguration, Tree } from '@nrwl/devkit';
import { JsxOpeningElement, JsxSelfClosingElement, SourceFile } from 'ts-morph';

export type CreateMigrationParams = {
  path: string;
  tree: Tree;
  sourceFile: SourceFile;
  projectConfig: ProjectConfiguration;
};

export type RenameMap = Record<string, string>;

export type RenameValueMapShape = {
  attribute: string;
  valueMap: RenameMap;
  paths: string[];
};

export type RenameAttributeMapShape = {
  oldAttribute: string;
  newAttribute: string;
  corePackageDependency?: string;
};

export type AttributeValueRenameMapShape = Record<string, RenameValueMapShape>;
export type AttributeRenameMapShape = Record<
  string,
  RenameAttributeMapShape | RenameAttributeMapShape[]
>;

export type JsxElementType = JsxSelfClosingElement | JsxOpeningElement;

// Makes all properties visible when hovering over the type
export type Expand<T extends Record<string, unknown>> = { [P in keyof T]: T[P] };

export type ComponentType = Extract<keyof AttributeValueRenameMapShape, string>;

export type FindReplaceCallbackParams = {
  attribute: RenameValueMapShape['attribute'];
  updateMap: RenameValueMapShape['valueMap'];
  jsx: JsxElementType;
};
export type FindReplaceCallbackReturnType = Partial<RenameMap> &
  Partial<
    Record<
      'details',
      {
        attributeToUpdate?: string;
        stringLiteral?: string;
        jsxExpressionIdentifier?: string;
      }
    >
  >;

export type PropToAttributeValue = {
  oldAttribute: string;
  newAttribute: string;
  value: string;
  paths: string[];
};
export type PropToAttributeValueMigrationShape = Record<string, PropToAttributeValue>;

export type AttributeValueToBooleanType = Record<
  string,
  {
    oldAttribute: string;
    newAttribute: string;
    path: string;
  }
>;

export const objectKeys = <Obj>(obj: { [key in keyof Obj]: Obj[key] }) =>
  Object.keys(obj) as Extract<keyof Obj, string>[];

export type ComponentMigration = {
  name: string;
  path: Record<string, string>;
  /** what component replaces it */
  replacement?: string;
  /** custom warning message to show in console and cds-migrator-output.md */
  warning?: string;
  attributeRenameMap?: RenameAttributeMapShape;
};

export type RemovedComponent = {
  name: string;
  path: string;
  /** what component replaces it */
  replacement?: string;
};

export type FunctionMigration = {
  name: string;
  path: Record<string, string>;
  /** function name that replaces it */
  replacement: string;
};

export type ParamMigration = {
  name: string;
  path: string;
  params: string[];
};

export type PathMigrations = Record<string, string>;

export type TokenMigration = {
  path: string;
  warning?: string;
};

export type ManualPropMigrationType = Record<
  string,
  {
    // Component attribute
    props: string[];
    // Prop value as object, get the keys eg: <Cell innerSpacing={{ offsetTop: 10 }} /> => ['offsetTop']
    valueKeys: string[];
  }
>;

export type DecompedMigration = {
  exports: string[];
  /** shallow directory, will check that import source includes this string */
  oldDir: string;
  /** shallow directory */
  newDir: PackageName;
};

export const mobilePackage = '@cbhq/cds-mobile';
export const webPackage = '@cbhq/cds-web';
export const commonPackage = '@cbhq/cds-common';
export const lottieFilesPackage = '@cbhq/cds-lottie-files';
export const webVisualizationPackage = '@cbhq/cds-web-visualization';
export const mobileVisualizationPackage = '@cbhq/cds-mobile-visualization';
export const iconsPackage = '@cbhq/cds-icons';
export const illustrationsPackage = '@cbhq/cds-illustrations';

export const packageNames = [
  mobilePackage,
  webPackage,
  commonPackage,
  lottieFilesPackage,
  webVisualizationPackage,
  mobileVisualizationPackage,
  iconsPackage,
  illustrationsPackage,
] as const;
export type PackageName = (typeof packageNames)[number];
export type PackageWithVersion = Record<PackageName, string>;
export type DepsToAddMap = Partial<PackageWithVersion>;
