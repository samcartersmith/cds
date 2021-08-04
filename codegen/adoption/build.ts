import chalk from 'chalk';
import glob from 'fast-glob';
import { existsSync, promises as fs } from 'fs';
import { parseAsync } from 'json2csv';
import path from 'path';
import * as ts from 'typescript';
import { argv } from 'yargs';

const root = argv.root as string;
const projects = argv.projects as string | string[];

if (!projects) {
  throw new Error('Missing directories argument needed to generate adoption results');
}

const BLACKLIST = [
  'Props',
  'Provider',
  '.',
  'Ref',
  'Suspense',
  'View',
  'WebView',
  'Boundary',
  'Fallback',
  'Route',
  'div',
];

type AdoptionObject = {
  name: string;
  occurrences: number;
  import?: string;
};

type ImportObject = {
  occurrences: number;
  path: string | undefined;
};

type ImportMap = Record<string, ImportObject>;

type ComponentMap = Record<string, AdoptionObject>;

let Imports: ImportMap = {};
let Components: ComponentMap = {};

const toCSV = async (list: ComponentMap): Promise<string> => {
  return parseAsync(Object.values(list));
};

const sortComponents = (map: ComponentMap) =>
  Object.keys(map)
    .sort((compA, compB) => map[compB].occurrences - map[compA].occurrences)
    .reduce((obj: ComponentMap, key) => {
      /* eslint-disable no-param-reassign */
      obj[key] = map[key];
      return obj;
    }, {});

const validateComponents = (map: ComponentMap) => {
  return Object.keys(map).reduce((acc: ComponentMap, prev) => {
    if (map[prev].occurrences <= 2) {
      return acc;
    }

    if (BLACKLIST.some((invalidStr) => prev.includes(invalidStr))) {
      return acc;
    }

    acc[prev] = map[prev];
    return acc;
  }, {});
};

const visitImports = (node: ts.Node) => {
  if (node === null) return;
  if (ts.isNamedImports(node)) {
    node.elements.forEach((importStatement: ts.ImportSpecifier) => {
      const fileName = importStatement.name.escapedText as string;
      if (Imports[fileName]) {
        Imports[fileName] = {
          occurrences: (Imports[fileName].occurrences += 1),
          path: node.parent.parent.moduleSpecifier.getText(),
        };
      }

      if (!Imports[fileName]) {
        Imports[fileName] = {
          occurrences: 1,
          path: node.parent.parent.moduleSpecifier.getText(),
        };
      }
    });
  }

  node.forEachChild(visitImports);
};

const generatePath = (node: ts.Node, componentName: string) => {
  // todo: handle wrapped components here - linaria, MUI etc.
  return Imports[componentName]?.path ?? 'local';
};

const visitComponents = (node: ts.Node) => {
  if (node === null) return;
  if (
    (ts.isJsxOpeningElement(node) && ts.isIdentifier(node.tagName)) ||
    (ts.isJsxSelfClosingElement(node) && ts.isIdentifier(node.tagName))
  ) {
    const componentName: string = node.tagName.escapedText as string;

    if (Components[componentName]) {
      Components[componentName] = {
        name: componentName,
        occurrences: (Components[componentName].occurrences += 1),
        import: generatePath(node, componentName),
      };
    }
    if (!Components[componentName]) {
      Components[componentName] = {
        name: componentName,
        occurrences: 1,
        import: generatePath(node, componentName),
      };
    }
  }
  node.forEachChild(visitComponents);
};

const CDSAdoption = async () => {
  const PROJECTS = Array.isArray(projects) ? projects : projects.trim().split(',');
  const PROJECT_PATHS: Record<string, string> = {
    // relative to this files path
    commerce: path.resolve(root, '../../commerce/frontend/src'),
    assethub: path.resolve(root, '../../assethub/frontend/www/src'),
    assethubAdmin: path.resolve(root, '../../assethub/frontend/admin/src'),
    prime: path.resolve(root, '../../prime/frontend/src'),
  };

  function instrument(fileName: string, sourceCode: string) {
    const sourceFile = ts.createSourceFile(fileName, sourceCode, ts.ScriptTarget.Latest, true);
    visitImports(sourceFile);
    visitComponents(sourceFile);
  }

  await Promise.all(
    PROJECTS.map(async (projectName: string) => {
      if (!PROJECT_PATHS[projectName]) {
        throw new Error(
          `Invalid project, received: ${projectName}, expected one or more of: ${JSON.stringify(
            Object.keys(PROJECT_PATHS),
          )} in the following format: projects=project1,project2,project3`,
        );
      }
      const files = await glob([
        `${PROJECT_PATHS[projectName]}/**/*.tsx`,
        `!${PROJECT_PATHS[projectName]}/*.test.tsx`,
        `${PROJECT_PATHS[projectName]}/!*.spec.tsx`,
      ]);

      await Promise.all(
        files.map(async (file) => {
          instrument(file, await fs.readFile(file, 'utf8'));
        }),
      );

      const validComponents = validateComponents(Components);
      Components = {};
      Imports = {};
      const sortedComponents = sortComponents(validComponents);
      const csv = await toCSV(sortedComponents);
      const dirPath = path.join(root, 'codegen/adoption/results', projectName);

      if (!existsSync(dirPath)) {
        await fs.mkdir(dirPath, { recursive: true });
      }

      await fs.writeFile(`${dirPath}/results.csv`, csv);
    }),
  );
  console.log(chalk.green('New Adoption Results!'));
};

CDSAdoption().catch((error) => {
  console.error(chalk.red(error));
});
