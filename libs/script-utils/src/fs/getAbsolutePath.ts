import { Task } from '@cbhq/mono-tasks';

export function getAbsolutePath<T, PathValue extends string | undefined>(
  task: Task<T>,
  pathValue: PathValue,
): PathValue {
  if (pathValue) {
    const absolutePath = pathValue.startsWith('./')
      ? task.projectRoot.append(pathValue).toString()
      : task.workspace.root.append(pathValue).toString();

    return absolutePath as PathValue;
  }
  return undefined as PathValue;
}
