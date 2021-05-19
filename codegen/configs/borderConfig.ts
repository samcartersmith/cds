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

export const borderWidthConfig = {
  button: 1,
  card: 1,
  checkbox: 2,
  radio: 2,
  sparkline: 2,
  focusRing: 2,
};

export const borderWidthCss = mapValues(borderWidthConfig, val => {
  return {
    'border-width': `${val}px`,
  };
});
