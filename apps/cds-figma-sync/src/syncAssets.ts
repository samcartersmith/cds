import { existsSync } from 'node:fs';
import { bot } from '@cbhq/script-utils';

import { getAppConfig } from './config.js';
import { getConfigServiceValue } from './configService.js';

const COMMIT_MSG_PREFIX = 'Publish Figma color styles, icons, and illustrations';
const PR_DESCRIPTION =
  'This PR was created by the CDS Bot. It automatically syncs and publishes Figma assets regularly.';
const GITHUB_BOT_LOGIN = 'cds-bot[bot]';

export const syncAssets = async () => {
  try {
    bot.resetLargeLogs();
    const startTime = Date.now();
    bot.logger.info('Starting to sync assets');
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

    // TODO: Re-enable color styles syncing once migration to Figma Variables API is complete
    // Sync color styles
    // await bot.runNxTarget('figma-styles:sync-illustration-light-styles');
    // await bot.runNxTarget('figma-styles:sync-illustration-dark-styles');
    // await bot.runNxTarget('figma-styles:sync-ui-light-styles');
    // await bot.runNxTarget('figma-styles:sync-ui-dark-styles');

    // Sync icons
    await bot.runNxTarget('icons:sync --exitOnBreakingChanges');

    // Sync illustrations
    await bot.runNxTarget('illustrations:sync --exitOnBreakingChanges');

    const changedFiles = await bot.git.checkStatus();

    const hasIconsChanges = changedFiles.includes(config.repo.generatedIconsPath);
    const hasIllustrationsChanges = changedFiles.includes(config.repo.generatedIllustrationsPath);

    if (!changedFiles) {
      bot.logger.info('No changes to commit, exiting...');
      return;
    }

    // Generate storybook sheets in cds-web
    if (hasIconsChanges) await bot.runNxTarget('icons:generate-stories');
    if (hasIllustrationsChanges) await bot.runNxTarget('illustrations:generate-stories');

    const newerChangedFiles = await bot.git.checkStatus();

    const hasWebChanges = newerChangedFiles.includes(config.repo.webPackagePath);
    const dateString = new Date().toISOString().replace(/\..*/, '').replaceAll(':', '-');
    const localeDateString = new Date().toLocaleDateString();
    const newBranchName = `cds-bot-figma-sync-${dateString}`;
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

    // Bump package versions and update changelogs if changes detected in icons, illustrations, or web
    if (hasIconsChanges || hasIllustrationsChanges || hasWebChanges) {
      if (hasIconsChanges) {
        await bot.updatePackageVersion({
          project: 'icons',
          prNumber: newPR.number,
          versionBump: 'minor',
          message: `Publish icons ${localeDateString}`,
          changelogPath: config.repo.iconsChangelogPath,
        });
      }

      if (hasIllustrationsChanges) {
        await bot.updatePackageVersion({
          project: 'illustrations',
          prNumber: newPR.number,
          versionBump: 'minor',
          message: `Publish illustrations ${localeDateString}`,
          changelogPath: config.repo.illustrationsChangelogPath,
        });
      }

      if (hasWebChanges) {
        await bot.updatePackageVersion({
          project: 'web',
          prNumber: newPR.number,
          versionBump: 'none',
          message: 'Regenerate icons and illustrations stories',
          changelogPath: config.repo.webChangelogPath,
        });
      }

      await bot.validatePackageRelease();

      await bot.git.addChanges('.');
      await bot.git.commitChanges({
        userName: gitUserName,
        userEmail: gitUserEmail,
        message: 'Bump package versions and update changelogs',
      });
      await bot.git.pushBranch(newBranchName);
    }

    bot.logger.info(`PR created at ${newPR.html_url}`);
    bot.logger.info('Closing any other open PRs previously created by the bot');

    const openPRs = await bot.octokit.getOpenPRs();
    const botPRs = openPRs.filter(
      (pr) =>
        pr.user?.login === GITHUB_BOT_LOGIN &&
        pr.number !== newPR.number &&
        pr.title.includes(COMMIT_MSG_PREFIX),
    );

    // Close any other open PRs previously created by the bot
    if (botPRs.length > 0)
      await Promise.all(botPRs.map(async (pr) => bot.octokit.closePR(pr.number)));

    bot.logger.info(`Finished syncing assets in ${(Date.now() - startTime) / 1000} seconds`);
  } catch (error) {
    bot.logger.error(error);
  }
};
