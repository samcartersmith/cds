import { joinPathFragments, ProjectConfiguration, readJson, Tree } from '@nx/devkit';
import type { PackageJson } from 'type-fest';

import {
  commonPackage,
  iconsPackage,
  illustrationsPackage,
  lottieFilesPackage,
  mobilePackage,
  mobileVisualizationPackage,
  objectKeys,
  PackageName,
  packageNames,
  webPackage,
  webVisualizationPackage,
} from './types';

const coreDepsToCheck: PackageName[] = [webPackage, mobilePackage];

function hasCdsDep(dep: string) {
  return packageNames.includes(dep as PackageName);
}

function hasCdsCoreDependency(dep: string) {
  return coreDepsToCheck.includes(dep as PackageName);
}

export type CdsDependencyCheck = ReturnType<typeof checkHasCdsDependency>;

type Params = {
  tree: Tree;
  project?: ProjectConfiguration;
  checkRoot?: boolean;
};

type Dependencies = Partial<Record<PackageName, string>> | undefined;
export type CheckHasCdsDependencyReturnType = {
  hasCdsDependency: boolean;
  hasCoreCdsDependency: boolean;
  packageJsonPath: string;
  dependencies?: Partial<Record<PackageName, string>>;
  devDependencies?: Partial<Record<PackageName, string>>;
  peerDependencies?: Partial<Record<PackageName, string>>;
};

/**
 * Checks if the project uses a CDS package as a dependency
 * @param tree - The NX @nx/devkit tree that gets passed to a generator
 * @param project - The project configuration
 * @returns { hasCdsDependency: boolean, hasCoreCdsDependency: boolean, packageJsonPath: string, dependencies: Partial<Record<PackageName, string>>, devDependencies: Partial<Record<PackageName, string>>, peerDependencies: Partial<Record<PackageName, string>>}
 */
export function checkHasCdsDependency({
  tree,
  project,
  checkRoot,
}: Params): CheckHasCdsDependencyReturnType {
  const packageJsonPath =
    !checkRoot && project ? joinPathFragments(project.root, `package.json`) : `package.json`;

  let dependencies: Dependencies;
  let devDependencies: Dependencies;
  let peerDependencies: Dependencies;
  let hasCoreDep = false;

  if (tree.isFile(packageJsonPath)) {
    const pkg = readJson<PackageJson>(tree, packageJsonPath);

    if (pkg.dependencies) {
      const depKeys = objectKeys(pkg.dependencies);
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
          [mobilePackage]: dependencies[mobilePackage],
          [webPackage]: dependencies[webPackage],
          [commonPackage]: dependencies[commonPackage],
          [lottieFilesPackage]: dependencies[lottieFilesPackage],
          [webVisualizationPackage]: dependencies[webVisualizationPackage],
          [mobileVisualizationPackage]: dependencies[mobileVisualizationPackage],
          [illustrationsPackage]: dependencies[illustrationsPackage],
          [iconsPackage]: dependencies[iconsPackage],
        }
      : undefined,
    devDependencies: devDependencies
      ? {
          [mobilePackage]: devDependencies[mobilePackage],
          [webPackage]: devDependencies[webPackage],
          [commonPackage]: devDependencies[commonPackage],
          [lottieFilesPackage]: devDependencies[lottieFilesPackage],
          [webVisualizationPackage]: devDependencies[webVisualizationPackage],
          [mobileVisualizationPackage]: devDependencies[mobileVisualizationPackage],
          [illustrationsPackage]: devDependencies[illustrationsPackage],
          [iconsPackage]: devDependencies[iconsPackage],
        }
      : undefined,
    peerDependencies: peerDependencies
      ? {
          [mobilePackage]: peerDependencies[mobilePackage],
          [webPackage]: peerDependencies[webPackage],
          [commonPackage]: peerDependencies[commonPackage],
          [lottieFilesPackage]: peerDependencies[lottieFilesPackage],
          [webVisualizationPackage]: peerDependencies[webVisualizationPackage],
          [mobileVisualizationPackage]: peerDependencies[mobileVisualizationPackage],
          [illustrationsPackage]: peerDependencies[illustrationsPackage],
          [iconsPackage]: peerDependencies[iconsPackage],
        }
      : undefined,
  };
}
