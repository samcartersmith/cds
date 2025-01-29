import { joinPathFragments, ProjectConfiguration, readJson, Tree } from '@nx/devkit';
import type { PackageJson } from 'type-fest';

type CheckHasDependencyParams = {
  packageName: string;
  tree: Tree;
  project: ProjectConfiguration;
  /** @default dependencies */
  type?: 'dependencies' | 'devDependencies' | 'peerDependencies';
};

/**
 * Checks if the project uses a specified package as a dependency
 * @param packageName - The name of the package you are looking for, eg: @cbhq/cds-web
 * @param tree - The NX @nx/devkit tree that gets passed to a generator
 * @param project - The project configuration
 * @param type - The type of dependency. Defaults to direct 'dependencies'
 * @returns boolean
 */
export function checkHasDependency({
  packageName,
  tree,
  project,
  type = 'dependencies',
}: CheckHasDependencyParams): boolean {
  const packageJsonPath = joinPathFragments(project.root, `package.json`);

  if (tree.isFile(packageJsonPath)) {
    const pkg = readJson<PackageJson>(tree, packageJsonPath);
    const dependencies = pkg[type];

    if (dependencies) {
      const depKeys = Object.keys(dependencies);
      return depKeys ? depKeys.some((key: string) => key === packageName) : false;
    }
  }
  return false;
}
