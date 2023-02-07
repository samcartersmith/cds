import { joinPathFragments, ProjectConfiguration, readJson, Tree } from '@nrwl/devkit';
import type { PackageJson } from 'type-fest';

const mobilePackage = '@cbhq/cds-mobile';
const webPackage = '@cbhq/cds-web';
const depsToCheck = [webPackage, mobilePackage];

function hasCdsDep(dep: string) {
  return depsToCheck.includes(dep);
}

export function checkHasCdsDependency(tree: Tree, project: ProjectConfiguration) {
  const packageJsonPath = joinPathFragments(project.root, `package.json`);

  let dependencies: Partial<Record<string, string>> | false = false;
  let devDependencies: Partial<Record<string, string>> | false = false;

  if (tree.isFile(packageJsonPath)) {
    const pkg = readJson<PackageJson>(tree, packageJsonPath);

    if (pkg.dependencies && Object.keys(pkg.dependencies).some(hasCdsDep)) {
      dependencies = pkg.dependencies;
    }

    if (pkg.devDependencies && Object.keys(pkg.devDependencies).some(hasCdsDep)) {
      devDependencies = pkg.devDependencies;
    }
  }

  const hasCdsDependency = dependencies || devDependencies;

  return {
    hasCdsDependency,
    packageJsonPath,
    dependencies: dependencies
      ? {
          mobile: dependencies[mobilePackage],
          web: dependencies[webPackage],
        }
      : false,
    devDependencies: devDependencies
      ? {
          mobile: devDependencies[mobilePackage],
          web: devDependencies[webPackage],
        }
      : false,
  };
}
