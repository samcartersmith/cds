import { joinPathFragments, ProjectConfiguration, readJson, Tree } from '@nrwl/devkit';
import type { PackageJson } from 'type-fest';

const mobilePackage = '@cbhq/cds-mobile';
const webPackage = '@cbhq/cds-web';
const commonPackage = '@cbhq/cds-common';
const lottieFilesPackage = '@cbhq/cds-lottie-files';
const depsToCheck = [webPackage, mobilePackage, commonPackage, lottieFilesPackage];
export type CdsPackages = (typeof depsToCheck)[number];

type Params = {
  packageName: CdsPackages;
  tree: Tree;
  project?: ProjectConfiguration;
  checkRoot?: boolean;
};

/**
 * Checks if the project uses a specified CDS package as a dependency
 * @param packageName - The name of the CDS package you are looking for, eg: @cbhq/cds-web
 * @param tree - The NX @nrwl/devkit tree that gets passed to a generator
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
      return deps ? deps.some((key: CdsPackages) => key === packageName) : false;
    }
  }
  return false;
}
