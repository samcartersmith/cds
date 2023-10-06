import { readFileSync, writeFileSync } from 'node:fs';
import type { VersionBump } from '@cbhq/mono-pipeline/lib/bumpVersion';

import { getAppConfig } from '../config.js';
import { execute } from '../execute.js';
import { spawn } from '../spawn.js';
import { resolveWorkingDirectoryPath } from '../workingDirectory.js';

type UpdatePackageVersionOptions = {
  project: string;
  dateString?: string;
  bump?: VersionBump;
  message?: string;
  pr?: number;
  jira?: string;
};

export const updatePackageVersion = async ({
  project,
  dateString,
  bump = 'minor',
  message = `Publish ${project}${dateString ? ` ${dateString}` : ''}`,
  pr,
  jira,
}: UpdatePackageVersionOptions) =>
  execute<string>(`Bumping cds-${project} version and updating changelogs`, async () => {
    const { repo } = await getAppConfig();
    const prFlag = pr ? ` --pr=${pr}` : '';
    const jiraFlag = jira ? ` --jira=${jira}` : '';

    const changelogUpdateResult = await spawn(
      `yarn mono-pipeline version ${project} -b "${bump}" -m "${message}"${prFlag}${jiraFlag}`,
    );

    const changelogPath = resolveWorkingDirectoryPath(
      repo.changelogPath.replace('{project}', project),
    );
    const changelogText = readFileSync(changelogPath, 'utf8');
    const newChangelogText = changelogText.replaceAll(/x-access-token.*@/g, '');
    writeFileSync(changelogPath, newChangelogText);

    return changelogUpdateResult;
  });
