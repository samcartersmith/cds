import { countBy, flattenDeep, fromPairs, map, mapValues, partition, pickBy, uniq } from 'lodash';
import path from 'path';
import ora from 'ora';
import chalk from 'chalk';
import { argv } from 'yargs';
import { getPackageJson } from '../utils/getPackageJson';
import { getTypescriptConfig } from '../utils/getTypescriptConfig';
import { getProjectFiles } from '../utils/getProjectFiles';
import { getMatchingDirectory, getTypescriptAliases } from '../utils/getTypescriptAliases';
import { FileParser } from './FileParser';
import { fromId, toId } from '../utils/id';
import { getStats } from '../utils/getStats';
import type { AdopterConfig, AdoptionStats, PreviousAdoptionStats } from '../types';

export const FALLBACK_PRESENTATIONAL_LIBRARIES = [
  '@ant-design',
  '@cb/shared',
  '@designSystem',
  '@material-ui',
  'highcharts',
  'react-admin',
  'react-datepicker',
  'react-modal',
  'react-native-linear-gradient',
  'react-native-reanimated',
  'react-native-svg',
  'react-select',
  'antd',
];

export const FALLBACK_PRESENTATIONAL_ELEMENTS = [
  'input',
  'button',
  'select',
  'strong',
  'svg',
  'table',
  'thead',
  'tr',
  'td',
];

export const FALLBACK_PRESENTATIONAL_ATTRIBUTES = ['className', 'style', 'dangerouslySet'];

type ComponentInstance = {
  callSite: string;
  props: string[];
};

type ExtendedStyledComponent = {
  alias: string;
  callSite: string;
};

type PresentationalProp = { prop: string; callSite: string };

type PresentationalDetails = ReturnType<
  | ProjectParser['isCdsImport']
  | ProjectParser['isPresentationalElement']
  | ProjectParser['isPresentationalLibrary']
  | ProjectParser['hasExtendedStyledComponents']
  | ProjectParser['hasPresentationalProps']
  | ProjectParser['isStyledComponent']
>;

type ProjectFilePaths = {
  filePaths: string[];
  absolutePathForProject: string;
  projectTsAlias?: string;
};

function generateUnionRegex(strs: string[], boundaryMatch?: boolean) {
  return new RegExp(strs.map((str) => (boundaryMatch ? `^${str}$` : str)).join('|'));
}

export class ProjectParser {
  /** The github org and repo for the project. */
  public github: string;

  /** The absolute path for the source files to parse. */
  public root: string;

  public spinner!: ora.Ora;

  /** All styled-components generated via tagged template literal in a project. Helps determine presentational components key is the id and value is the styled tag. */
  public styledComponents: Map<string, string> = new Map();

  /** All styled-components extended off some other component key is the id and value is an array of call sites. */
  public extendedStyledComponents: Map<string, string[]> = new Map();

  /** Dependencies object from package.json of project. Not being used currently, but useful if we want to track versioning of Coinbase packages or what external libraries teams are using. */
  public dependencies!: Record<string, string>;

  /** A unique identifier for the project.  */
  public id: string;

  /** The github url for the project. This will be used to link to source files. */
  private githubUrl: string;

  /** The name of the tsconfig file with the project aliases */
  private tsconfigFileName: string;

  /** A label to use when displaying metrics on website. */
  private label: string;

  /** The Typescript Alias(es) for the project (optional). */
  private projectTsAliases?: string[];

  /** Array of presentational attributes to whitelist when grouping presentational components. */
  private presentationalAttributes: string[];

  /** Array of presentational elements or components to whitelist when grouping presentational components. */
  private presentationalElements: string[];

  /** Array of presentational libraries to whitelist when grouping presentational components. */
  private presentationalLibraries: string[];

  /** Array of Components that should be grouped with CDS components. */
  private cdsAliases: string[];

  /** Array of file globs to ignore when parsing files. */
  private ignoreDirs: string[];

  /** Optional override of the default source glob * */
  private sourceGlob: string | undefined;

  /** Path aliases dictionary from tsconfig. Only present if tsAlias param is passed into ProjectParser. */
  private tsAliases!: Record<string, string>;

  /** Path aliases dictionary from tsconfig. Only present if tsAlias param is passed into ProjectParser. */
  private tsAliasesRelative!: Record<string, string>;

  /** Parsed files. The output of running FileParser on a file path. */
  private files: FileParser[] = [];

  /** All JSX components in a project */
  private jsxComponents: Map<string, { callSite: string; props: string[] }[]> = new Map();

