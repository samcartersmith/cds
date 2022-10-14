import chalk from 'chalk';
import { exec } from 'child_process';
import glob from 'fast-glob';
import fs from 'fs';
import upperFirst from 'lodash/upperFirst';
import path from 'path';
import semver from 'semver';
import { argv } from 'yargs';

import { codegen } from './codegen';

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;
const PACKAGES = argv.packages as string;
const LOG_PREFIX = /^(?:- )?(\w+)(?:\(([a-zA-Z0-9\-., ]+)\))?:/u;

type VersionBump = 'major' | 'minor' | 'patch';

type LogType =
  // Major
  | 'breaking'
  // Minor
  | 'feat'
  | 'change'
  | 'new'
  | 'update'
  // Patch
  | 'fix'
  | 'patch'
  | 'chore'
  | 'types'
  // Noop
  | 'internal'
  | 'docs'
  | 'tests'
  | 'release';

type LogChange = {
  bump: VersionBump | null;
  message: string;
  scope: string;
  type: LogType;
};

type Log = {
  sha: string;
  date: Date;
  author: string;
  jira: string[];
  pr: string;
  change: LogChange;
};

const templateStart = `<!-- template-start -->`;

function determineNextVersion(logs: Log[], currentVersion: string): string | null {
  const isAlpha = currentVersion.startsWith('0.');
  let major = 0;
  let minor = 0;
  let patch = 0;

  logs.forEach(({ change }) => {
    if (change.bump === 'major') {
      major += 1;
    } else if (change.bump === 'minor') {
      minor += 1;
    } else if (change.bump === 'patch') {
      patch += 1;
    }
  });

  if (major > 0) {
    return semver.inc(currentVersion, isAlpha ? 'minor' : 'major');
  }
  if (minor > 0) {
    return semver.inc(currentVersion, isAlpha ? 'patch' : 'minor');
  }
  if (patch > 0) {
    return semver.inc(currentVersion, 'patch');
  }

  return null;
}

function determineVersionBump(type: LogType): LogChange['bump'] {
  switch (type) {
    case 'breaking':
      return 'major';
    case 'feat':
    case 'change':
    case 'new':
    case 'update':
      return 'minor';
    case 'fix':
    case 'patch':
    case 'chore':
    case 'types':
      return 'patch';
    default:
      return null;
  }
}

