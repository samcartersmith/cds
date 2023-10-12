import { existsSync } from 'node:fs';

import {
  addChanges,
  checkoutBranch,
  checkoutNewBranch,
  checkStatus,
  cleanChanges,
  cloneRepo,
  commitChanges,
  deleteBranchesExcept,
  pullBranch,
  pushBranch,
  resetRemote,
} from './git/index.js';
import {
  closePR,
  createInstallationAccessToken,
  createPR,
  getOctokitData,
  getOpenPRs,
} from './octokit/index.js';
import {
  runNxTarget,
  updatePackageVersion,
  validatePackageRelease,
  yarnInstall,
} from './repo/index.js';
import { getAppConfig } from './config.js';
import { logger, resetLargeLogs } from './logger.js';
import { resolveWorkingDirectoryPath, setWorkingDirectory } from './workingDirectory.js';

const COMMIT_MSG_PREFIX = 'Publish Figma color styles, icons, and illustrations';
const PR_DESCRIPTION =
  'This PR was created by the cds-figma-asset-sync bot. It automatically syncs and publishes Figma assets when changes are detected.';
const GITHUB_BOT_LOGIN = 'cds-figma-asset-sync[bot]';

export const syncAssets = async () => {
  try {
    resetLargeLogs();
    const startTime = Date.now();
    logger.info('Starting to sync assets');
    setWorkingDirectory();

    const { repoData } = await getOctokitData();
    const repoPath = resolveWorkingDirectoryPath(`./${repoData.name}`);
    const repoExisted = existsSync(repoPath);
    const tokenData = await createInstallationAccessToken();

    // Clone the repo if it doesn't already exist
    if (!repoExisted) {
      await cloneRepo({
        owner: repoData.owner.login,
        repo: repoData.name,
        accessToken: tokenData.token,
      });
    }

    setWorkingDirectory(repoPath);

    // Reauthorize with new token, clean up, and update master if repo already exists
    if (repoExisted) {
      await resetRemote({
        owner: repoData.owner.login,
        repo: repoData.name,
        accessToken: tokenData.token,
      });
      await cleanChanges();
      await checkoutBranch('master');
      await deleteBranchesExcept('master');
      await pullBranch('master');
    }

    await yarnInstall();

    // TODO: Re-enable color styles syncing once migration to Figma Variables API is complete
    // Sync color styles
    // await runNxTarget('figma-styles:sync-illustration-light-styles');
    // await runNxTarget('figma-styles:sync-illustration-dark-styles');
    // await runNxTarget('figma-styles:sync-ui-light-styles');
    // await runNxTarget('figma-styles:sync-ui-dark-styles');

    // Sync icons
    await runNxTarget('icons:sync', { exitOnBreakingChanges: true });

    // Sync illustrations
    await runNxTarget('illustrations:sync', { exitOnBreakingChanges: true });

    const dateString = new Date().toISOString().replace(/\..*/, '').replaceAll(':', '-');
    const localeDateString = new Date().toLocaleDateString();
    const newBranchName = `cds-figma-sync-bot-${dateString}`;
    const commitMessage = `${COMMIT_MSG_PREFIX} ${localeDateString}`;

    const changedFiles = await checkStatus();
    const { repo } = await getAppConfig();
    const hasIconsChanges = changedFiles.includes(repo.generatedIconsPath);
    const hasIllustrationsChanges = changedFiles.includes(repo.generatedIllustrationsPath);

    if (!changedFiles) {
      logger.info('No changes to commit, exiting...');
      return;
    }

    await checkoutNewBranch(newBranchName);
    await addChanges('.');
    await commitChanges(commitMessage);
    await pushBranch(newBranchName);

    const newPR = await createPR({
      title: commitMessage,
      body: PR_DESCRIPTION,
      head: newBranchName,
    });

    // Bump package versions and update changelogs if changes detected in icons or illustrations
    if (hasIconsChanges || hasIllustrationsChanges) {
      if (hasIconsChanges) {
        await updatePackageVersion({
          project: 'icons',
          dateString: localeDateString,
          pr: newPR.number,
        });
      }

      if (hasIllustrationsChanges) {
        await updatePackageVersion({
          project: 'illustrations',
          dateString: localeDateString,
          pr: newPR.number,
        });
      }

      await validatePackageRelease();

      await addChanges('.');
      await commitChanges('Bump package versions and update changelogs');
      await pushBranch(newBranchName);
    }

    logger.info(`PR created at ${newPR.html_url}`);
    logger.info('Closing any other open PRs previously created by the bot');

    const openPRs = await getOpenPRs();
    const botPRs = openPRs.filter(
      (pr) => pr.user?.login === GITHUB_BOT_LOGIN && pr.number !== newPR.number,
    );

    // Close any other open PRs previously created by the bot
    if (botPRs.length > 0) await Promise.all(botPRs.map(async (pr) => closePR(pr.number)));

    logger.info(`Finished syncing assets in ${(Date.now() - startTime) / 1000} seconds`);
  } catch (error) {
    logger.error(error);
  }
};