  /** Components that have a first child that is a presentational element * */
  private wrappedPresentationComponents: Map<string, { path: string; presEl: string }> = new Map(); // name of component to file path

  private aliasedCdsComponents: Map<string, { aliasPath: string; callSites: string[] }> = new Map(); // wrapped component name => cds import path, wrappedComponentPath, callSites of alias

  private cdsToAliasMapping: Map<string, Set<string>> = new Map(); // cds id from name and import to alias name

  private previousStats: AdoptionStats[] = [];

  private pillar: string;

  constructor(
    {
      root,
      github,
      id,
      label,
      projectTsAliases,
      presentationalAttributes,
      presentationalElements,
      presentationalLibraries,
      cdsAliases = [],
      ignoreDirs = [],
      sourceGlob,
      tsconfigFileName,
      pillar = '',
    }: AdopterConfig,
    previousStats?: PreviousAdoptionStats,
  ) {
    const [org, repo] = github.split('/');
    this.pillar = pillar;
    this.github = github;
    this.githubUrl = `https://github.cbhq.net/${org}/${repo}/tree/master`;
    this.id = id;
    this.ignoreDirs = ignoreDirs;
    this.sourceGlob = sourceGlob;
    this.label = label;
    this.projectTsAliases = projectTsAliases;
    this.cdsAliases = ['@cbhq/cds-', ...cdsAliases];
    this.presentationalAttributes = presentationalAttributes ?? FALLBACK_PRESENTATIONAL_ATTRIBUTES;
    this.presentationalElements = presentationalElements ?? FALLBACK_PRESENTATIONAL_ELEMENTS;
    this.presentationalLibraries = presentationalLibraries ?? FALLBACK_PRESENTATIONAL_LIBRARIES;
    this.root = root;
    this.tsconfigFileName = tsconfigFileName ?? 'tsconfig.json';
    if (previousStats) {
      this.previousStats = [...previousStats.previous, previousStats.latest];
    }
  }

  get projectInfo() {
    const { tempDir } = argv as Record<string, string>;
    return JSON.stringify({
      pillar: this.pillar,
      github: this.github,
      githubUrl: this.githubUrl,
      id: this.id,
      label: this.label,
      totalParsedFiles: this.files.length,
      projectTsAliases: this.projectTsAliases,
      baseUrl: path.relative(tempDir, path.resolve(this.root)),
      tsAliases: mapValues(this.tsAliasesRelative, (item) => {
        const normalizedPath = path.relative(tempDir, path.resolve(this.root, item));

        const result = normalizedPath
          .replace(this.github, '')
          // coinbase-www has weird setup where they point shared alias to a dist folder that only exists at build time.
          // we want to replace that with path in that repo so we can link to source files.
          .replace('shared/dist/', 'shared/src/')
          // React native edge case
          .replace('/.', '')
          // Remove leading slash
          .replace(/^\/+/g, '');
        return result;
      }),
      dependencies: this.dependencies,
      presentationalElements: this.presentationalElements,
      presentationalLibraries: this.presentationalLibraries,
      presentationalAttributes: this.presentationalAttributes,
      cdsAliases: this.cdsAliases,
      ignoreDirs: this.ignoreDirs,
    });
  }

  get components() {
    const formattedComponents = Array.from(this.jsxComponents.entries()).map(([id, instances]) => {
      const [name, sourceFile] = fromId(id);
      const totalInstances = instances.length;
      const callSitesArray = map(instances, 'callSite');
      const callSites = countBy(callSitesArray);
      const totalCallSites = uniq(callSitesArray).length;
      const propsArray = flattenDeep(map(instances, 'props'));
      const propsWithCallSites: Record<string, Record<string, number>> = {};
      for (const instance of instances) {
        for (const prop of instance.props) {
          const { callSite } = instance;
          const propMatch = propsWithCallSites[prop];
          const countForCallSite = propMatch?.[callSite] ?? 0;
          propsWithCallSites[prop] = { ...propMatch, [`${callSite}`]: countForCallSite + 1 };
        }
      }

      const presentationalDetails = this.getPresentationalDetails(id, instances);

      // To reduce size of the final json we only include truthy values. This is really only relevant for presentationalDetails object.
      return pickBy(
        {
          name,
          sourceFile,
          totalInstances,
          totalCallSites,
          ...presentationalDetails,
          // Exclude callSites object if callSite is the same as source file. Again, this is to optimize JSON output to be as small as possible.
          ...(totalInstances === 1 ? {} : { callSites }),
          ...(propsArray.length === 0 ? {} : { propsWithCallSites }),
        },
        Boolean,
      );
    });

    const [cds, notCds] = partition(formattedComponents, (item) => typeof item.cds === 'string');
    const [presentational, other] = partition(
      notCds,
      ({ presentationalElement, presentationalLibrary, presentationalProps, styledComponent }) =>
        [presentationalElement, presentationalLibrary, presentationalProps, styledComponent].some(
          Boolean,
        ),
    );

    function finalFormat(components: { presentationalProps?: PresentationalProp }[]) {
      return map(components, (item) => {
        // We just want to highlight which props were presentational so let's filter duplicates.
        if (Array.isArray(item?.presentationalProps)) {
          const presProps = uniq(item.presentationalProps);
          return { ...item, presentationalProps: presProps };
        }
        return item;
      });
    }
    return {
      cds: finalFormat(cds),
      presentational: finalFormat(presentational),
      other: finalFormat(other),
    };
  }

