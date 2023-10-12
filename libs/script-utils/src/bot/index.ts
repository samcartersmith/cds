/* eslint-disable no-underscore-dangle */
import * as git from './git';
import { type OctokitBot, type OctokitConfig, initializeOctokit } from './octokit';
import * as repo from './repo';

type Bot = typeof repo & {
  git: typeof git;
  _octokit?: OctokitBot;
  octokit: OctokitBot;
  initializeOctokit: (config: OctokitConfig) => void;
};

/**
 * These tools are collected into one export because they are commonly used together,
 * and more importantly are all built around utils in libs/script-utils/src/bot/repo/
 *
 * This means they share a common logger instance and respect the working directory
 * set by setWorkingDirectory() in libs/script-utils/src/bot/repo/workingDirectory.ts
 *
 * Note that any working directory set by setWorkingDirectory() will automatically be
 * relative to path.resolve(process.cwd(), 'temp'), and will be automatically created
 * along with the 'temp' directory if it does not exist. The log files are written to
 * the 'temp' directory.
 *
 * Additionally, libs/script-utils/src/bot/repo/git/ requires data that is most easily
 * created by initializing an Octokit client via libs/script-utils/src/bot/octokit/
 * initializeOctokit()
 *
 * A common use case looks like this:
 *
 * ```
 * import { bot } from '@cbhq/script-utils'
 * import fs from 'node:fs'
 *
 * bot.resetLargeLogs()
 * bot.logger.info('Starting service')
 * bot.setWorkingDirectory('test') // Creates temp/test/ inside process.cwd()
 *
 * const octokit = await bot.initializeOctokit({
 *   appId: 82,
 *   repo: 'frontend/cds',
 *   privateKey: fs.readFileSync('~/private-key.pem', 'utf8'),
 * })
 *
 * const { token } = await bot.octokit.createInstallationAccessToken()
 *
 * const localRepoPath = bot.resolveWorkingDirectoryPath(octokit.repoData.name)
 *
 * if (!fs.existsSync(localRepoPath)) {
 *   await bot.git.cloneRepo({
 *     owner: octokit.repoData.owner.login,
 *     repo: octokit.repoData.name,
 *     accessToken: tokenData.token,
 *   })
 * }
 *
 * bot.setWorkingDirectory(localRepoPath)
 *
 * bot.yarnInstall()
 *
 * // etc...
 * ```
 */
export const bot: Bot = {
  ...repo,
  git,
  async initializeOctokit(config: OctokitConfig) {
    this._octokit = await initializeOctokit(config);
  },
  _octokit: undefined,
  get octokit(): OctokitBot {
    if (!this._octokit)
      throw Error('Attempted to access bot.octokit before calling bot.initializeOctokit()');
    return this._octokit;
  },
};
