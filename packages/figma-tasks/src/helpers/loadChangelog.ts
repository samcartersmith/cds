import fs from 'node:fs';
import { logInfo, Task } from '@cbhq/mono-tasks';
import { existsOrCreateDir, getAbsolutePath } from '@cbhq/script-utils';

import { Changelog } from '../tools/Changelog';

type LoadChangelogTaskOptions = {
  /** The CHANGELOG.md file to document changes to. */
  changelogFile?: string;
};

export async function loadChangelog(task: Task<LoadChangelogTaskOptions>) {
  if (task.options?.changelogFile) {
    const filePath = getAbsolutePath(task, task.options.changelogFile);
    let previousContent = '';
    const existed = await existsOrCreateDir(filePath);

    if (existed) {
      previousContent = await fs.promises.readFile(filePath, 'utf-8');
    } else {
      logInfo('Creating changelog');
      previousContent = ``;
      await fs.promises.writeFile(filePath, previousContent);
    }

    return new Changelog({ filePath, content: previousContent });
  }
  return undefined;
}
