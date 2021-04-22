/* eslint-disable import/no-extraneous-dependencies */

import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as semver from 'semver';

const DS_DIR = path.join(process.cwd(), 'eng/shared/design-system');
const LOG_PREFIX = /^(?:- )?(\w+)(?:\(([a-zA-Z0-9\-., ]+)\))?:/u;
const AUTHORS: Record<string, string> = {
  'Miles Johnson': '@miles-johnson',
  'Katherine Martinez': '@katherinemartinez',
  'Hannah Jin': '@hannah-jin',
  'Jennifer Liu': '@jennifer-liu',
  'Travis Ueki': '@travis-ueki',
};

type VersionBump = 'major' | 'minor' | 'patch';
/**
 * If no jira ticket exists, replace with 'trivial'
 * [{jira ticket}] {LogType}: {message}
 * ex: [trivial] docs: added new feature docs
 *
 * LogTypes:
 * breaking - major
 * feat, change - minor
 * fix, chore, types - patch
 * release, internal, docs - noop
 *
 */
type LogType =
  | 'breaking'
  | 'internal'
  | 'feat'
  | 'fix'
  | 'chore'
  | 'docs'
  | 'change'
  | 'types'
  | 'release';

interface LogChange {
  bump: VersionBump | null;
  message: string;
  scope: string;
  type: LogType;
}

interface Log {
  sha: string;
  date: Date;
  author: string;
  jira: string[];
  pr: string;
  change: LogChange;
}

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
  } else if (minor > 0) {
    return semver.inc(currentVersion, isAlpha ? 'patch' : 'minor');
  } else if (patch > 0) {
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
      return 'minor';
    case 'fix':
    case 'chore':
    case 'types':
      return 'patch';
    case 'release':
    case 'internal':
    case 'docs':
      return null;
  }
}

function parseCommitTokens(item: string) {
  const jira: string[] = [];
  let message = item;
  let pr = '';

  // Extract JIRA issues
  let jiraMatch;

  while ((jiraMatch = message.match(/\[([A-Z]+-\d+)\]/))) {
    message = message.replace(jiraMatch[0], '').trim();
    jira.push(jiraMatch[1]);
  }

  // Extract PR number
  const prMatch = message.match(/\(#(\d+)\)$/);

  if (prMatch) {
    message = message.replace(prMatch[0], '').trim();
    pr = prMatch[1];
  }

  // Remove all tokens in brackets
  let tokenMatch;

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
    type: type as LogType,
  };
}

function formatLogs(logs: Log[], version: string): string {
  const groups: Record<VersionBump | 'other', string[]> = {
    major: ['#### 💥 Breaking', ''],
    minor: ['#### 🚀 Updates', ''],
    patch: ['#### 🐞 Fixes', ''],
    other: ['#### 📘 Misc', ''],
  };

  logs.forEach(log => {
    let line = log.change.message;

    if (log.change.scope) {
      line = `**[${log.change.scope}]** ${line}`;
    }

    if (log.author && AUTHORS[log.author]) {
      line += ` ${AUTHORS[log.author]}`;
    }

    if (log.pr) {
      line += ` [#${log.pr}](https://github.cbhq.net/mono/repo/pull/${log.pr})`;
    }

    if (log.jira) {
      log.jira.forEach(issue => {
        line += `, [${issue}](https://jira.coinbase-corp.com/browse/${issue})`;
      });
    }

    groups[log.change.bump || 'other'].push(`- ${line}`);
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

  Object.values(groups).forEach(group => {
    if (group.length > 2) {
      block.push('', ...group);
    }
  });

  return block.join('\n');
}

async function updateChangelog(
  pkgPath: string,
  logs: Log[],
  nextVersion: string
): Promise<string | null> {
  const logPath = path.join(pkgPath, 'CHANGELOG.md');
  let contents = await fs.promises.readFile(logPath, 'utf8');

  contents = contents.replace('[Unreleased]', `[Unreleased]\n\n${formatLogs(logs, nextVersion)}`);

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
      }
    );
  });
}

async function releasePackage(pkgName: string) {
  const pkgPath = path.join(DS_DIR, pkgName);
  const pkgJsonPath = path.join(pkgPath, 'basepackage.json');
  const pkg = JSON.parse(await fs.promises.readFile(pkgJsonPath, 'utf8'));

  const logs = await extractGitLogs(pkgPath);

  if (logs.length === 0) {
    console.log(`[${pkgName}] No new commits since last release`);
    return;
  }

  const nextVersion = determineNextVersion(logs, pkg.version);

  if (nextVersion === null) {
    console.log(`[${pkgName}] Nothing to release`);
    return;
  }

  await updateChangelog(pkgPath, logs, nextVersion);

  pkg.version = nextVersion;

  await fs.promises.writeFile(pkgJsonPath, JSON.stringify(pkg, null, 2));

  console.info(`[${pkgName}] Versions and changelog updated, ready for release!`);
}

async function prepareRelease() {
  await Promise.all(
    ['common', 'fonts', 'lottie-files', 'mobile', 'utils', 'web'].map(pkg =>
      releasePackage(pkg).catch(error => {
        console.error(`[${pkg}] FAIL: ${error}`);
      })
    )
  );
}

prepareRelease();
