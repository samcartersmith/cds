import { adopters } from ':cds-website/data/__generated__/adoption/adopters';
import { hiddenAdopters } from ':cds-website/data/__generated__/adoption/adopters-hidden';

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

export type AdopterProjectInfo = {
  github: string;
  githubUrl: string;
  projectGitPath: string;
  id: Adopter;
  label: string;
  baseUrl: string;
  tsAlias?: keyof AdopterProjectInfo['tsAliases'];
  totalParsedFiles: number;
  tsAliases: Record<string, string>;
  dependencies: Record<string, string>;
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

export type VersionInfoProps = {
  name: string;
  version: string | null;
  tagLabel?: string;
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

export type AdopterComponents = {
  cds: ComponentData[];
  presentational: ComponentData[];
  other: ComponentData[];
};

export type AdopterData = AdopterProjectInfo & AdopterComponents;

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

export type AdopterTabKey = 'cds' | 'presentational' | 'other' | 'okr';

export type AdopterSearchResultType = 'component' | 'prop';
export type AdopterSearchResult = {
  type: AdopterSearchResultType;
  val: string;
};

export type DetailsObject = { title: string; details: Details };
export type Details = string | string[] | DetailsObject | DetailsObject[];

export type SummaryReport = {
  companyWide: {
    cdsAdoption: string;
    latestCDSAdoption: string;
    getPercentageChangeAll?: string;
    getPercentageChangeLatest?: string;
  };
  [pillar: string]:
    | {
        cdsAdoption: string;
        latestCDSAdoption: string;
        getPercentageChangeAll?: string;
        getPercentageChangeLatest?: string;
      }
    | undefined;
};

export type OverallSummaryStats = {
  date: string;
  summaryReport: SummaryReport;
  totalProjectVersionsList: PillarProjectData[];
};

/** Aggregated Summary for Pattern Component  */
export type PatternComponentSummary = {
  totalInstances: number;
  totalCallSites: number;
  components: AggregatedPatternComponent[];
  config: PatternComponentConfig;
  cdsVersion?: CDSVersionsResult;
};

/** Structure for Aggregated Pattern Component Entry */
export type AggregatedPatternComponent = {
  name: string;
  sourceFile: string;
  totalInstances: number;
  totalCallSites: number;
  propsWithCallSites: ComponentPropsWithCallSites;
  callSites?: Record<string, number>;
};

/** Config for specific Pattern Components */
export type PatternComponentConfig = {
  patternComponentName: string;
  owningTeam: string;
  packageImportPath: string;
  doc?: string;
  packagePath: string;
};

export type ComponentPropsWithCallSites = Record<string, Record<string, number>>;

export type CDSVersionsResult = {
  cdsWeb: string;
  cdsMobile: string;
  cdsCommon: string;
  lowestVersion: string;
  sanitizedLowestVersion: string;
};
