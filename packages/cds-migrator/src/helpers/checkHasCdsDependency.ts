import { joinPathFragments, ProjectConfiguration, readJson, Tree } from '@nrwl/devkit';
import type { PackageJson } from 'type-fest';

const mobilePackage = '@cbhq/cds-mobile';
const webPackage = '@cbhq/cds-web';
const commonPackage = '@cbhq/cds-common';
const lottieFilesPackage = '@cbhq/cds-lottie-files';
const webVisualizationPackage = '@cbhq/cds-web-visualization';
const mobileVisualizationPackage = '@cbhq/cds-mobilbe-visualization';
const webOverlaysPackage = '@cbhq/cds-web-overlays';
const coreDepsToCheck = [webPackage, mobilePackage];
const depsToCheck = [
  webPackage,
  mobilePackage,
  commonPackage,
  lottieFilesPackage,
  webVisualizationPackage,
  mobileVisualizationPackage,
  webOverlaysPackage,
];

function hasCdsDep(dep: string) {
  return depsToCheck.includes(dep);
}

function hasCdsCoreDependency(dep: string) {
  return coreDepsToCheck.includes(dep);
}

export type CdsDependencyCheck = ReturnType<typeof checkHasCdsDependency>;

type Params = {
  tree: Tree;
  project?: ProjectConfiguration;
  checkRoot?: boolean;
};

/**
 * Checks if the project uses a CDS package as a dependency
 * @param tree - The NX @nrwl/devkit tree that gets passed to a generator
 * @param project - The project configuration
 * @returns { hasCdsDependency: boolean, hasCoreCdsDependency: boolean, packageJsonPath: string, dependencies: Partial<Record<string, string>>, devDependencies: Partial<Record<string, string>>, peerDependencies: Partial<Record<string, string>>}
 */
export function checkHasCdsDependency({ tree, project, checkRoot }: Params) {
  const packageJsonPath =
    !checkRoot && project ? joinPathFragments(project.root, `package.json`) : `package.json`;

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
          'cds-web-visualization': dependencies[webVisualizationPackage],
          'cds-mobile-visualization': dependencies[mobileVisualizationPackage],
          'cds-web-overlays': dependencies[webOverlaysPackage],
        }
      : undefined,
    devDependencies: devDependencies
      ? {
          mobile: devDependencies[mobilePackage],
          web: devDependencies[webPackage],
          common: devDependencies[commonPackage],
          'lottie-files': devDependencies[lottieFilesPackage],
          'cds-web-visualization': devDependencies[webVisualizationPackage],
          'cds-mobile-visualization': devDependencies[mobileVisualizationPackage],
          'cds-web-overlays': devDependencies[webOverlaysPackage],
        }
      : undefined,
    peerDependencies: peerDependencies
      ? {
          mobile: peerDependencies[mobilePackage],
          web: peerDependencies[webPackage],
          common: peerDependencies[commonPackage],
          'lottie-files': peerDependencies[lottieFilesPackage],
          'cds-web-visualization': peerDependencies[webVisualizationPackage],
          'cds-mobile-visualization': peerDependencies[mobileVisualizationPackage],
          'cds-web-overlays': peerDependencies[webOverlaysPackage],
        }
      : undefined,
  };
}
