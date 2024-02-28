import * as ts from 'typescript';

import { adopters } from ':cds-website/data/__generated__/adoption/adopters';
import { hiddenAdopters } from ':cds-website/data/__generated__/adoption/adopters-hidden';

import {
  AggregatedProductComponent,
  ProductComponentConfig,
} from '../../components/AdoptionTracker/types';

import type { AdoptionStats } from './utils/getStats';

export type ObjectString = Record<string, string>;
export type TSAliasRecord = ObjectString;

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

/** Config for the data obtained from the info.json for specific project and product component */
export type ProductComponentInfo = {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
  resolutions: Record<string, string>;
};

/** Config for the data obtained from the component.json for specific project and product component */
export type ProductComponentData = {
  cds: ProductComponent[];
};

export type ProductComponent = {
  name: string;
  sourceFile: string;
} & ProductComponentConfig;

/** Component Structure for component entry from parsed json */
export type ComponentDataFromJSON = {
  component: AggregatedProductComponent;
  config: ProductComponentConfig;
};

/** JSON file format for componentPatterns.json */
export type ComponentProductJSONFile = {
  components: ComponentDataFromJSON[];
  dependencies: {
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
    peerDependencies: Record<string, string>;
    resolutions: Record<string, string>;
  };
};

export type AdopterConfig = {
  /** The absolute path for the source files to parse. */
  root: string;
  /** The github url for the projects repo. This will be used to link to source files. */
  github: string;
  /** Rest of github project path to specific project folder */
  projectGitPath: string;
  /** A unique identifier for the project.  */
  id: string;
  /** A label to use when displaying metrics on website. */
  label: string;
  /** The Typescript Alias for the project (optional). */
  projectTsAliases?: string[];
  /** Array of presentational elements or components to whitelist when grouping presentational components. */
  presentationalElements?: string[];
  /** Array of presentational libraries to whitelist when grouping presentational components. */
  presentationalLibraries?: string[];
  /** Array of presentational attributes to whitelist when grouping presentational components. */
  presentationalAttributes?: string[];
  /** Array of Components that should be grouped with CDS components. */
  cdsAliases?: string[];
  /** Array of file globs to ignore when parsing files. */
  ignoreDirs?: string[];
  /** Optional override of the default source glob * */
  sourceGlob?: string[];
  tsconfigFileName?: string;
  type: 'doc';
  pillar?: string;
  period?: string;
  /** Absolute path string for project's dependencies package.json */
  dependencyPath?: string;
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

export type FeaturedComponentsConfig = {
  cds: string[];
  presentational: string[];
  other: string[];
};

export type Adopters = typeof adopters | typeof hiddenAdopters;
export type Adopter = (typeof adopters)[number]['id'] | (typeof hiddenAdopters)[number]['id'];

export type AdopterProjectVersionSummary = {
  id: string;
  version: string;
  pillar?: string;
  upToDate: boolean;
  adopterStatsItem: AdopterStatsItem;
};

export type PillarProjectData = {
  pillar: string;
  allProjectVersions: AdopterProjectVersionSummary[];
  totalProjectsCount: number;
};

export type PillarAdoptionData = {
  pillar: string;
  cdsPercentAdoption: string;
  cdsPercentAdoptionWithinLatest3Months: string;
};

/** Stores version stats for an adopter project */
export type VersionStatsProps = {
  cdsCommonVersion: string;
  cdsWebVersion: string;
  cdsMobileVersion: string;
  cdsLatestVersion: string;
  latestCdsVersionPublished3MonthsAgo: string;
  upToDate: boolean;
};

export type VersionMap = {
  common: string;
  web: string;
  mobile: string;
};

export type AdopterStatsItem = {
  date: string;
  cdsPercent: number;
  cds: number;
  presentational: number;
  totalCdsAndPresentational: number;
  totalOther: number;
  period?: `Q${number}:${number}`;
} & VersionStatsProps;

export type AdopterStats = {
  latest: AdopterStatsItem;
  previous: AdopterStatsItem[];
};

export type ComponentData = {
  name: string;
  sourceFile: string;
  totalInstances: number;
  totalCallSites: number;
  props?: Record<string, number>;
  propsWithCallSites?: Record<string, Record<string, number>>;
  callSites?: Record<string, number>;
  cds?: string;
  presentationalElement?: string;
  presentationalProps?: { prop: string; callSite: string }[];
  styledComponent?: string;
  extendedStyledComponents?: {
    alias: string;
    callSite: string;
  }[];
  aliasedCdsComponents?: {
    aliasPath: string;
    callSites: string[];
  }[];
  isFeatured?: true;
};

export const statsFallback = {
  latest: {
    date: '',
    cdsPercent: 0,
    cds: 0,
    presentational: 0,
    totalCdsAndPresentational: 0,
    totalOther: 0,
    cdsCommonVersion: '',
    cdsWebVersion: '',
    cdsMobileVersion: '',
    cdsLatestVersion: '',
    latestCdsVersionPublished3MonthsAgo: '',
    upToDate: false,
  } as AdopterStatsItem,
  previous: [] as AdopterStatsItem[],
};
