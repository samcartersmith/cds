import { readFileSync, writeFileSync } from 'node:fs';

import { execute } from './execute.js';
import { spawn } from './spawn.js';
import { resolveWorkingDirectoryPath } from './workingDirectory.js';

type VersionBump = 'major' | 'minor' | 'patch' | 'none';

type UpdatePackageVersionOptions = {
  project: string;
  changelogPath: string;
  versionBump: VersionBump;
  message: string;
  prNumber?: number;
  jiraTicket?: string;
};

export const updatePackageVersion = async ({
  project,
  changelogPath,
  versionBump,
  message,
  prNumber,
  jiraTicket,
}: UpdatePackageVersionOptions) =>
  execute(`Bumping package version and updating changelog for project ${project}`, async () => {
    const prFlag = prNumber ? ` --pr=${prNumber}` : '';
    const jiraFlag = jiraTicket ? ` --jira=${jiraTicket}` : '';

    const changelogUpdateResult = await spawn(
      `yarn bump-version ${project} -b "${versionBump}" -m "${message}"${prFlag}${jiraFlag}`,
    );

    const fullChangelogPath = resolveWorkingDirectoryPath(changelogPath);
    // Remove x-access-token from github remote URL in changelog
    const changelogText = readFileSync(fullChangelogPath, 'utf8');
    const newChangelogText = changelogText.replaceAll(/x-access-token.*@/g, '');
    writeFileSync(fullChangelogPath, newChangelogText);

    return changelogUpdateResult;
  });
