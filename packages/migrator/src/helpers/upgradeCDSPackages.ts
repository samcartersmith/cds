import { getProjects, output, Tree, updateJson } from '@nx/devkit';
import semver from 'semver';

import { CdsDependencyCheck, checkHasCdsDependency } from './checkHasCdsDependency';
import { logDebug } from './loggingHelpers';
import { DepsToAddMap, PackageName, packageNames, PackageWithVersion } from './types';

export function checkRequiresUpgrade(currVersion: string, newVersion: string) {
  // Skip update if the installed version is '*'
  if (currVersion === '*') return;

  // parse the current version and compare to the incoming version to see if we need to update
  // Remove any non-numeric version prefixes (like '^' or '~')
  const cleanCurrentVersion = currVersion.replace(/^[^0-9]+/, '');
  const cleanIncomingVersion = newVersion.replace(/^[^0-9]+/, '');

  return semver.gt(cleanIncomingVersion, cleanCurrentVersion);
}

/** the version from NX devkit does not work in some consumers, so recreated */
export function addDependenciesToPackageJson(
  tree: Tree,
  depsToAdd: Partial<DepsToAddMap>,
  pathToPackageJson?: string,
  type: 'dependencies' | 'devDependencies' | 'peerDependencies' = 'dependencies',
) {
  const packageJsonPath = pathToPackageJson || 'package.json';
  updateJson(tree, packageJsonPath, (json) => {
    Object.entries(depsToAdd).forEach(([pkg, version]) => {
      const currVersion = json[type][pkg] as string;
      if (currVersion && version) {
        if (checkRequiresUpgrade(currVersion, version)) {
          json[type][pkg] = version;
        }
      }
    });

    return json;
  });
}

type DepCheckReturnType = {
  depsToAdd: Partial<DepsToAddMap>;
  devDepsToAdd: Partial<DepsToAddMap>;
  peerDepsToAdd: Partial<DepsToAddMap>;
  hasUpdates: boolean;
};

type DepType = 'deps' | 'devDeps' | 'peerDeps';

function updateDeps(
  depCheck: CdsDependencyCheck,
  pkg: PackageName,
  onComplete: (type: DepType, val?: Partial<PackageWithVersion>) => DepCheckReturnType,
  depsToAddMap: DepsToAddMap,
) {
  const { dependencies, devDependencies, peerDependencies } = depCheck;
  const val: Partial<PackageWithVersion> = { [pkg]: depsToAddMap[pkg] };

  if (dependencies?.[pkg]) {
    return onComplete('deps', val);
  }

  if (devDependencies?.[pkg]) {
    return onComplete('devDeps', val);
  }

  if (peerDependencies?.[pkg]) {
    return onComplete('peerDeps', val);
  }

  return {
    depsToAdd: {},
    devDepsToAdd: {},
    peerDepsToAdd: {},
    hasUpdates: false,
  };
}

function onDepCheckComplete(type: DepType, val?: Partial<PackageWithVersion>): DepCheckReturnType {
  let depsToAdd: Partial<DepsToAddMap> = {};
  let devDepsToAdd: Partial<DepsToAddMap> = {};
  let peerDepsToAdd: Partial<DepsToAddMap> = {};
  let hasUpdates = false;

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

  return {
    depsToAdd,
    devDepsToAdd,
    peerDepsToAdd,
    hasUpdates,
  };
}

/**
 * Given a map of packages + versions this script will check all projects in the workspace for the packages (regardless of type of dependency) and upgrade them in place if found.
 * @param tree
 * @param depsToAddMap
 */
export async function upgradeCdsPackages(tree: Tree, depsToAddMap: DepsToAddMap) {
  logDebug('Upgrading necessary CDS dependencies');

  const projects = getProjects(tree);
  const packageJsonsWithUpdates: string[] = [];

  const rootDepCheck = checkHasCdsDependency({
    tree,
    checkRoot: true,
  });

  if (rootDepCheck.hasCdsDependency) {
    packageNames.forEach((pkg) => {
      const { depsToAdd, devDepsToAdd, peerDepsToAdd, hasUpdates } = updateDeps(
        rootDepCheck,
        pkg,
        onDepCheckComplete,
        depsToAddMap,
      );
      if (hasUpdates) {
        const { packageJsonPath: rootPackageJsonPath } = rootDepCheck;
        if (depsToAdd) {
          addDependenciesToPackageJson(tree, depsToAdd, rootPackageJsonPath);
        }
        if (devDepsToAdd) {
          addDependenciesToPackageJson(tree, devDepsToAdd, rootPackageJsonPath, 'devDependencies');
        }
        if (peerDepsToAdd) {
          addDependenciesToPackageJson(
            tree,
            peerDepsToAdd,
            rootPackageJsonPath,
            'peerDependencies',
          );
        }
        if (!packageJsonsWithUpdates.includes(rootPackageJsonPath)) {
          packageJsonsWithUpdates.push(rootPackageJsonPath);
        }
      }
    });
  }

  projects.forEach((project) => {
    const depCheck = checkHasCdsDependency({ tree, project });
    if (depCheck.hasCdsDependency) {
      packageNames.forEach((pkg) => {
        const { depsToAdd, devDepsToAdd, peerDepsToAdd, hasUpdates } = updateDeps(
          depCheck,
          pkg,
          onDepCheckComplete,
          depsToAddMap,
        );
        if (hasUpdates) {
          const { packageJsonPath } = depCheck;
          if (depsToAdd) {
            addDependenciesToPackageJson(tree, depsToAdd, packageJsonPath);
          }
          if (devDepsToAdd) {
            addDependenciesToPackageJson(tree, devDepsToAdd, packageJsonPath, 'devDependencies');
          }
          if (peerDepsToAdd) {
            addDependenciesToPackageJson(tree, peerDepsToAdd, packageJsonPath, 'peerDependencies');
          }
          if (!packageJsonsWithUpdates.includes(packageJsonPath)) {
            packageJsonsWithUpdates.push(packageJsonPath);
          }
        }
      });
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
