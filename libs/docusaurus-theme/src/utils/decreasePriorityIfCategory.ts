import type { KBarAction, KBarCustomAction } from '@cbhq/docusaurus-plugin-kbar';

export default function decreasePriorityIfCategory<T extends KBarAction | KBarCustomAction>(
  item: T,
) {
  return item.parent ? item : { ...item, priority: -1 };
}
