import { info } from 'console';
import glob from 'fast-glob';
import { exec } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';
import { Project, SourceFile } from 'ts-morph';

import { ComponentMetadata } from '../types';

import { getCallSitesForComponent } from './componentParser';

const sh = promisify(exec);

export async function getTempRepos(repos: string[], tempDir: string) {
  try {
    info('Cloning repos...');
    fs.mkdirSync(tempDir, { recursive: true });
    await Promise.all(
      repos.map(async (repo) => {
        const repoPath = path.join(tempDir, repo);
        return sh(
          `git clone --depth=1 --branch=master git@github.cbhq.net:${repo} ${repoPath} && rm -rf ${repoPath}/.git`,
          { cwd: tempDir },
        );
      }),
    );
  } catch (err) {
    if (err instanceof Error) {
      console.log(err?.message);
    } else {
      throw err;
    }
  }
}

export function cleanup(tempDir: string) {
  info('Cleaning up temp directories...');
  // Delete temp directory
  exec(`rm -rf ${tempDir}`, (error) => {
    if (error) {
      console.log(error?.message);
    }
  });
}

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
  const targetPath = path.join(__dirname, '../../../common/package.json');
  try {
    const fileContents = await fs.promises.readFile(targetPath, 'utf8');
    const packageJson = JSON.parse(fileContents) as PackageJson;
    return packageJson.version;
  } catch (error) {
    console.error('Error getting CDS version:', error);
    return null;
  }
}

export async function createTsMorphProject(directory: string) {
  // create a ts-morph project
  const project = new Project({
    skipAddingFilesFromTsConfig: true,
    useInMemoryFileSystem: true,
  });

  async function addFilesFromDirectory(dir: string) {
    const filePaths = await glob('**/*.tsx', {
      ignore: ['node_modules', '**/*.test.tsx', '**/*.stories.tsx'],
      onlyFiles: true,
      cwd: dir,
      absolute: true,
    });
    filePaths.forEach((filePath) => {
      // add the file to the ts-morph project instance
      const sourceContent = fs.readFileSync(filePath, 'utf-8');
      // we want to always overwrite this to ensure if there are multiple scripts updating a single file the subsequent scripts will have the latest changes
      project.createSourceFile(filePath, sourceContent, {
        overwrite: true,
      });
    });
  }
  await addFilesFromDirectory(directory);

  return project.getSourceFiles();
}

/**
 * Given a directory and a library config, this function will parse the directory for files that
 * reference the library component and return the call sites for the component.
 */
export const getCallSitesForComponentByApp = ({
  callSiteDirForApp,
  libraryConfig,
  componentConfig,
}: {
  callSiteDirForApp: string;
  libraryConfig: {
    repoDirectory: string;
    component: string;
    projectFiles: SourceFile[];
    packageName: string;
    cleanPath: (path: string) => string;
    sourceFile: SourceFile;
  };
  componentConfig: ComponentMetadata[];
}) => {
  const { component, projectFiles, packageName, cleanPath, sourceFile, repoDirectory } =
    libraryConfig;

  const callSiteDirAbsolute = `${repoDirectory}/${callSiteDirForApp}`;
  const callSiteProjectFiles = projectFiles.filter((file) =>
    file.getFilePath().startsWith(callSiteDirAbsolute),
  );

  const getCallSites = getCallSitesForComponent({
    component,
    callSiteProjectFiles,
    packageName,
    cleanPath,
  });

  const components: ComponentMetadata[] = [];

  // check if the component is already in the components array
  const existingComponent = componentConfig.find((c) => c.name === component);
  if (!existingComponent) {
    components.push({
      name: component,
      path: cleanPath(sourceFile.getFilePath()),
      callSites: { [callSiteDirForApp]: getCallSites },
      callSiteCount: { [callSiteDirForApp]: getCallSites.length },
    });
  } else {
    existingComponent.callSites[callSiteDirForApp] = getCallSites;
    existingComponent.callSiteCount[callSiteDirForApp] = getCallSites.length;
  }

  return components;
};
