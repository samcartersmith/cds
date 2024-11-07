import { getProjects, readJson, Tree, updateJson } from '@nrwl/devkit';
import { PackageJson } from 'type-fest';

import {
  checkHasCdsDependency,
  CheckHasCdsDependencyReturnType,
  checkRequiresUpgrade,
  logSuccess,
  webPackage,
} from '../../helpers';

function addDependencyToProject(depCheck: CheckHasCdsDependencyReturnType, tree: Tree) {
  let typeOfDep: 'dependencies' | 'peerDependencies' | undefined;
  // check package.json for cds-web dependency, peer or dependency
  if (depCheck.dependencies?.[webPackage]) {
    typeOfDep = 'dependencies';
  }
  if (depCheck.peerDependencies?.[webPackage]) {
    typeOfDep = 'peerDependencies';
  }
  const { packageJsonPath } = depCheck;
  if (tree.isFile(packageJsonPath) && typeOfDep) {
    const pkg = readJson<PackageJson>(tree, packageJsonPath);
    // check if framer motion is the same type of dependency
    const framerMotionDep = pkg[typeOfDep]?.['framer-motion'];
    if (framerMotionDep) {
      // check if version is 10.18.0 or higher
      if (checkRequiresUpgrade(framerMotionDep, '10.18.0')) {
        // update framer motion to 10.18.0
        updateJson(tree, packageJsonPath, (json) => {
          // eslint-disable-next-line no-param-reassign
          json[typeOfDep as string]['framer-motion'] = '10.18.0';
          return json;
        });
        logSuccess(`Updated framer-motion to 10.18.0 in ${packageJsonPath}`);
      }
    } else {
      // add framer motion as same type of dependency
      updateJson(tree, packageJsonPath, (json) => {
        // eslint-disable-next-line no-param-reassign
        json[typeOfDep as string]['framer-motion'] = '10.18.0';

        return json;
      });
      logSuccess(`Added framer-motion to ${typeOfDep} in ${packageJsonPath}`);
    }
  }
}

export default async function addDependencies(tree: Tree) {
  const projects = getProjects(tree);

  const rootDepCheck = checkHasCdsDependency({
    tree,
    checkRoot: true,
  });

  addDependencyToProject(rootDepCheck, tree);

  projects.forEach((project) => {
    const depCheck = checkHasCdsDependency({
      tree,
      project,
    });
    addDependencyToProject(depCheck, tree);
  });
}
