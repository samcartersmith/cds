import { addDependenciesToPackageJson, getProjects, output, Tree, updateJson } from '@nrwl/devkit';

import { CdsDependencyCheck, checkHasCdsDependency } from './checkHasCdsDependency';
import { logDebug } from './loggingHelpers';

const packageNames = ['mobile', 'web', 'common', 'lottie-files'] as const;
type PackageName = (typeof packageNames)[number];
type PackageVersionType = Record<string, string>;
type DepsToAddMap = Record<PackageName, PackageVersionType>;
type DepType = 'deps' | 'devDeps' | 'peerDeps';

function updateDeps(
  depCheck: CdsDependencyCheck,
  pkg: keyof DepsToAddMap,
  onComplete: (type: DepType, val?: Record<string, string>) => void,
  depsToAddMap: DepsToAddMap,
) {
  const { dependencies, devDependencies, peerDependencies } = depCheck;

  if (dependencies?.[pkg]) {
    onComplete('deps', depsToAddMap[pkg]);
  }

  if (devDependencies?.[pkg]) {
    onComplete('devDeps', depsToAddMap[pkg]);
  }

  if (peerDependencies?.[pkg]) {
    onComplete('peerDeps', depsToAddMap[pkg]);
  }
}

function updatePeerDependencies(
  tree: Tree,
  depsToAdd: Partial<DepsToAddMap>,
  pathToProject?: string,
) {
  updateJson(tree, `${pathToProject}/package.json`, (json) => {
    Object.entries(depsToAdd).forEach(([pkg, version]) => {
      if (json.peerDependencies?.[pkg]) {
        // eslint-disable-next-line no-param-reassign
        json.peerDependencies[pkg] = version;
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return json;
  });
}

export async function upgradeCdsPackages(tree: Tree, depsToAddMap: DepsToAddMap) {
  logDebug('Upgrading necessary CDS dependencies');

  const projects = getProjects(tree);
  const packageJsonsWithUpdates: string[] = [];

  projects.forEach((project) => {
    const depCheck = checkHasCdsDependency(tree, project);
    let depsToAdd: Partial<DepsToAddMap> = {};
    let devDepsToAdd: Partial<DepsToAddMap> = {};
    let peerDepsToAdd: Partial<DepsToAddMap> = {};
    let hasUpdates = false;

    function onDepCheckComplete(type: DepType, val?: Record<string, string>) {
      if (val) {
        hasUpdates = true;
      }
      switch (type) {
        case 'deps':
          depsToAdd = {
            ...depsToAdd,
            ...val,
          };
          break;
        case 'devDeps':
          devDepsToAdd = {
            ...devDepsToAdd,
            ...val,
          };
          break;
        case 'peerDeps':
          peerDepsToAdd = {
            ...peerDepsToAdd,
            ...val,
          };
          break;
        default:
          break;
      }
    }

    packageNames.forEach((pkg) => updateDeps(depCheck, pkg, onDepCheckComplete, depsToAddMap));

    if (hasUpdates) {
      const { packageJsonPath } = depCheck;
      // casting because addDependenciesToPackageJson expects a less specific type
      addDependenciesToPackageJson(
        tree,
        depsToAdd as Record<string, string>,
        devDepsToAdd as Record<string, string>,
        packageJsonPath,
      );
      if (peerDepsToAdd) {
        updatePeerDependencies(tree, peerDepsToAdd, project.root);
      }
      packageJsonsWithUpdates.push(packageJsonPath);
    }
  });

  if (packageJsonsWithUpdates.length) {
    output.success({
      title: `Upgraded CDS dependencies in the following files:`,
      bodyLines: packageJsonsWithUpdates,
    });
  } else {
    output.error({
      title: `Unable to find any projects consuming CDS packages.`,
      bodyLines: [
        `Ensure this generator is being run within an nx workspace.`,
        `As a workaround you can add @cbhq/cds-web or @cbhq/cds-mobile to the dependencies or devDependencies of the package.json for the projects you want to run the codemod in.`,
      ],
    });
  }
}
