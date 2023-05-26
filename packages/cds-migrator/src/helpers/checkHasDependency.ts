import { joinPathFragments, ProjectConfiguration, readJson, Tree } from '@nrwl/devkit';
import type { PackageJson } from 'type-fest';

/**
 * Checks if the project uses a specified package as a dependency
 * @param packageName - The name of the package you are looking for, eg: @cbhq/cds-web
 * @param tree - The NX @nrwl/devkit tree that gets passed to a generator
 * @param project - The project configuration
 * @returns boolean
 */
export function checkHasDependency(
  packageName: string,
  tree: Tree,
  project: ProjectConfiguration,
): boolean {
  const packageJsonPath = joinPathFragments(project.root, `package.json`);

  if (tree.isFile(packageJsonPath)) {
    const pkg = readJson<PackageJson>(tree, packageJsonPath);

    if (pkg.dependencies) {
      const depKeys = Object.keys(pkg.dependencies);
      return depKeys ? depKeys.some((key: string) => key === packageName) : false;
    }
  }
  return false;
}
