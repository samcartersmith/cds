import type { AdopterConfig, AdopterConfigForSidebar, AdoptersConfig } from '../types';

function excludeHiddenProjects(hiddenProjects: string[]) {
  return (config: AdoptersConfig | AdopterConfig) => {
    if (config.type !== 'category' && hiddenProjects.includes(config.id)) {
      return false;
    }
    return true;
  };
}

export function formatSidebar(config: AdoptersConfig[], hiddenProjects: string[]) {
  function formatNext(item: AdoptersConfig | AdopterConfig) {
    let result: AdoptersConfig | AdopterConfigForSidebar;
    if (item.type === 'category') {
      result = {
        ...item,
        items: item.items.filter(excludeHiddenProjects(hiddenProjects)).map(formatNext),
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

export function formatCUJSidebar(config: AdoptersConfig[]) {
  function formatNext(item: AdoptersConfig) {
    const result: AdoptersConfig | AdopterConfigForSidebar = {
      type: 'doc',
      id: `adoption-tracker/cuj/${item.id}`,
      label: item.label,
    } as AdopterConfigForSidebar;

    return result;
  }

  return config.reduce((prev, next) => {
    return [...prev, formatNext(next)];
  }, [] as AdoptersConfig[]);
}
