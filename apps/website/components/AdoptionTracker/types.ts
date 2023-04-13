import { adopters } from ':cds-website/data/__generated__/adoption/adopters';
import { hiddenAdopters } from ':cds-website/data/__generated__/adoption/adopters-hidden';

export type Adopters = typeof adopters | typeof hiddenAdopters;
export type Adopter = (typeof adopters)[number]['id'] | (typeof hiddenAdopters)[number]['id'];

export type AdopterProjectInfo = {
  github: string;
  githubUrl: string;
  id: Adopter;
  label: string;
  baseUrl: string;
  tsAlias?: keyof AdopterProjectInfo['tsAliases'];
  totalParsedFiles: number;
  tsAliases: Record<string, string>;
  dependencies: Record<string, string>;
};

export type AdopterStatsItem = {
  date: string;
  cdsPercent: number;
  cds: number;
  presentational: number;
  totalCdsAndPresentational: number;
  totalOther: number;
  period?: `Q${number}:${number}`;
};

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
