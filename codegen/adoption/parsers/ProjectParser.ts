import { countBy, flattenDeep, fromPairs, map, mapValues, partition, pickBy, uniq } from 'lodash';
import path from 'path';
import ora from 'ora';
import chalk from 'chalk';
import { argv } from 'yargs';
import { getPackageJson } from '../utils/getPackageJson';
import { getTypescriptConfig } from '../utils/getTypescriptConfig';
import { getProjectFiles } from '../utils/getProjectFiles';
import { getTypescriptAliases } from '../utils/getTypescriptAliases';
import { FileParser } from './FileParser';
import { fromId, toId } from '../utils/id';

export const FALLBACK_PRESENTATIONAL_LIBRARIES = [
  '@ant-design',
  '@cb/shared',
  '@designSystem',
  '@cbhq/insto-ui-web',
  '@material-ui',
  'highcharts',
  'react-admin',
  'react-datepicker',
  'react-modal',
  'react-native-linear-gradient',
  'react-native-reanimated',
  'react-native-svg',
  'react-select',
  '@assethub/shared/components',
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

export type ProjectParserConfig = {
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
  presentationalElements?: string[];
  presentationalLibraries?: string[];
  presentationalAttributes?: string[];
  cdsAliases?: string[];
  ignoreDirs?: string[];
  sourceGlob?: string;
};

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

function generateUnionRegex(strs: string[], boundaryMatch?: boolean) {
  return new RegExp(strs.map((str) => (boundaryMatch ? `^${str}$` : str)).join('|'));
}

export class ProjectParser {
  /** The absolute path for the source files to parse. */
  root: string;

  /** The github org and repo for the project. */
  github: string;

  /** The github url for the project. This will be used to link to source files. */
  githubUrl: string;

  /** A unique identifier for the project.  */
  id: string;

  /** A label to use when displaying metrics on website. */
  label: string;

  /** The Typescript Alias for the project (optional). */
  tsAlias?: string;

  /** Array of presentational attributes to whitelist when grouping presentational components. */
  presentationalAttributes: string[];

  /** Array of presentational elements or components to whitelist when grouping presentational components. */
  presentationalElements: string[];

  /** Array of presentational libraries to whitelist when grouping presentational components. */
  presentationalLibraries: string[];

  /** Array of Components that should be grouped with CDS components. */
  cdsAliases: string[];

  /** Array of file globs to ignore when parsing files. */
  ignoreDirs: string[];

  /** Optional override of the default source glob * */
  sourceGlob: string | undefined;

  spinner!: ora.Ora;

  /** Absolute path of project. Pulled from tsAlias if project has tsconfig, otherwise falls back to root. */
  absolutePath!: string;

  /** Relative path of project. Relevant if in a monorepo with other projects. Used to generate links to source code.  */
  relativePath!: string;

  /** Dependencies object from package.json of project. Not being used currently, but useful if we want to track versioning of Coinbase packages or what external libraries teams are using. */
  dependencies!: Record<string, string>;

  /** Files to parse. */
  filePaths!: string[];

  /** Path aliases dictionary from tsconfig. Only present if tsAlias param is passed into ProjectParser. */
  tsAliases!: Record<string, string>;

  /** Path aliases dictionary from tsconfig. Only present if tsAlias param is passed into ProjectParser. */
  tsAliasesRelative!: Record<string, string>;

  /** Parsed files. The output of running FileParser on a file path. */
  files: FileParser[] = [];

  /** All styled-components generated via tagged template literal in a project. Helps determine presentational components key is the id and value is the styled tag. */
  styledComponents: Map<string, string> = new Map();

  /** All styled-components extended off some other component key is the id and value is an array of call sites. */
  extendedStyledComponents: Map<string, string[]> = new Map();

  /** All JSX components in a project */
  jsxComponents: Map<string, { callSite: string; props: string[] }[]> = new Map();

  /** Components that have a first child that is a presentational element * */
  wrappedPresentationComponents: Map<string, { path: string; presEl: string }> = new Map(); // name of component to file path

  aliasedCdsComponents: Map<string, { aliasPath: string; callSites: string[] }> = new Map(); // wrapped component name => cds import path, wrappedComponentPath, callSites of alias

  cdsToAliasMapping: Map<string, Set<string>> = new Map(); // cds id from name and import to alias name

  constructor({
    root,
    github,
    id,
    label,
    tsAlias,
    presentationalAttributes,
    presentationalElements,
    presentationalLibraries,
    cdsAliases = [],
    ignoreDirs = [],
    sourceGlob,
  }: ProjectParserConfig) {
    const [org, repo] = github.split('/');
    this.github = github;
    this.githubUrl = `https://github.cbhq.net/${org}/${repo}/tree/master`;
    this.id = id;
    this.ignoreDirs = ignoreDirs;
    this.sourceGlob = sourceGlob;
    this.label = label;
    this.tsAlias = tsAlias;
    this.cdsAliases = ['@cbhq/cds-', ...cdsAliases];
    this.presentationalAttributes = presentationalAttributes ?? FALLBACK_PRESENTATIONAL_ATTRIBUTES;
    this.presentationalElements = presentationalElements ?? FALLBACK_PRESENTATIONAL_ELEMENTS;
    this.presentationalLibraries = presentationalLibraries ?? FALLBACK_PRESENTATIONAL_LIBRARIES;
    this.root = root;
  }

  get projectInfo() {
    const { tempDir } = argv as Record<string, string>;
    return JSON.stringify({
      github: this.github,
      githubUrl: this.githubUrl,
      id: this.id,
      label: this.label,
      totalParsedFiles: this.filePaths.length,
      tsAlias: this.tsAlias,
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

    return JSON.stringify({
      cds: finalFormat(cds),
      presentational: finalFormat(presentational),
      other: finalFormat(other),
    });
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
      const tsconfig = await getTypescriptConfig(path.join(this.root, 'tsconfig.json'));
      this.dependencies = (await getPackageJson(this.root)).dependencies;
      this.root = path.resolve(this.root, tsconfig.compilerOptions.baseUrl);
      const { absoluteAliases, relativeAliases } = getTypescriptAliases(this.root, tsconfig);
      this.tsAliases = absoluteAliases;
      this.tsAliasesRelative = relativeAliases;
      // i.e. user/home/repo/eng/shared/design-system
      this.absolutePath = this.tsAlias ? this.tsAliases[this.tsAlias] : this.root;
      // i.e. eng/shared/design-system
      this.relativePath = path.relative(this.root, this.absolutePath);
      // Uses fast-glob package return an array of file paths to parse.
      this.filePaths = await getProjectFiles(this.absolutePath, this.ignoreDirs, this.sourceGlob);
      // Parse the files
      this.files = await Promise.all(
        this.filePaths.map(async (filePath) => {
          return new FileParser(this, filePath).init();
        }),
      );

      // meta needs to be done before the jsx parsing because the jsx parsing augments what is stored in meta for the project
      await Promise.all(this.files.map(async (file: FileParser) => file.parseStyle()));
      await Promise.all(this.files.map(async (file: FileParser) => file.parseWrapped()));
      await Promise.all(this.files.map(async (file: FileParser) => file.parseJsx()));

      this.spinner.stop();
      return this;
    } catch (err) {
      this.spinner.fail(`${chalk.redBright('ProjectParser.parse')} ${err?.message}`);
      return this;
    }
  }
}
