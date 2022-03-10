import * as ts from 'typescript';

import type { AdoptionStats } from './utils/getStats';

export type ObjectString = Record<string, string>;
export type TSAliasRecord = ObjectString;

export type TSConfig = {
  compilerOptions: {
    paths: TSAliasRecord;
  };
};

export type PackageJson = {
  dependencies: ObjectString;
};

export type File = {
  absoluteFilePath: string;
  relativeFilePath: string;
  linkToGit: string;
  sourceFile: ts.SourceFile;
};

export type ParsedFile = {
  relativeFilePath: string;
  linkToGit: string;
  styledComponents: TsStyledNode;
  components: TsJsxNode[];
  // components: Record<string, TsJsxNode[]>;
};

export type AdopterConfig = {
  /** The absolute path for the source files to parse. */
  root: string;
  /** The github url for the projects repo. This will be used to link to source files. */
  github: string;
  /** A unique identifier for the project.  */
  id: string;
  /** A label to use when displaying metrics on website. */
  label: string;
  /** The Typescript Alias for the project (optional). */
  projectTsAliases?: string[];
  presentationalElements?: string[];
  presentationalLibraries?: string[];
  presentationalAttributes?: string[];
  cdsAliases?: string[];
  ignoreDirs?: string[];
  sourceGlob?: string;
  tsconfigFileName?: string;
  type: 'doc';
  pillar?: string;
};

export type AdoptersConfig = {
  type: 'category';
  label: string;
  collapsed: boolean;
  items: (AdopterConfig | AdoptersConfig)[];
};

export type AdopterConfigForSidebar = Extract<AdopterConfig, 'type' | 'id' | 'label'>;

export type TsStyledNode = ObjectString;
export type TSImports = ObjectString;
export type TsJsxNode = {
  name: string;
  props: string[];
  styledAlias?: string;
  importedFrom?: string;
};

export type ImportDeclaration = {
  importClause: ts.ImportClause;
  moduleSpecifier: ts.StringLiteral;
} & Omit<ts.Statement, 'importClause'>;

export type FilterFn = (item: TsJsxNode) => boolean;
export type Filters = Record<string, FilterFn>;
export type EnhanceComponentCb = (item: TsJsxNode, match: string) => TsJsxNode;
export type Enhancers = Record<string, EnhanceComponentCb>;

export type PreviousAdoptionStats = { latest: AdoptionStats; previous: AdoptionStats[] };

export type { AdoptionStats };
