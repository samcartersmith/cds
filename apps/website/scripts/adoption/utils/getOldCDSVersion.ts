import { exec } from 'child_process';
import { promisify } from 'util';

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
    const { stdout } = await sh(`git show 'master@{3 months ago}:packages/common/package.json'`);

    // Parse the output as JSON
    const packageJson = JSON.parse(stdout) as PackageType;

    return packageJson;
  } catch (error) {
    console.error('Error fetching package.json from 3 months ago:', error);
    throw error;
  }
}
