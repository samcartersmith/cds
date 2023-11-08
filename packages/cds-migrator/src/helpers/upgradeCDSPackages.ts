import { addDependenciesToPackageJson, getProjects, output, Tree, updateJson } from '@nrwl/devkit';

import { CdsDependencyCheck, checkHasCdsDependency } from './checkHasCdsDependency';
import { logDebug } from './loggingHelpers';

const packageNames = [
  'mobile',
  'web',
  'common',
  'lottie-files',
  'cds-web-overlays',
  'cds-mobile-visualization',
  'cds-web-visualization',
] as const;
type PackageName = (typeof packageNames)[number];
type PackageVersionType = Record<string, string>;
type DepsToAddMap = Partial<Record<PackageName, PackageVersionType>>;
type DepType = 'deps' | 'devDeps' | 'peerDeps';

export function updatePeerDependencies(
  tree: Tree,
  depsToAdd: Partial<DepsToAddMap>,
  pathToPackageJson?: string,
) {
  const packageJsonPath = pathToPackageJson || 'package.json';
  updateJson(tree, packageJsonPath, (json) => {
    Object.entries(depsToAdd).forEach(([pkg, version]) => {
      // eslint-disable-next-line no-param-reassign
      json.peerDependencies[pkg] = version;
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return json;
  });
}

type DepCheckReturnType = {
  depsToAdd: Partial<DepsToAddMap>;
  devDepsToAdd: Partial<DepsToAddMap>;
  peerDepsToAdd: Partial<DepsToAddMap>;
  hasUpdates: boolean;
};

function updateDeps(
  depCheck: CdsDependencyCheck,
  pkg: keyof DepsToAddMap,
  onComplete: (type: DepType, val?: Record<string, string>) => DepCheckReturnType,
  depsToAddMap: DepsToAddMap,
) {
  const { dependencies, devDependencies, peerDependencies } = depCheck;

  if (dependencies?.[pkg]) {
    return onComplete('deps', depsToAddMap[pkg]);
  }

  if (devDependencies?.[pkg]) {
    return onComplete('devDeps', depsToAddMap[pkg]);
  }

  if (peerDependencies?.[pkg]) {
    return onComplete('peerDeps', depsToAddMap[pkg]);
  }

  return {
    depsToAdd: {},
    devDepsToAdd: {},
    peerDepsToAdd: {},
    hasUpdates: false,
  };
}

function onDepCheckComplete(type: DepType, val?: Record<string, string>): DepCheckReturnType {
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
        const { packageJsonPath } = rootDepCheck;
        // casting because addDependenciesToPackageJson expects a less specific type
        addDependenciesToPackageJson(
          tree,
          depsToAdd as Record<string, string>,
          devDepsToAdd as Record<string, string>,
          packageJsonPath,
        );
        if (peerDepsToAdd) {
          updatePeerDependencies(tree, peerDepsToAdd);
        }
        if (!packageJsonsWithUpdates.includes(packageJsonPath)) {
          packageJsonsWithUpdates.push(packageJsonPath);
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
