import { mapValues } from '@cbhq/cds-utils';

export const borderRadiusConfig = {
  compact: 4,
  standard: 8,
  badge: 9,
  tooltip: 12,
  pill: 18,
  round: 100,
};

export const borderRadiusCss = mapValues(borderRadiusConfig, val => {
  return {
    'border-radius': typeof val === 'string' ? val : `${val}px`,
  };
});