function parseCommitTokens(item: string) {
  const jira: string[] = [];
  let message = item;
  let pr = '';

  // Extract JIRA issues
  let jiraMatch;

  // eslint-disable-next-line no-cond-assign
  while ((jiraMatch = message.match(/\[([A-Za-z0-9]+-\d+)\]/))) {
    message = message.replace(jiraMatch[0], '').trim();
    jira.push(jiraMatch[1]);
  }

  // Extract PR number
  const prMatch = message.match(/\(#(\d+)\)$/);

  if (prMatch) {
    message = message.replace(prMatch[0], '').trim();
    // eslint-disable-next-line prefer-destructuring
    pr = prMatch[1];
  }

  // Remove all tokens in brackets
  let tokenMatch;

  // eslint-disable-next-line no-cond-assign
  while ((tokenMatch = message.match(/\[\w+\]/))) {
    message = message.replace(tokenMatch[0], '').trim();
  }

  return {
    jira,
    pr,
    message: message.trim(),
  };
}

function parseLogChange(line: string): LogChange {
  const match = line.match(LOG_PREFIX);
  let prefix = '';
  let type = 'chore';
  let scope = '';

  if (match) {
    [prefix, type, scope = ''] = match;
  }

  return {
    bump: determineVersionBump(type as LogType),
    message: line.replace(prefix, '').trim(),
    scope,
    type: type.toLowerCase() as LogType,
  };
}

function sentenceCase(message: string): string {
  let msg = message.trim();

  if (!msg.startsWith('`')) {
    msg = upperFirst(msg);
  }

  if (msg[msg.length - 1].match(/[^.!?]/i)) {
    msg += '.';
  }

  return msg;
}

function formatLogs(logs: Log[], version: string): string {
  const groups: Record<VersionBump | 'other', string[]> = {
    major: ['#### 💥 Breaking', ''],
    minor: ['#### 🚀 Updates', ''],
    patch: ['#### 🐞 Fixes', ''],
    other: ['#### 📘 Misc', ''],
  };

  logs.forEach((log) => {
    let line = sentenceCase(log.change.message);

    if (log.change.scope) {
      line = `**[${log.change.scope}]** ${line}`;
    }

    if (log.pr) {
      line += ` [#${log.pr}](https://github.cbhq.net/frontend/cds/pull/${log.pr})`;
    }

    if (log.jira) {
      log.jira.forEach((issue) => {
        line += `, [${issue}](https://jira.coinbase-corp.com/browse/${issue})`;
      });
    }

    groups[log.change.bump ?? 'other'].push(`- ${line}`);
  });

  const block: string[] = [
    `## ${version} (${new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })} PST)`,
  ];

  Object.values(groups).forEach((group) => {
    if (group.length > 2) {
      block.push('', ...group);
    }
  });

  return block.join('\n');
}

async function updateChangelog(
  pkgPath: string,
  logs: Log[],
  nextVersion: string,
): Promise<string | null> {
  const logPath = path.join(pkgPath, 'CHANGELOG.md');
  let contents = await fs.promises.readFile(logPath, 'utf8');

  contents = contents.replace(
    `${templateStart}`,
    `${templateStart}\n\n${formatLogs(logs, nextVersion)}`,
  );

  await fs.promises.writeFile(logPath, contents);

  return nextVersion;
}

async function extractGitLogs(pkgPath: string): Promise<Log[]> {
  return new Promise((resolve, reject) => {
    exec(
      `git --no-pager log -n 100 --pretty=format:'%h||%at||%an||%s' .`,
      { cwd: pkgPath },
      (error, stdout) => {
        if (error) {
          reject(error);
          return;
        }

        const logs: Log[] = [];
        const lines = String(stdout).split('\n');

        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < lines.length; i += 1) {
          const [sha, date, author, commit] = lines[i].split('||');
          const { jira, pr, message } = parseCommitTokens(commit);
          const change = parseLogChange(message);

          // We've caught up to the last released sha, so abort
          if (change.type === 'release') {
            break;
          }

          logs.push({
            author,
            change,
            date: new Date(Number(date) * 1000),
            jira,
            pr,
            sha,
          });
        }

        resolve(logs);
      },
    );
  });
}

async function releasePackage(pkgJsonPath: string, toRelease: Set<string>) {
  const pkgPath = path.dirname(pkgJsonPath);
  const pkgName = path.basename(pkgPath);
  const pkg = JSON.parse(await fs.promises.readFile(pkgJsonPath, 'utf8')) as {
    version: string;
    name: string;
  };

  const logs = await extractGitLogs(pkgPath);
  const prefix = chalk.gray(`[${chalk.white(pkgName)}]`);

  if (logs.length === 0) {
    console.log(chalk.yellow(`${prefix} No new commits since last release`));
    return;
  }

  if (!('version' in pkg)) return;

  const nextVersion = determineNextVersion(logs, pkg.version);
  const shaRange =
    logs.length === 1
      ? chalk.gray(`(${logs[0].sha})`)
      : chalk.gray(`(${logs[logs.length - 1].sha}-${logs[0].sha})`);

  if (nextVersion === null) {
    console.log(chalk.yellow(`${prefix} Nothing to release ${shaRange}`));
    return;
  }

  await updateChangelog(pkgPath, logs, nextVersion);

  pkg.version = nextVersion;

  await fs.promises.writeFile(pkgJsonPath, JSON.stringify(pkg, null, 2));

  console.info(
    chalk.green(`${prefix} Versions and changelog updated, ready for release! ${shaRange}`),
  );

  toRelease.add(`${pkg.name}@${nextVersion}`);
}

async function prepareRelease() {
  const pkgJsonPaths = await glob(`packages/(${PACKAGES})/package.json`, {
    absolute: true,
    cwd: MONOREPO_ROOT,
    onlyFiles: true,
  });
  const toRelease = new Set<string>();
  const packagesArray = PACKAGES.split('|');

  await Promise.all(
    pkgJsonPaths.map(async (pkgJsonPath) =>
      releasePackage(pkgJsonPath, toRelease).catch((error) => {
        console.error(chalk.red(`FAIL: ${error}`));
      }),
    ),
  );
  await Promise.all(
    packagesArray.map(async (name) => codegen('website/package-release', { name })),
  );

  if (toRelease.size > 0) {
    const prTitle = `[trivial] release: ${Array.from(toRelease).join(', ')}`;

    console.log('');
    console.log(`Pull request title: ${chalk.cyan(prTitle)}`);
  }
}

void prepareRelease();
