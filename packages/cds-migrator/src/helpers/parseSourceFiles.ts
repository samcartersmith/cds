import { getProjects, joinPathFragments, ProjectConfiguration, Tree } from '@nrwl/devkit';
import glob from 'fast-glob';
import fs from 'node:fs';
import { Project } from 'ts-morph';

import { checkHasCdsDependency } from './checkHasCdsDependency';

export type TransformFnType = {
  path: string;
  tree: Tree;
  project: Project;
  projectConfig: ProjectConfiguration;
};

/**
 * This is a faster way of getting project `sourceFiles` using fast-glob and nx devkit utils
 * Pulls `sourceFiles` from projects that have CDS package(s) as dependency
 * and are Typescript projects
 * Passes the absolute path, tree, and project of each sourceFile to the @transformFn
 * @param tree - The NX @nrwl/devkit tree that gets passed to a generator
 * @param transformFn - The function that will be called for each sourceFile. Passes through the NX tree, ts-morph Project instance, and NX project configuration
 * @filterSourceFiles - Parses sourceFiles that meet a conditional
 */
export default async function parseSourceFiles(
  tree: Tree,
  transformFn: (params: TransformFnType) => void,
  filterSourceFiles?: (path: string) => boolean,
) {
  const projects = getProjects(tree);

  await Promise.all(
    [...projects.values()].map(async (projectConfig) => {
      const { hasCdsDependency } = checkHasCdsDependency(tree, projectConfig);
      const tsConfigFilePath = joinPathFragments(tree.root, projectConfig.root, 'tsconfig.json');

      if (fs.existsSync(tsConfigFilePath) && hasCdsDependency) {
        /** https://ts-morph.com/ */
        /** https://ts-ast-viewer.com/ */
        const project = new Project({
          skipAddingFilesFromTsConfig: true,
          useInMemoryFileSystem: true,
        });

        const cwd = joinPathFragments(tree.root, projectConfig.sourceRoot ?? projectConfig.root);

        const sourceFiles = await glob(['**/*.tsx', '**/*.ts'], {
          ignore: ['node_modules'],
          onlyFiles: true,
          cwd,
          // Return the absolute path for entries.
          absolute: true,
        });

        sourceFiles.forEach((path) => {
          if (!filterSourceFiles || filterSourceFiles?.(path)) {
            transformFn({ path, tree, project, projectConfig });
          }
        });
      }

      return null;
    }),
  );
}
