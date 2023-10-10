import { ExecutorContext } from '@nrwl/devkit';
import fs from 'node:fs';
import path from 'node:path';

import { getProjectPath, getProjectSourcePath } from '../utils';

type PackageJson = {
  name?: string;
  version?: string;
  private?: boolean;
};

/**
 * Extracts the package's version from the package.json file and exposes it via a
 * new `@cbhq/example-package/version` export path with an export named `version`.
 */
export default async function exportPackageVersion(options: never, context: ExecutorContext) {
  let success = true;

  try {
    const projectPath = getProjectPath(context);
    const packageJsonPath = path.join(projectPath, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')) as PackageJson;
    const { name: packageName, version, private: packagePrivate } = packageJson;
    const { projectName } = context;
    const name = packageName || projectName;
    if (packagePrivate)
      throw Error(
        `Attempted to run "export-package-version" executor on a package marked as private: ${name}`,
      );
    if (!version)
      throw Error(
        `Attempted to run "export-package-version" executor on a package with no version: ${name}`,
      );
    const projectSourcePath = getProjectSourcePath(context);
    const versionFilePath = path.join(projectSourcePath, 'version.ts');
    const versionFileContent = `export const version = '${version}';\n`;
    fs.writeFileSync(versionFilePath, versionFileContent);
  } catch (e) {
    console.log(`error: ${e}`);
    success = false;
  }

  return { success };
}
