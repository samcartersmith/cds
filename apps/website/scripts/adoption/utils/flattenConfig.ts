import type { AdopterConfig, AdoptersConfig } from '../types';

export function flattenConfig(config: AdoptersConfig[]) {
  const flattened: AdopterConfig[] = [];

  function flatten(
    items: AdoptersConfig['items'],
    outputArray?: AdoptersConfig['items'],
    category?: string,
  ) {
    items.forEach((item) => {
      if (item.type === 'category') {
        flatten(item.items, outputArray, item.label);
      } else {
        flattened.push({ ...item, pillar: category });
      }
    });
  }
  flatten(config);
  return flattened;
}

type SimplifiedAdopterConfig = {
  id: string;
  label: string;
  pillar?: string;
};

export function flattenCategories(config: AdoptersConfig[]): SimplifiedAdopterConfig[] {
  const flattenedCategories: SimplifiedAdopterConfig[] = [];

  function flatten(items: AdoptersConfig[]) {
    items.forEach((item) => {
      if (item.type === 'category') {
        // Push only category-level information
        flattenedCategories.push({ id: item.id ?? 'default', label: item.label });
      }
    });
  }

  flatten(config);
  return flattenedCategories;
}
