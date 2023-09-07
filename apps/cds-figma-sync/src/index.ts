import type { APIGatewayEvent, Context } from 'aws-lambda';
import { existsSync } from 'node:fs';

import {
  addChanges,
  checkoutNewBranch,
  cloneRepo,
  commitChanges,
  pullBranch,
  pushBranch,
} from './git/index.js';
import {
  createInstallationAccessToken,
  createPR,
  getOctokitData,
  getOpenPRs,
} from './octokit/index.js';
import { logger, resetLogs } from './logger.js';
import { deleteWorkingDirectoryContents, setWorkingDirectory } from './spawn.js';
import { sync } from './sync.js';

const OPEN_PR_ERR_MSG = 'Unable to open a new PR against cds-figma-assets while it has open PRs';

export const main = async () => {
  try {
    resetLogs();
    setWorkingDirectory('./temp');
    deleteWorkingDirectoryContents();

    // Don't run if there are open PRs
    if ((await getOpenPRs()).length > 0) throw new Error(OPEN_PR_ERR_MSG);

    const { repoData } = await getOctokitData();
    const repoPath = `./temp/${repoData.name}`;
    const tokenData = await createInstallationAccessToken();

    // Clone the repo if it doesn't already exist
    if (!existsSync(repoPath)) {
      await cloneRepo({
        owner: repoData.owner.login,
        repo: repoData.name,
        accessToken: tokenData.token,
      });
    }

    setWorkingDirectory(repoPath);
    await pullBranch('master');

    // TODO: remove this once figma-styles, icons, and illustrations packages have been moved to the new repo
    setWorkingDirectory('../../..');

    // Sync color styles
    await sync({ project: 'figma-styles', target: 'sync-illustration-light-styles' });
    await sync({ project: 'figma-styles', target: 'sync-illustration-dark-styles' });
    await sync({ project: 'figma-styles', target: 'sync-ui-light-styles' });
    await sync({ project: 'figma-styles', target: 'sync-ui-dark-styles' });

    // Sync icons
    await sync({ project: 'icons', target: 'sync', exitOnBreakingChanges: true });

    // Sync illustrations
    // TODO: replace with commented out line once figma-styles, icons, and illustrations packages have been moved to the new repo
    // await sync({ project: 'illustrations', target: 'sync', exitOnBreakingChanges: true });
    await sync({
      project: 'illustrations',
      target: 'sync',
      generatedDirectory:
        'apps/cds-figma-sync/src/temp/cds-figma-assets/packages/illustrations/__generated__',
    });

    // TODO: remove this once figma-styles, icons, and illustrations packages have been moved to the new repo
    setWorkingDirectory(repoPath);

    // Don't continue if there are open PRs
    if ((await getOpenPRs()).length > 0) throw new Error(OPEN_PR_ERR_MSG);

    const dateString = new Date().toISOString().replace(/\..*/, '').replaceAll(':', '-');
    const newBranchName = `bot-${dateString}`;

    await checkoutNewBranch(newBranchName);
    await addChanges('.');
    await commitChanges(
      `[trivial] feat: Publish Figma color styles, icons, and illustrations ${dateString}`,
    );

    // Don't push branch if there are open PRs
    if ((await getOpenPRs()).length > 0) throw new Error(OPEN_PR_ERR_MSG);

    await pushBranch(newBranchName);

    const result = await createPR({
      title: `[trivial] feat: Publish Figma color styles, icons, and illustrations ${dateString}`,
      body: 'This PR was created by a bot. It automatically syncs and publishes Figma assets to the cds-figma-assets repo.',
      head: newBranchName,
    });

    logger.info(`PR created at ${result.html_url}`);
  } catch (error) {
    logger.error(error);
  }
};

// https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html
export const handler = async (event: APIGatewayEvent, context: Context) => {
  try {
    logger.info('Starting CDS Figma asset sync...');
    await main();
    return context.logStreamName;
  } catch (error) {
    logger.error(error);
    return 500;
  }
};
