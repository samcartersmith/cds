import path from 'node:path';
import { Task } from '@cbhq/mono-tasks';

export function getAbsolutePath<T, PathValue extends string | undefined>(
  task: Partial<Task<T>>,
  pathValue: PathValue,
): PathValue {
  if (pathValue) {
    if (typeof task.projectRoot === 'string' && typeof task.workspace?.root === 'string') {
      const absolutePath = pathValue.startsWith('./')
        ? path.resolve(task.projectRoot, pathValue)
        : path.resolve(task.workspace?.root as unknown as string, pathValue);
      return absolutePath as any;
    }

    const absolutePath = pathValue.startsWith('./')
      ? task.projectRoot?.append(pathValue).toString()
      : task.workspace?.root.append(pathValue).toString();

    return absolutePath as PathValue;
  }
  return undefined as PathValue;
}
