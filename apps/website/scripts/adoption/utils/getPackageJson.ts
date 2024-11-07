import fs from 'node:fs';
import path from 'node:path';

export type PackageJson = {
  dependencies: Record<string, string>;
  peerDependencies?: Record<string, string>;
  resolutions?: Record<string, string>;
  devDependencies?: Record<string, string>;
  version?: string;
};

// Function to extract version number from a complex dependency string
export function extractVersion(dependencyString: string) {
  const versionRegex = /(\d+\.\d+\.\d+)(?=-[a-z0-9]+\.patch)/i; // Extract the version before '-[hash].patch'

  if (dependencyString.startsWith('patch:')) {
    const match = dependencyString.match(versionRegex);
    return match ? match[1] : dependencyString;
  }
  return dependencyString;
}

export async function getPackageJson(rootDir: string, reverse?: boolean): Promise<PackageJson> {
  try {
    const packageJsonPath = path.join(rootDir, reverse ? '..' : '', 'package.json');
    const fileContents = await fs.promises.readFile(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(fileContents) as PackageJson;

    // Process dependencies
    if (packageJson.dependencies) {
      packageJson.dependencies = Object.fromEntries(
        Object.entries(packageJson.dependencies).map(([key, value]) => [
          key,
          extractVersion(value),
        ]),
      );
    }

    // Process peerDependencies
    if (packageJson.peerDependencies) {
      packageJson.peerDependencies = Object.fromEntries(
        Object.entries(packageJson.peerDependencies).map(([key, value]) => [
          key,
          extractVersion(value),
        ]),
      );
    }

    // Process resolutions
    if (packageJson.resolutions) {
      packageJson.resolutions = Object.fromEntries(
        Object.entries(packageJson.resolutions).map(([key, value]) => [key, extractVersion(value)]),
      );
    }

    // Process devDependencies
    if (packageJson.devDependencies) {
      packageJson.devDependencies = Object.fromEntries(
        Object.entries(packageJson.devDependencies).map(([key, value]) => [
          key,
          extractVersion(value),
        ]),
      );
    }

    return packageJson;
  } catch (err) {
    if (err instanceof Error) {
      return getPackageJson(rootDir, true);
    }

    throw err;
  }
}

// Function to get the CDS version from package.json
export async function getCDSVersion() {
  // We will use cds-common version to track our package.
  const targetPath = path.join(__dirname, '../../../../../packages/common/package.json');
  try {
    const fileContents = await fs.promises.readFile(targetPath, 'utf8');
    const packageJson = JSON.parse(fileContents) as PackageJson;
    return packageJson.version;
  } catch (error) {
    console.error('Error getting CDS version:', error);
    return null;
  }
}
