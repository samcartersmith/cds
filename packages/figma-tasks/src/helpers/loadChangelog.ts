import fs from 'node:fs';
import { logInfo, Task } from '@cbhq/mono-tasks';
import { getAbsolutePath, writePrettyFile } from '@cbhq/script-utils';

import { Changelog } from '../tools/Changelog';

type LoadChangelogTaskOptions = {
  /** The CHANGELOG.md file to document changes to. */
  changelogFile?: string;
};

export async function loadChangelog(task: Task<LoadChangelogTaskOptions>) {
  if (task.options?.changelogFile) {
    const filePath = getAbsolutePath(task, task.options.changelogFile);
    let previousContent = '';
    const exists = fs.existsSync(filePath);

    if (exists) {
      previousContent = await fs.promises.readFile(filePath, 'utf-8');
    } else {
      logInfo('Creating changelog');
      previousContent = ``;
      await writePrettyFile(filePath, previousContent);
    }

    return new Changelog({ filePath, content: previousContent });
  }
  return undefined;
}
