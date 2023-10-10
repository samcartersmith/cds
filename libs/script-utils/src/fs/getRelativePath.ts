import path from 'node:path';
import { Task } from '@cbhq/mono-tasks';

export function getRelativePath(task: Task, filePath: string) {
  const relativeFilePath = path.relative(task.projectRoot.toString(), filePath);
  return `./${relativeFilePath}`;
}