  get stats() {
    return {
      latest: getStats(this.components),
      previous: this.previousStats,
    };
  }

  isExternalLibrary(moduleName: string) {
    const names = Object.keys(this.dependencies);
    const match = moduleName.match(generateUnionRegex(names, true));
    return match ? moduleName : false;
  }

  isCdsImport(moduleName: string): ['cds', string | false] {
    const match = moduleName.match(generateUnionRegex(this.cdsAliases));
    return ['cds', match ? moduleName : false];
  }

  isPresentationalElement(
    name: string | undefined = '',
    sourceFile?: string,
  ): ['presentationalElement', string | false] {
    if (sourceFile) {
      const id = toId(name, sourceFile);

      // exact match
      if (this.wrappedPresentationComponents.has(id)) {
        return [
          'presentationalElement',
          this.wrappedPresentationComponents.get(id)?.presEl as string,
        ];
      }

      // components can be exported from an index file, this catches that case
      for (const [
        key,
        { path: pathName, presEl },
      ] of this.wrappedPresentationComponents.entries()) {
        const pathWithoutExtension = pathName.includes('.')
          ? pathName.split('.').slice(0, -1).join('.')
          : pathName;
        const sourceFileWithoutExtension = sourceFile.includes('.')
          ? sourceFile.split('.').slice(0, -1).join('.')
          : sourceFile;
        if (
          (pathWithoutExtension.startsWith(sourceFileWithoutExtension) ||
            sourceFileWithoutExtension.startsWith(pathWithoutExtension)) &&
          fromId(key)[0] === name
        ) {
          return ['presentationalElement', presEl];
        }
      }
    }

    const match = name.match(generateUnionRegex(this.presentationalElements, true));
    return ['presentationalElement', match ? name : false];
  }

  isPresentationalLibrary(moduleName: string): ['presentationalLibrary', string | false] {
    const match = moduleName.match(generateUnionRegex(this.presentationalLibraries));

    return ['presentationalLibrary', match ? moduleName : false];
  }

  hasPresentationalProps(
    instances: ComponentInstance[],
  ): ['presentationalProps', PresentationalProp[] | false] {
    const presentationalProps: PresentationalProp[] = [];
    for (const instance of instances) {
      for (const prop of instance.props) {
        if (this.isPresentationalProp(prop)) {
          presentationalProps.push({ prop, callSite: instance.callSite });
        }
      }
    }

    return ['presentationalProps', presentationalProps.length > 0 ? presentationalProps : false];
  }

  isPresentationalProp(prop: string) {
    return prop.match(generateUnionRegex(this.presentationalAttributes, true));
  }

  isStyledComponent(id: string): ['styledComponent', string | false] {
    const styled = this.styledComponents.get(id);
    return ['styledComponent', styled ?? false];
  }

  addWrappedPresentationalComponent(name: string, wrappedPath: string, presEl: string) {
    this.wrappedPresentationComponents.set(name, {
      path: wrappedPath,
      presEl,
    });
  }

  addAliasedCdsComponent(aliasName: string, aliasPath: string, cdsId: string) {
    this.aliasedCdsComponents.set(aliasName, {
      aliasPath,
      callSites: [],
    });

    const set = this.cdsToAliasMapping.get(cdsId) ?? new Set<string>();
    set.add(aliasName);

    this.cdsToAliasMapping.set(cdsId, set);
  }

