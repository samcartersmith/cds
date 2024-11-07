import { exec } from 'node:child_process';
import fs from 'node:fs';
import { promisify } from 'node:util';

import { CDSVersionsResult } from '../../../components/AdoptionTracker/types';
import { type ProductComponentInfo } from '../types';

import { extractVersion } from './getPackageJson';
import { sanitizeVersion } from './getStats';

const sh = promisify(exec);

type PackageType = {
  name: string;
  version: string;
  description: string;
  repository: string;
};

export async function getCDSCommonPackageJsonFromThreeMonthsAgo() {
  try {
    // Get the root directory of the git repository
    const { stdout: gitRoot } = await sh('git rev-parse --show-toplevel');
    const rootDir = gitRoot.trim();

    // Change to the root directory
    process.chdir(rootDir);

    // Get @cbhq/cds-common version from 3 months ago from the root directory
    const { stdout } = await sh(
      `git show $(git log master --before="3 months ago" -1 --format="%H"):packages/common/package.json`,
    );

    // Parse the output as JSON
    const packageJson = JSON.parse(stdout) as PackageType;

    return packageJson;
  } catch (error) {
    console.error('Error fetching package.json from 3 months ago:', error);
    throw error;
  }
}

function findCDSVersion(packageJson: ProductComponentInfo, packageName: string): string {
  const possibleLocations = [
    packageJson.dependencies,
    packageJson.devDependencies,
    packageJson.peerDependencies,
    packageJson.resolutions,
  ];

  for (const location of possibleLocations) {
    if (location?.[packageName]) {
      return extractVersion(location[packageName]);
    }
  }

  return 'Not Found';
}

export async function getCDSVersionFromComponentPatternPackage(
  filePath: string,
): Promise<CDSVersionsResult> {
  try {
    const fileContents = await fs.promises.readFile(filePath, 'utf8');
    const packageJson = JSON.parse(fileContents);

    const cdsWebVersion = findCDSVersion(packageJson, '@cbhq/cds-web');
    const cdsMobileVersion = findCDSVersion(packageJson, '@cbhq/cds-mobile');
    const cdsCommonVersion = findCDSVersion(packageJson, '@cbhq/cds-common');

    // Find the lowest version among the three, ignoring 'Not Found'
    const versions = [cdsWebVersion, cdsMobileVersion, cdsCommonVersion].filter(
      (v) => v !== 'Not Found',
    );
    const lowestVersion = versions.sort()[0] || 'Not Found';
    const sanitizedLowestVersion = sanitizeVersion(lowestVersion);

    return {
      cdsWeb: cdsWebVersion,
      cdsMobile: cdsMobileVersion,
      cdsCommon: cdsCommonVersion,
      lowestVersion,
      sanitizedLowestVersion,
    };
  } catch (error) {
    console.error('Error reading or parsing package.json:', error);
    throw error;
  }
}
