import { existsSync } from 'node:fs';
import { bot } from '@cbhq/script-utils';

import { getAppConfig } from './config.js';
import { getConfigServiceValue } from './configService.js';

const COMMIT_MSG_PREFIX = 'Publish CDS adoption stats';
const PR_DESCRIPTION =
  'This PR was created by the CDS Bot. It automatically syncs and publishes CDS adoption stats regularly.';
const GITHUB_BOT_LOGIN = 'cds-bot[bot]';

export const updateAdoptionStats = async () => {
  try {
    bot.resetLargeLogs();
    const startTime = Date.now();
    bot.logger.info('Starting to update adoption stats');
    bot.setWorkingDirectory();

    const config = await getAppConfig();

    await bot.initializeOctokit(config.octokit);
    const { repoData } = bot.octokit;

    const repoPath = bot.resolveWorkingDirectoryPath(`./${repoData.name}`);
    const repoExisted = existsSync(repoPath);
    const tokenData = await bot.octokit.createInstallationAccessToken();

    // Clone the repo if it doesn't already exist
    if (!repoExisted) {
      await bot.git.cloneRepo({
        owner: repoData.owner.login,
        repo: repoData.name,
        accessToken: tokenData.token,
      });
    }

    bot.setWorkingDirectory(repoPath);

    // Reauthorize with new token, clean up, and update master if repo already exists
    if (repoExisted) {
      await bot.git.resetRemote({
        owner: repoData.owner.login,
        repo: repoData.name,
        accessToken: tokenData.token,
      });
      await bot.git.cleanChanges();
      await bot.git.checkoutBranch('master');
      await bot.git.deleteBranchesExcept('master');
      await bot.git.pullBranch('master');
    }

    await bot.yarnInstall();

    // Gather adoption stats
    await bot.runNxTarget('website:adoption');

    const changedFiles = await bot.git.checkStatus();

    if (!changedFiles) {
      bot.logger.info('No changes to commit, exiting...');
      return;
    }

    const dateString = new Date().toISOString().replace(/\..*/, '').replaceAll(':', '-');
    const localeDateString = new Date().toLocaleDateString();
    const newBranchName = `cds-bot-adoption-${dateString}`;
    const commitMessage = `${COMMIT_MSG_PREFIX} ${localeDateString}`;
    const gitUserName = getConfigServiceValue('GIT_USER_NAME') || '';
    const gitUserEmail = getConfigServiceValue('GIT_USER_EMAIL') || '';

    await bot.git.checkoutNewBranch(newBranchName);
    await bot.git.addChanges('.');
    await bot.git.commitChanges({
      userName: gitUserName,
      userEmail: gitUserEmail,
      message: commitMessage,
    });
    await bot.git.pushBranch(newBranchName);

    const newPR = await bot.octokit.createPR({
      title: commitMessage,
      body: PR_DESCRIPTION,
      head: newBranchName,
    });

    bot.logger.info(`PR created at ${newPR.html_url}`);
    bot.logger.info('Closing any other open PRs previously created by the bot');

    const openPRs = await bot.octokit.getOpenPRs();
    const botPRs = openPRs.filter(
      (pr) => pr.user?.login === GITHUB_BOT_LOGIN && pr.number !== newPR.number,
    );

    // Close any other open PRs previously created by the bot
    if (botPRs.length > 0)
      await Promise.all(botPRs.map(async (pr) => bot.octokit.closePR(pr.number)));

    bot.logger.info(
      `Finished updating adoption stats in ${(Date.now() - startTime) / 1000} seconds`,
    );
  } catch (error) {
    bot.logger.error(error);
  }
};
