import * as ts from 'typescript';

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

export type Config = {
  /** The absolute path for the source files to parse. */
  root: string;
  /** The github url for the projects repo. This will be used to link to source files. */
  github: string;
  /** A unique identifier for the project.  */
  id: string;
  /** A label to use when displaying metrics on website. */
  label: string;
  /** The Typescript Alias for the project (optional). */
  tsAlias?: string;
};

export type ParsedConfig = {
  files: File[];
  dependencies: ObjectString;
  tsAliases: ObjectString;
} & Config;

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
