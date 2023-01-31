import fs from 'fs';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import uniqBy from 'lodash/uniqBy';
import path from 'path';

import type { OutputDoc, WriteFileConfig } from '../types';
import { getGitInfoForFile } from '../utils/getGitInfoForFile';

async function getGitInfo({
  displayName,
  cacheDirectory,
  filePath: file,
  repoUrl,
  tags,
}: OutputDoc): Promise<WriteFileConfig[]> {
  let logs = await getGitInfoForFile({ file, repoUrl });
  /**
   * If a component heavily relies on another file, you can add jsdoc comment, @changelog, with comma
   * separate paths and we will include those when running git history for the component's changelog tab on website.
   */
  if (tags?.changelog) {
    const otherFiles = tags.changelog
      .split(',')
      .map((item) => item.trim())
      .map((item) => {
        const fileDir = path.dirname(file);
        return path.join(fileDir, item);
      });
    otherFiles.forEach((item) => {
      /**
       * The @changelog JSDoc tagging approach is error prone, so let's have folks fail fast if they put in an inccorect path
       * or a file gets removed.
       */
      if (!fs.existsSync(item)) {
        throw new Error(
          `You have a @changelog tag pointing to the file, ${item}, in ${displayName} which does not exist. Remove or update the path to fix.`,
        );
      }
    });
    await Promise.all(
      otherFiles.map(async (item) => {
        const otherLogs = await getGitInfoForFile({ file: item, repoUrl });
        logs = [...logs, ...otherLogs];
      }),
    );
  }
  /** Ensure sorting most recent to oldest */
  const sortedLogs = orderBy(logs, ['dateIso'], ['desc']);
  /** Avoid showing multiple commits from same PR */
  const uniqLogs = uniqBy(sortedLogs, 'commit');
  /** Group by release */
  const groupedLogs = groupBy(uniqLogs, 'release');
  return [
    {
      dest: path.join(cacheDirectory, 'changelog.mdx'),
      template: 'doc-item/changelog',
      data: groupedLogs,
    },
  ];
}

export async function docgenChangelogBuilder(docsSet: Set<OutputDoc>): Promise<WriteFileConfig[]> {
  const docs = Array.from(docsSet.values());
  return (await Promise.all(docs.map(getGitInfo))).flatMap((item) => [...item]);
}
