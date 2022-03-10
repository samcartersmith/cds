import type { AdopterConfig, AdopterConfigForSidebar,AdoptersConfig } from '../types';

export function formatSidebar(config: AdoptersConfig[]) {
  function formatNext(item: AdoptersConfig | AdopterConfig) {
    let result: AdoptersConfig | AdopterConfigForSidebar;
    if (item.type === 'category') {
      result = {
        ...item,
        items: item.items.map(formatNext),
      };
    } else {
      result = {
        type: item.type,
        id: `adoption-tracker/${item.id}`,
        label: item.label,
      } as AdopterConfigForSidebar;
    }
    return result;
  }

  return config.reduce((prev, next) => {
    return [...prev, formatNext(next)];
  }, [] as AdoptersConfig[]);
}
