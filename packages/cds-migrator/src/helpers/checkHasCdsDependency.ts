import { joinPathFragments, ProjectConfiguration, readJson, Tree } from '@nrwl/devkit';
import type { PackageJson } from 'type-fest';

const mobilePackage = '@cbhq/cds-mobile';
const webPackage = '@cbhq/cds-web';
const commonPackage = '@cbhq/cds-common';
const lottieFilesPackage = '@cbhq/cds-lottie-files';
const coreDepsToCheck = [webPackage, mobilePackage];
const depsToCheck = [webPackage, mobilePackage, commonPackage, lottieFilesPackage];

function hasCdsDep(dep: string) {
  return depsToCheck.includes(dep);
}

function hasCdsCoreDependency(dep: string) {
  return coreDepsToCheck.includes(dep);
}

export type CdsDependencyCheck = ReturnType<typeof checkHasCdsDependency>;

/**
 * Checks if the project uses a CDS package as a dependency
 * @param tree - The NX @nrwl/devkit tree that gets passed to a generator
 * @param project - The project configuration
 * @returns { hasCdsDependency: boolean, hasCoreCdsDependency: boolean, packageJsonPath: string, dependencies: Partial<Record<string, string>>, devDependencies: Partial<Record<string, string>>, peerDependencies: Partial<Record<string, string>>}
 */
export function checkHasCdsDependency(tree: Tree, project: ProjectConfiguration) {
  const packageJsonPath = joinPathFragments(project.root, `package.json`);

  let dependencies: Partial<Record<string, string>> | undefined;
  let devDependencies: Partial<Record<string, string>> | undefined;
  let peerDependencies: Partial<Record<string, string>> | undefined;
  let hasCoreDep = false;

  if (tree.isFile(packageJsonPath)) {
    const pkg = readJson<PackageJson>(tree, packageJsonPath);

    if (pkg.dependencies) {
      const depKeys = Object.keys(pkg.dependencies);
      hasCoreDep = depKeys.some(hasCdsCoreDependency);

      if (depKeys.some(hasCdsDep)) {
        dependencies = pkg.dependencies;
      }
    }

    if (pkg.devDependencies) {
      const devDepKeys = Object.keys(pkg.devDependencies);
      if (devDepKeys.some(hasCdsDep)) {
        devDependencies = pkg.devDependencies;
      }
      hasCoreDep = devDepKeys.some(hasCdsCoreDependency);
    }
    if (pkg.peerDependencies) {
      const peerDepKeys = Object.keys(pkg.peerDependencies);
      if (peerDepKeys.some(hasCdsDep)) {
        peerDependencies = pkg.peerDependencies;
      }
      hasCoreDep = peerDepKeys.some(hasCdsCoreDependency);
    }
  }

  const hasCdsDependency = Boolean(dependencies ?? devDependencies ?? peerDependencies);

  return {
    hasCdsDependency,
    hasCoreCdsDependency: hasCoreDep,
    packageJsonPath,
    dependencies: dependencies
      ? {
          mobile: dependencies[mobilePackage],
          web: dependencies[webPackage],
          common: dependencies[commonPackage],
          'lottie-files': dependencies[lottieFilesPackage],
        }
      : undefined,
    devDependencies: devDependencies
      ? {
          mobile: devDependencies[mobilePackage],
          web: devDependencies[webPackage],
          common: devDependencies[commonPackage],
          'lottie-files': devDependencies[lottieFilesPackage],
        }
      : undefined,
    peerDependencies: peerDependencies
      ? {
          mobile: peerDependencies[mobilePackage],
          web: peerDependencies[webPackage],
          common: peerDependencies[commonPackage],
          'lottie-files': peerDependencies[lottieFilesPackage],
        }
      : undefined,
  };
}
