import path from 'path';
import type { OutputDoc, WriteFileConfig } from '@cbhq/docusaurus-plugin-docgen';

import { getGitInfoForFile } from '../utils/getGitInfoForFile';

async function getGitInfo({
  cacheDirectory,
  filePath: file,
  repoUrl,
}: OutputDoc): Promise<WriteFileConfig[]> {
  const logs = await getGitInfoForFile({ file, repoUrl });
  return [
    {
      dest: path.join(cacheDirectory, 'changelog.mdx'),
      template: 'doc-item/changelog',
      data: logs,
    },
    {
      data: logs.map((item) => ({ id: item.sha, level: 3, value: item.tocDate })),
      dest: path.join(cacheDirectory, 'toc-changelog.js'),
      template: 'shared/objectMap',
    },
  ];
}

export async function docgenChangelogBuilder(docsSet: Set<OutputDoc>): Promise<WriteFileConfig[]> {
  const docs = Array.from(docsSet.values());
  return (await Promise.all(docs.map(getGitInfo))).flatMap((item) => [...item]);
}
