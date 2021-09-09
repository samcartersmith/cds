export type AdopterProjectInfo = {
  github: string;
  githubUrl: string;
  id: string;
  label: string;
  baseUrl: string;
  tsAlias?: keyof AdopterProjectInfo['tsAliases'];
  totalParsedFiles: number;
  tsAliases: Record<string, string>;
  dependencies: Record<string, string>;
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
};

export type DetailsObject = { title: string; details: Details };
export type Details = string | string[] | DetailsObject | DetailsObject[];
