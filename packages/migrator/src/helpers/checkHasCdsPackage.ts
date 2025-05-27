import { joinPathFragments, ProjectConfiguration, readJson, Tree } from '@nx/devkit';
import type { PackageJson } from 'type-fest';

import { PackageName } from './types';

type Params = {
  packageName: PackageName;
  tree: Tree;
  project?: ProjectConfiguration;
  checkRoot?: boolean;
};

/**
 * Checks if the project uses a specified CDS package as a dependency
 * @param packageName - The name of the CDS package you are looking for, eg: @cbhq/cds-web
 * @param tree - The NX @nx/devkit tree that gets passed to a generator
 * @param project - The project configuration
 * @returns boolean
 */
export function checkHasCdsPackage({ packageName, tree, project, checkRoot }: Params): boolean {
  const packageJsonPath =
    !checkRoot && project ? joinPathFragments(project.root, `package.json`) : `package.json`;

  if (tree.isFile(packageJsonPath)) {
    const pkg = readJson<PackageJson>(tree, packageJsonPath);

    if (pkg.dependencies) {
      const deps: string[] = [...Object.keys(pkg.dependencies)];
      if (pkg.peerDependencies) {
        deps.push(...Object.keys(pkg.peerDependencies));
      }
      return deps ? deps.some((key) => key === packageName) : false;
    }
  }
  return false;
}
