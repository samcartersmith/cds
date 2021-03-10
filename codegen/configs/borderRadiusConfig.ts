import { mapValues } from '@cbhq/cds-utils';

export const borderRadiusConfig = {
  compact: 4,
  standard: 8,
  pill: 18,
  round: '50%',
};

export const borderRadiusCss = mapValues(borderRadiusConfig, val => {
  return {
    'border-radius': typeof val === 'string' ? val : `${val}px`,
  };
});
