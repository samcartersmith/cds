/* eslint-disable import/no-extraneous-dependencies */

import * as glob from 'fast-glob';
import * as fs from 'fs';
import * as path from 'path';
import * as semver from 'semver';

const DS_DIR = path.join(process.cwd(), 'eng/shared/design-system');
const LOG_PREFIX = /^- (\w+)(?:\(([a-zA-Z0-9\-., ]+)\))?:/u;

type VersionBump = 'major' | 'minor' | 'patch';
type LogType = 'breaking' | 'internal' | 'feat' | 'fix' | 'chore' | 'docs' | 'change' | 'types';

interface LogItem {
  bump: VersionBump | null;
  message: string;
  scope: string;
  type: LogType;
}

function determineNextVersion(items: LogItem[], currentVersion: string): string | null {
  const isAlpha = currentVersion.startsWith('0.');
  let major = 0;
  let minor = 0;
  let patch = 0;

  items.forEach(item => {
    if (item.bump === 'major') {
      major += 1;
    } else if (item.bump === 'minor') {
      minor += 1;
    } else if (item.bump === 'patch') {
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

function determineVersionBump(type: LogType): LogItem['bump'] {
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
    case 'internal':
    case 'docs':
      return null;
  }
}

function parseLogItem(line: string): LogItem {
  const match = line.match(LOG_PREFIX);

  if (!match) {
    throw new Error(`Invalid log item "${line}".`);
  }

  const [prefix, type, scope] = match;

  return {
    bump: determineVersionBump(type as LogType),
    message: line.replace(prefix, '').trim(),
    scope,
    type: type as LogType,
  };
}

function extractUnreleasedLogs(contents: string[]) {
  const items: LogItem[] = [];
  let inUnreleased = false;
  let index = -1;
  let startIndex = 0;
  let endIndex = 0;

  for (const line of contents) {
    index += 1;

    if (line === '## [Unreleased]') {
      inUnreleased = true;
      continue;
    } else if (line.startsWith('#') && inUnreleased) {
      inUnreleased = false;
      break;
    }

    if (inUnreleased) {
      if (line) {
        items.push(parseLogItem(line.trim()));
      } else if (!startIndex) {
        startIndex = index + 1;
      } else if (!endIndex) {
        endIndex = index - 1;
      }
    }
  }

  return {
    items,
    startIndex,
    endIndex,
  };
}

function formatLogItems(items: LogItem[], version: string): string[] {
  const groups: Record<VersionBump | 'other', string[]> = {
    major: ['#### 💥 Breaking', ''],
    minor: ['#### 🚀 Updates', ''],
    patch: ['#### 🐞 Fixes', ''],
    other: ['#### 📘 Misc', ''],
  };

  items.forEach(item => {
    let line = item.message;

    if (item.scope) {
      line = `**[${item.scope}]** ${line}`;
    }

    groups[item.bump || 'other'].push(`- ${line}`);
  });

  const block: string[] = [
    `## ${version} (${new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })} PST) [#todo](https://github.cbhq.net/mono/repo/pull/todo)`,
  ];

  Object.values(groups).forEach(group => {
    if (group.length > 2) {
      block.push('', ...group);
    }
  });

  return block;
}

async function updateChangelogAndDetermineNextVersion(
  logPath: string,
  currentVersion: string
): Promise<string | null> {
  const contents = (await fs.promises.readFile(logPath, 'utf8')).split('\n');
  const { items, startIndex } = extractUnreleasedLogs(contents);
  const nextVersion = determineNextVersion(items, currentVersion);

  // No changes, so abort
  if (items.length === 0 || nextVersion === null) {
    return null;
  }

  // Insert new section
  contents.splice(startIndex, items.length, ...formatLogItems(items, nextVersion));

  await fs.promises.writeFile(logPath, contents.join('\n'));

  return nextVersion;
}

async function prepareRelease() {
  const changelogPaths = await glob('*/CHANGELOG.md', {
    absolute: true,
    cwd: DS_DIR,
    ignore: ['_template'],
  });

  await Promise.all(
    changelogPaths.map(async changelogPath => {
      const pkgPath = path.join(path.dirname(changelogPath), 'basepackage.json');
      const pkg = JSON.parse(await fs.promises.readFile(pkgPath, 'utf8'));

      const currentVersion = pkg.version;
      const nextVersion = await updateChangelogAndDetermineNextVersion(
        changelogPath,
        currentVersion
      );

      if (nextVersion !== null) {
        pkg.version = nextVersion;

        await fs.promises.writeFile(pkgPath, JSON.stringify(pkg, null, 2));
      }
    })
  );
}

prepareRelease();
