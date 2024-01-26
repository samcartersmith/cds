import { getProjects, joinPathFragments, Tree } from '@nrwl/devkit';
import chalk from 'chalk';
import progress from 'cli-progress';
import glob from 'fast-glob';
import fs from 'node:fs';
import { Project } from 'ts-morph';

import { checkHasCdsDependency } from './checkHasCdsDependency';
import { checkHasCdsPackage } from './checkHasCdsPackage';
import { CreateMigrationParams, PackageName } from './types';

/**
 * This is a faster way of getting project `sourceFiles` using fast-glob and nx devkit utils
 * Pulls `sourceFiles` from projects that have CDS package(s) as dependency
 * and are Typescript projects
 * Passes the absolute path, tree, and project of each sourceFile to the @transformFn
 * @param tree - The NX @nrwl/devkit tree that gets passed to a generator
 * @param transformFn - The function that will be called for each sourceFile. Passes through the NX tree and ts-morph sourceFile
 * @param filterSourceFiles - Parses sourceFiles that meet a conditional
 * @param packageNames - Checks if a project has specific CDS package(s) as a dependency
 */
export async function parseSourceFiles(
  tree: Tree,
  transformFn: (params: CreateMigrationParams) => void,
  filterSourceFiles?: (path: string) => boolean,
  packageNames?: PackageName[],
  onlyTestFiles?: boolean,
) {
  const projects = getProjects(tree);

  await Promise.all(
    [...projects.values()].map(async (projectConfig) => {
      let projectHasCdsDependency = false;
      if (packageNames?.length) {
        projectHasCdsDependency = packageNames?.some((pkg) =>
          checkHasCdsPackage({ packageName: pkg, tree, project: projectConfig }),
        );
      } else {
        const { hasCdsDependency } = checkHasCdsDependency({ tree, project: projectConfig });
        if (hasCdsDependency) {
          projectHasCdsDependency = true;
        }
      }
      const tsConfigFilePath = joinPathFragments(tree.root, projectConfig.root, 'tsconfig.json');

      if (fs.existsSync(tsConfigFilePath) && projectHasCdsDependency) {
        /** https://ts-morph.com/ */
        /** https://ts-ast-viewer.com/ */
        const project = new Project({
          skipAddingFilesFromTsConfig: true,
          useInMemoryFileSystem: true,
        });

        const cwd = joinPathFragments(tree.root, projectConfig.sourceRoot ?? projectConfig.root);

        const sourceFiles = await glob(
          onlyTestFiles ? ['**/*.test.tsx', '**/*.test.ts'] : ['**/*.tsx', '**/*.ts'],
          {
            ignore: ['node_modules'],
            onlyFiles: true,
            cwd,
            // Return the absolute path for entries.
            absolute: true,
          },
        );

        const bar = new progress.SingleBar(
          {
            format: `${chalk.cyan(
              '{bar}',
            )}| {percentage}% || {value}/{total} files parsed in ${chalk.cyanBright(
              projectConfig.name,
            )} || time elapsed: {duration_formatted}`,
            barCompleteChar: '\u2588',
            barIncompleteChar: '\u2591',
            hideCursor: true,
          },
          progress.Presets.shades_classic,
        );
        bar.start(sourceFiles.length, 0);

        const numFilteredFiles: string[] = [];
        sourceFiles.forEach((path) => {
          bar.increment();

          // only fire the transform function if the file meets the filter conditional or if there's no filter
          if (!filterSourceFiles || filterSourceFiles?.(path)) {
            // increment the progress bar
            numFilteredFiles.push(path);

            // add the file to the ts-morph project instance
            const sourceContent = fs.readFileSync(path, 'utf-8');
            // we want to always overwrite this to ensure if there are multiple scripts updating a single file the subsequent scripts will have the latest changes
            const sourceFile = project.createSourceFile(path, sourceContent, {
              overwrite: true,
            });

            transformFn({ path, tree, sourceFile, projectConfig });
          }
        });

        bar.stop();
      }

      return null;
    }),
  );
}
