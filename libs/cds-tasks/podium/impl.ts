/* eslint-disable no-await-in-loop */
import fs from 'fs';
import path from 'path';

import { podiumConfigs } from './config';
import { ComponentMetadata } from './types';
import {
  cleanup,
  createTsMorphProject,
  error,
  getCallSitesForComponentByApp,
  getTempRepos,
  info,
  progressBar,
  success,
} from './utils';

const repos = podiumConfigs.map((item) => item.repo);
const rootDir = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;
const tempRepoDir = '.podium/repos';

const doesStartWithUppercaseLetter = (str: string) => {
  return /^[A-Z]/.test(str);
};

export default async function getPodiumData(): Promise<{ success: boolean }> {
  try {
    if (!rootDir) {
      throw new Error('Please provide a valid root directory');
    }

    // output directory for product component data
    const outputDir = path.join(rootDir, 'apps/website/static/data/__generated__/podium');
    // wipe existing data
    cleanup(outputDir);
    info('Cleaned up existing product component data');

    // create a temp directory to store the cloned repos. we'll delete this at the end.
    const tempDir = path.join(rootDir, tempRepoDir);
    // slice out the rootDir from the path to make the path relative
    const cleanPath = (path: string) => path.replace(tempDir, '');

    // git clone all of the repos into a temp directory
    await getTempRepos(repos, tempDir);
    info('Cloned all repos');

    // iterate over each repo and parse each product component library for potential PCs
    for (const repoConfig of podiumConfigs) {
      const { libraries, repo, callSites } = repoConfig;
      // we'll use this map to store the component metadata for each library in the repo
      const libraryMap: Record<
        string,
        { componentCount?: number; components: ComponentMetadata[] }
      > = {};
      const repoDirectory = `${tempDir}/${repo}`;

      // create a ts-morph project for entire repo
      const projectFiles = await createTsMorphProject(repoDirectory);

      // get component metadata for each library in the repo
      for (const library of libraries) {
        try {
          const { name, packageName, directory } = library;

          const libraryDirectory = `${repoDirectory}/${directory}`;
          // get all files in the library directory
          const libraryFiles = projectFiles.filter((file) =>
            file.getFilePath().startsWith(libraryDirectory),
          );
          // store the component metadata for each library
          const components: ComponentMetadata[] = [];

          const progress = progressBar(
            `Parsing ${name} for product components`,
            libraryFiles.length,
          );

          // parse each library file for possible product components
          libraryFiles.forEach((sourceFile) => {
            // get the name of the file without the extension
            const fileName = sourceFile.getBaseNameWithoutExtension();
            // assume the file contains a component if it starts with an uppercase letter
            if (!doesStartWithUppercaseLetter(fileName)) return;
            // get the call sites for the component
            callSites.forEach(async (callSiteDirForApp) => {
              const callSitesForComponentByApp = getCallSitesForComponentByApp({
                callSiteDirForApp,
                libraryConfig: {
                  repoDirectory,
                  component: fileName,
                  projectFiles,
                  packageName,
                  cleanPath,
                  sourceFile,
                },
                componentConfig: components,
              });
              components.push(...callSitesForComponentByApp);
            });
            progress.increment();
          });

          // update the library map with the component metadata for each app
          libraryMap[packageName] = {
            components,
            componentCount: libraryFiles.length,
          };

          progress.stop();
          success(`Identified ${components.length} product components in ${name}`);
        } catch {
          console.error('Failed to execute:', error);
        } finally {
          // write library data to a JSON file
          // make the repo name kebab case, no slashes
          const repoNameKebab = repo.replace(/\//g, '-');
          const libraryDataPath = path.join(outputDir, repoNameKebab);
          const outputPath = path.join(libraryDataPath, 'output.json');
          const stringifiedData = JSON.stringify(libraryMap, null, 2);

          // create a directory for the output file in the root of the workspace
          fs.mkdirSync(libraryDataPath, { recursive: true });
          fs.writeFileSync(outputPath, stringifiedData);
        }
      }
    }
    return { success: true };
  } catch (errorMessage) {
    error(`Failed to execute: ${errorMessage}`);
    return { success: false };
  } finally {
    if (rootDir) {
      // cleanup the temp directory
      const tempDir = path.join(rootDir, tempRepoDir);
      cleanup(tempDir);
      info('cleanup');
    } else {
      error(
        `failed to delete temp directory at ${tempRepoDir}, you'll need to manually remove it.`,
      );
    }
  }
}

void getPodiumData();
