import { addDependenciesToPackageJson, getProjects, joinPathFragments, Tree } from '@nrwl/devkit';

import { CdsPackages, checkHasCdsPackage } from '../../helpers/checkHasCdsPackage';
import { logDebug, logError, logSuccess } from '../../helpers/loggingHelpers';

const depsToAddMap: Record<CdsPackages, Record<CdsPackages, string>> = {
  '@cbhq/cds-mobile': {
    '@cbhq/cds-mobile': '^5.0.0',
  },
  '@cbhq/cds-web': {
    '@cbhq/cds-web': '^5.0.0',
  },
  '@cbhq/cds-common': {
    '@cbhq/cds-common': '^5.0.0',
  },
};

export default async function upgradePackages(tree: Tree) {
  logDebug('Upgrading CDS packages to version 5');

  const projects = getProjects(tree);
  const packageJsonsWithUpdates: string[] = [];

  projects.forEach((project) => {
    Object.keys(depsToAddMap).forEach((packageName) => {
      const depCheck = checkHasCdsPackage(packageName, tree, project);

      if (depCheck) {
        const packageJsonPath = joinPathFragments(project.root, `package.json`);
        //   empty object for dev deps which are required, but in this case there are none
        addDependenciesToPackageJson(tree, depsToAddMap[packageName], {}, packageJsonPath);
        packageJsonsWithUpdates.push(packageJsonPath);
      }
    });
  });

  if (packageJsonsWithUpdates.length) {
    logSuccess(`Upgraded CDS packages in the following files:`, packageJsonsWithUpdates);
  } else {
    logError(`Unable to find any projects consuming CDS packages.`, [
      `Ensure this generator is being run within an nx workspace.`,
      `As a workaround you can add @cbhq/cds-web or @cbhq/cds-mobile to the dependencies of the package.json for the projects you want to run the codemod in.`,
    ]);
  }
}
