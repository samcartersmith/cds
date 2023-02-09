import { addDependenciesToPackageJson, getProjects, output, Tree } from '@nrwl/devkit';

import { checkHasCdsDependency } from '../../helpers/checkHasCdsDependency';
import { logStartTask } from '../../helpers/logStartTask';

const depToAdd = { '@cbhq/cds-illustrations': '1.0.0' };

export default async function addIllustrationPackage(tree: Tree) {
  logStartTask('Adding illustration package to apps or packages with an existing CDS dependency');

  const projects = getProjects(tree);
  const updatedPackageJsons: string[] = [];

  projects.forEach((project) => {
    const { hasCdsDependency, dependencies, devDependencies, packageJsonPath } =
      checkHasCdsDependency(tree, project);

    if (hasCdsDependency) {
      addDependenciesToPackageJson(
        tree,
        dependencies ? depToAdd : {},
        devDependencies ? depToAdd : {},
        packageJsonPath,
      );
      updatedPackageJsons.push(packageJsonPath);
    }
  });

  if (updatedPackageJsons.length) {
    output.success({
      title: `Added @cbhq/cds-illustrations to the following files:`,
      bodyLines: updatedPackageJsons,
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
