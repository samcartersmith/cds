import { addDependenciesToPackageJson, getProjects, Tree } from '@nrwl/devkit';

import { CdsDependencyCheck, checkHasCdsDependency } from '../../helpers/checkHasCdsDependency';
import { logError, logNote, logSuccess } from '../../helpers/loggingHelpers';

const depsToAddMap = {
  mobile: {
    '@cbhq/cds-mobile': '^4.0.0',
    '@cbhq/cds-icons': '^1.0.0',
    '@cbhq/cds-illustrations': '^1.0.0',
  },
  web: {
    '@cbhq/cds-web': '^4.0.0',
    '@cbhq/cds-icons': '^1.0.0',
    '@cbhq/cds-illustrations': '^1.0.0',
  },
  common: {
    '@cbhq/cds-common': '^4.0.0',
  },
  'lottie-files': {
    '@cbhq/cds-lottie-files': '^1.0.1',
  },
};

function updateDeps(
  depCheck: CdsDependencyCheck,
  pkg: keyof typeof depsToAddMap,
  onComplete: (type: 'deps' | 'devDeps', val?: Record<string, string>) => void,
) {
  const { dependencies, devDependencies } = depCheck;

  if (dependencies?.[pkg]) {
    onComplete('deps', depsToAddMap[pkg]);
  }

  if (devDependencies?.[pkg]) {
    onComplete('devDeps', depsToAddMap[pkg]);
  }
}

export default async function upgradeCdsPackages(tree: Tree) {
  logNote('Upgrading necessary CDS dependencies');

  const projects = getProjects(tree);
  const packageJsonsWithUpdates: string[] = [];

  projects.forEach((project) => {
    const depCheck = checkHasCdsDependency(tree, project);
    let depsToAdd: Record<string, string> = {};
    let devDepsToAdd: Record<string, string> = {};
    let hasUpdates = false;

    function onDepCheckComplete(type: 'deps' | 'devDeps', val?: Record<string, string>) {
      if (val) {
        hasUpdates = true;
      }
      if (type === 'deps') {
        depsToAdd = {
          ...depsToAdd,
          ...val,
        };
      }
      if (type === 'devDeps') {
        devDepsToAdd = {
          ...devDepsToAdd,
          ...val,
        };
      }
    }

    updateDeps(depCheck, 'lottie-files', onDepCheckComplete);
    updateDeps(depCheck, 'common', onDepCheckComplete);
    updateDeps(depCheck, 'web', onDepCheckComplete);
    updateDeps(depCheck, 'mobile', onDepCheckComplete);

    if (hasUpdates) {
      const { packageJsonPath } = depCheck;
      addDependenciesToPackageJson(tree, depsToAdd, devDepsToAdd, packageJsonPath);
      packageJsonsWithUpdates.push(packageJsonPath);
    }
  });

  if (packageJsonsWithUpdates.length) {
    logSuccess(`Upgraded CDS dependencies in the following files:`, packageJsonsWithUpdates);
  } else {
    logError(`Unable to find any projects consuming CDS packages.`, [
      `Ensure this generator is being run within an nx workspace.`,
      `As a workaround you can add @cbhq/cds-web or @cbhq/cds-mobile to the dependencies or devDependencies of the package.json for the projects you want to run the codemod in.`,
    ]);
  }
}
