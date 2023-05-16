import { joinPathFragments, ProjectConfiguration, readJson, Tree } from '@nrwl/devkit';
import type { PackageJson } from 'type-fest';

const mobilePackage = '@cbhq/cds-mobile';
const webPackage = '@cbhq/cds-web';
const commonPackage = '@cbhq/cds-common';
const lottieFilesPackage = '@cbhq/cds-lottie-files';
const depsToCheck = [webPackage, mobilePackage, commonPackage, lottieFilesPackage];
export type CdsPackages = (typeof depsToCheck)[number];

export type CdsDependencyCheck = ReturnType<typeof checkHasCdsPackage>;

/**
 * Checks if the project uses a specified CDS package as a dependency
 * @param packageName - The name of the CDS package you are looking for, eg: @cbhq/cds-web
 * @param tree - The NX @nrwl/devkit tree that gets passed to a generator
 * @param project - The project configuration
 * @returns boolean
 */
export function checkHasCdsPackage(
  packageName: CdsPackages,
  tree: Tree,
  project: ProjectConfiguration,
): boolean {
  const packageJsonPath = joinPathFragments(project.root, `package.json`);

  if (tree.isFile(packageJsonPath)) {
    const pkg = readJson<PackageJson>(tree, packageJsonPath);

    if (pkg.dependencies) {
      const depKeys = Object.keys(pkg.dependencies);
      return depKeys ? depKeys.some((key: CdsPackages) => key === packageName) : false;
    }
  }
  return false;
}
