import glob from 'fast-glob';
import fs from 'fs';
import groupBy from 'lodash/groupBy';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import startCase from 'lodash/startCase';
import uniqBy from 'lodash/uniqBy';
import path from 'path';

import { getPackageJsonFromTsconfig } from '../utils/getPackageJsonFromTsconfig';
import { logger } from '../utils/logger';

import { docgenParser, sharedParentTypesCache, sharedTypeAliasesCache } from './docgenParser';
import type { WriteFileConfig } from './docgenWriter';
import type { DocgenPluginOptions, ProcessedDoc } from './types';

type DocOutputData = {
  alias: string;
  doc: Omit<ProcessedDoc, 'example'>;
  mdxImport: { name: string; from: string };
  importBlock: { name: string; from: string };
  tab: { label: string; value: string };
};

type DocgenRunnerParams = DocgenPluginOptions & {
  alias: string;
  pluginDir: string;
};

const templatesDir = path.join(__dirname, '../templates');
const sharedTypeAliases = path.join(templatesDir, 'shared/sharedTypeAliases.ejs.t');
const sharedParentTypes = path.join(templatesDir, 'shared/sharedParentTypes.ejs.t');

const docIndex = path.join(templatesDir, 'doc/index.ejs.t');
const docItemIndex = path.join(templatesDir, 'doc-item/index.ejs.t');
const docItemApi = path.join(templatesDir, 'doc-item/api.ejs.t');
const docItemData = path.join(templatesDir, 'doc-item/data.ejs.t');
const docItemExample = path.join(templatesDir, 'doc-item/example.ejs.t');

function getTempDirForDoc({ projectDir, doc }: { projectDir: string; doc: ProcessedDoc }) {
  const relativeFilePath = doc.filePath.replace(`${path.dirname(projectDir)}/`, '');
  return relativeFilePath.replace(path.extname(relativeFilePath), '');
}

/**
 * Takes plugin config and runs docgenParser.
 * Based on parsed docs, will pass onto docgenWriter any templates we want to write to disk.
 */
