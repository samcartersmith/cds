import { Task } from '@cbhq/mono-tasks';

import { getAbsolutePath } from './getAbsolutePath';
import { writePrettyFile } from './writePrettyFile';

export function fileGenerator(task: Task) {
  return async function generateFile(filePath: string, content: string) {
    const contentHeader = `
    /**
    * DO NOT MODIFY
    * Generated from yarn nx run ${task.projectName}:${task.targetName}
    */
   `;

    const finalContent = `
      ${contentHeader}
    
      ${content}
    `;
    const absoluteFilePath = getAbsolutePath(task, filePath);
    return writePrettyFile(absoluteFilePath, finalContent);
  };
}
