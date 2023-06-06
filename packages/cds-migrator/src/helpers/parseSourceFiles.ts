import { getProjects, joinPathFragments, Tree } from '@nrwl/devkit';
import chalk from 'chalk';
import progress from 'cli-progress';
import glob from 'fast-glob';
import fs from 'node:fs';
import { Project } from 'ts-morph';

import { checkHasCdsDependency } from './checkHasCdsDependency';
import { CdsPackages, checkHasCdsPackage } from './checkHasCdsPackage';

export type TransformFnType = {
  path: string;
  tree: Tree;
  project: Project;
};

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
export default async function parseSourceFiles(
  tree: Tree,
  transformFn: (params: TransformFnType) => void,
  filterSourceFiles?: (path: string) => boolean,
  packageNames?: CdsPackages[],
) {
  const projects = getProjects(tree);

  await Promise.all(
    [...projects.values()].map(async (project) => {
      let projectHasCdsDependency = false;
      if (packageNames?.length) {
        projectHasCdsDependency = packageNames?.some((pkg) =>
          checkHasCdsPackage(pkg, tree, project),
        );
      } else {
        const { hasCdsDependency } = checkHasCdsDependency(tree, project);
        if (hasCdsDependency) {
          projectHasCdsDependency = true;
        }
      }
      const tsConfigFilePath = joinPathFragments(tree.root, project.root, 'tsconfig.json');

      if (fs.existsSync(tsConfigFilePath) && projectHasCdsDependency) {
        /** https://ts-morph.com/ */
        /** https://ts-ast-viewer.com/ */
        const tsProject = new Project({
          skipAddingFilesFromTsConfig: true,
          useInMemoryFileSystem: true,
        });

        const cwd = joinPathFragments(tree.root, project.sourceRoot ?? project.root);

        const sourceFiles = await glob(['**/*.tsx', '**/*.ts'], {
          ignore: ['node_modules'],
          onlyFiles: true,
          cwd,
          // Return the absolute path for entries.
          absolute: true,
        });

        const bar = new progress.SingleBar(
          {
            format: `${chalk.cyan(
              '{bar}',
            )}| {percentage}% || {value}/{total} files parsed in ${chalk.cyanBright(
              project.name,
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
          if (filterSourceFiles) {
            if (filterSourceFiles?.(path)) {
              numFilteredFiles.push(path);
              transformFn({ path, tree, project: tsProject });
            }
          } else {
            transformFn({ path, tree, project: tsProject });
          }
        });

        bar.stop();
      }

      return null;
    }),
  );
}
