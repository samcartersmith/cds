import { arrayIncludes } from '@cbhq/cds-utils/array';

import { CellPriority } from '../types';

export const hasCellPriority = (
  priorityToMatch: CellPriority,
  priority?: CellPriority | CellPriority[],
) => {
  if (!priority) return false;
  if (Array.isArray(priority)) {
    return arrayIncludes(priority, priorityToMatch);
  }
  return priority === priorityToMatch;
};