  addJsxComponent(jsxId: string, sourceFile: string, props: string[]) {
    const [name] = fromId(jsxId);
    const aliasedComponent = this.aliasedCdsComponents.get(name);
    if (aliasedComponent) {
      this.aliasedCdsComponents.set(name, {
        ...aliasedComponent,
        callSites: aliasedComponent.callSites.concat([sourceFile]),
      });
    }

    const jsxComponentMatch = this.jsxComponents.get(jsxId) ?? [];
    this.jsxComponents.set(jsxId, [...jsxComponentMatch, { callSite: sourceFile, props }]);
  }

  hasExtendedStyledComponents(
    id: string,
  ): ['extendedStyledComponents', ExtendedStyledComponent[] | false] {
    const extended =
      this.extendedStyledComponents.get(id)?.map((item) => {
        const [alias, callSite] = fromId(item);
        return { alias, callSite };
      }) ?? [];
    return ['extendedStyledComponents', extended.length > 0 ? extended : false];
  }

  hasAliasedCdsComponents(id: string) {
    const cdsToAliasSet = this.cdsToAliasMapping.get(id);
    if (cdsToAliasSet) {
      const items = [];
      for (const aliasId of Array.from(cdsToAliasSet)) {
        const cdsAlias = this.aliasedCdsComponents.get(aliasId);
        if (cdsAlias) {
          items.push(cdsAlias);
        }
      }

      return ['aliasedCdsComponents', items ?? false];
    }
    return ['aliasedCdsComponents', false];
  }

  getPresentationalDetails(id: string, instances: ComponentInstance[]) {
    const [name, sourceFile] = fromId(id);
    return fromPairs([
      this.isCdsImport(sourceFile),
      this.isPresentationalElement(name, sourceFile),
      this.isPresentationalLibrary(sourceFile),
      this.hasPresentationalProps(instances),
      this.isStyledComponent(id),
      this.hasExtendedStyledComponents(id),
      this.hasAliasedCdsComponents(id),
    ]) as Record<PresentationalDetails[0], PresentationalDetails[1]>;
  }

  async parse() {
    try {
      this.spinner = ora(
        `Running CDS Adoption Tracker for ${chalk.bold.blueBright(this.id)}...`,
      ).start();
      const tsconfig = await getTypescriptConfig(path.join(this.root, this.tsconfigFileName));
      this.dependencies = (await getPackageJson(this.root)).dependencies;
      this.root = path.resolve(this.root, tsconfig.compilerOptions.baseUrl);
      const { absoluteAliases, relativeAliases } = getTypescriptAliases(this.root, tsconfig);
      this.tsAliases = absoluteAliases;
      this.tsAliasesRelative = relativeAliases;

      // absolutePathForProject - i.e. user/home/repo/eng/shared/design-system
      const projectFilePaths: ProjectFilePaths[] = [];
      if (this.projectTsAliases && this.projectTsAliases.length > 0) {
        for (const projectTsAlias of this.projectTsAliases) {
          const absolutePathForProject = getMatchingDirectory(absoluteAliases, projectTsAlias);
          if (absolutePathForProject) {
            projectFilePaths.push({
              // eslint-disable-next-line no-await-in-loop
              filePaths: await getProjectFiles(
                absolutePathForProject,
                this.ignoreDirs,
                this.sourceGlob,
              ),
              absolutePathForProject,
              projectTsAlias,
            });
          }
        }
      } else {
        projectFilePaths.push({
          filePaths: await getProjectFiles(this.root, this.ignoreDirs, this.sourceGlob),
          absolutePathForProject: this.root,
        });
      }

      // Parse the files
      const promises: Promise<FileParser>[] = [];
      projectFilePaths.forEach(({ filePaths, absolutePathForProject, projectTsAlias }) => {
        for (const filePath of filePaths) {
          promises.push(
            new FileParser(this, absolutePathForProject, filePath, projectTsAlias).init(),
          );
        }
      });

      this.files = await Promise.all(promises);

      // meta needs to be done before the jsx parsing because the jsx parsing augments what is stored in meta for the project
      await Promise.all(this.files.map(async (file: FileParser) => file.parseStyle()));
      await Promise.all(this.files.map(async (file: FileParser) => file.parseWrapped()));
      await Promise.all(this.files.map(async (file: FileParser) => file.parseJsx()));

      this.spinner.stop();
      return this;
    } catch (err) {
      if (err instanceof Error) {
        this.spinner.fail(`${chalk.redBright('ProjectParser.parse')} ${err?.message}`);
        return this;
      }

      throw err;
    }
  }
}