export async function docgenRunner(params: DocgenRunnerParams): Promise<WriteFileConfig[]> {
  const {
    alias,
    entryPoints,
    formatPackageName,
    sourceFiles,
    docsDir,
    forceDocs,
    pluginDir,
    onProcessDoc,
  } = params;
  const filesToWriteToDisk: WriteFileConfig[] = [];
  /**
   * Associate each sourceFile to it's associated doc. Since the sourceFiles config can reference multiple packages
   * for a single doc
   * i.e. Sparkline doc - includes hooks/useSparkline (cds-common) and Sparkline component (cds-web and cds-mobile).
   *
   * We use the entryPoints to understand which projects actually have those files from config.
   * Once we glob files associated to each project level we lose the initial grouping provided to config.
   *
   * sourceFilesDocMap is meant to solve this problem.
   */
  const sourceFilesDocMap = new Map<string, string>();
  /** Save lookup map for which doc each file belonged to */
  mapValues(sourceFiles, (files, doc) => {
    files.forEach((file) => {
      sourceFilesDocMap.set(file, doc);
    });
  });

  const docs = mapValues(sourceFiles, () => new Set<DocOutputData>());

  /**
   * Use the entryPoints to understand which projects actually have the files defined in config
   * before running docgenParser.
   */
  const projects = await Promise.all(
    entryPoints.map(async (tsconfigPath) => {
      const projectDir = path.dirname(tsconfigPath);
      const files = await glob('**/*.(ts|tsx|js|jsx)', {
        onlyFiles: true,
        cwd: projectDir,
        absolute: false,
        ignore: [
          '**/__tests__',
          '**/__stories__',
          '**/*-test.*',
          '**/*.fixture.*',
          '**/*.test.*',
          '**/*.spec.*',
          '**/*.d.ts',
          '**/*.stories.*',
          '**/index.ts',
          'node_modules',
        ],
      });
      return {
        tsconfigPath,
        projectDir,
        files,
      };
    }),
  );

  projects.forEach(({ tsconfigPath, projectDir, files }) => {
    const { name: packageNameWithScope = '' } = getPackageJsonFromTsconfig(tsconfigPath);
    const [maybeScope, packageNameWithoutScope = maybeScope] = packageNameWithScope.split('/');
    /**
     * If a component is associated with multiple packages, such as web and mobile, we want
     * to aggregate that information to a single doc and use mechanism like Tabs to toggle between the two.
     * This is why we need a projectName, which can just typically just be the packageNameWithoutScope.
     *
     * If there is no formatPackageName provided to config this will turn:
     *  `@cbhq/cds-web` -> `cds-web`
     */
    const projectName = formatPackageName?.(packageNameWithoutScope) ?? packageNameWithoutScope;

    docgenParser({ tsconfigPath, projectDir, files, onProcessDoc }).forEach(
      ({ example, ...doc }) => {
        /**
         * Turn absolute path of parsed doc into path relative to project.
         * This should match what was provided in config.
         * i.e. `Users/katherinemartinez/cds/packages/web/accordions/Accordion.tsx` into `web/accordions/Accordion.tsx`.
         */

        const destDir = getTempDirForDoc({ projectDir, doc });
        const [, ...destDirWithoutProjectArray] = destDir.split('/');
        const destDirWithoutProject = destDirWithoutProjectArray.join('/');

        /**
         * Format mdx partials in codegenerated docs to use uppercase format of path
         * i.e. `accordion/mobile/accordionItem.mdx` -> `MobileAccordionItem`
         */
        const mdxImportName = startCase(destDirWithoutProject).split(' ').join('');

        /**
         * Turns absolute path for .docusaurus cache into path with webpack aliass.
         * i.e. `Users/katherinemartinez/apps/website/.docusaurus/docusaurus-plugin-docgen/accordion` -> `@docgen/accordion`
         */
        const mdxImportPath = destDir.replace(pluginDir, alias);

        /** This displays the info about where to import the component or util from, with a "copy to clipboard" button */
        const importBlockFrom = path.join(packageNameWithScope, destDirWithoutProject);

        const data: DocOutputData = {
          alias,
          doc,
          importBlock: {
            name: doc.displayName,
            from: importBlockFrom.replace(path.extname(importBlockFrom), ''), // remove .tsx or .ts
          },
          /** Import info for where to access plugin data in .docusaurus cache.   */
          mdxImport: {
            name: mdxImportName,
            from: mdxImportPath,
          },
          tab: { label: projectName, value: projectName },
        };

        /** TODO: Pull codegen 2.0 into separate package and pull in here.
         * Then we can just pass in the directory and it will run codegen on all templates in directory
         * rather than having to define each separately.
         */

        /** Data from react-docgen-typescript */
        filesToWriteToDisk.push({
          data,
          dest: path.join(pluginDir, destDir, 'data.js'),
          template: docItemData,
        });

        /** MDX file with PropsTable react component. Passes in props from js file in .docusaurus cache */
        filesToWriteToDisk.push({
          data,
          dest: path.join(pluginDir, destDir, 'api.mdx'),
          template: docItemApi,
        });

        if (example) {
          filesToWriteToDisk.push({
            data: { example },
            dest: path.join(pluginDir, destDir, 'example.mdx'),
            template: docItemExample,
          });
        }

        filesToWriteToDisk.push({
          data,
          dest: path.join(pluginDir, destDir, 'index.mdx'),
          template: docItemIndex,
        });
      },
    );
  });

  logger.preppingData();

  if (docsDir) {
    Object.entries(docs).forEach(([doc, allDocs]) => {
      const docsForCategory = Array.from(allDocs.values());
      const groupedItemsForCategory = groupBy(docsForCategory, 'doc.displayName');

      /** For cross-platform docs we want to display with toggle */
      const docsWithSameName = Object.entries(groupedItemsForCategory).reduce(
        (prev, [key, mdxFiles]) => {
          return [
            ...prev,
            {
              name: key,
              docs: mdxFiles,
            },
          ];
        },
        [] as { name: string; docs: DocOutputData[] }[],
      );
      if (docsDir) {
        const dest = path.join(docsDir, doc, `${doc}.mdx`);
        const addToFilesToWrite = () => {
          filesToWriteToDisk.push({
            dest,
            data: {
              doc,
              docsWithSameName,
              imports: docsForCategory.map((item) => item.mdxImport),
            },
            template: docIndex,
          });
        };

        try {
          if (fs.existsSync(dest)) {
            if ((Array.isArray(forceDocs) && forceDocs.includes(doc)) || forceDocs === true) {
              logger.forceIsTrue();
              addToFilesToWrite();
            } else {
              logger.forceIsFalse(`${docsDir}/${doc}`);
            }
          } else {
            logger.preppingDoc(doc);
            addToFilesToWrite();
          }
        } catch (err) {
          logger.preppingDoc(doc);
          addToFilesToWrite();
        }
      }
    });
  } else {
    logger.skippingDocs();
  }

  /** Output all shared parentTypes to object. We group by parent name, i.e SpacingProps
   * and transform to an object, where each prop for that parent type is defined.
   */
  const groupedObjectTypes = mapValues(
    groupBy(Array.from(sharedParentTypesCache.values()), 'parent'),
    (val) => keyBy(val, 'name'),
  );

  logger.writingData();

  return [
    ...uniqBy(filesToWriteToDisk, 'dest'),
    {
      dest: `${pluginDir}/_types/sharedParentTypes.js`,
      data: { sharedParentTypes: groupedObjectTypes },
      template: sharedParentTypes,
    },
    {
      dest: `${pluginDir}/_types/sharedTypeAliases.js`,
      data: { sharedTypeAliases: Object.fromEntries(sharedTypeAliasesCache) },
      template: sharedTypeAliases,
    },
  ];
}
