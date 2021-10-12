import { mapValues } from '@cbhq/cds-utils';

export const borderRadiusConfig = {
  none: 0,
  compact: 4,
  standard: 8,
  badge: 9,
  tooltip: 12,
  pill: 18,
  round: 100,
  input: 8,
};

export const borderRadiusCss = mapValues(borderRadiusConfig, (val) => {
  return {
    'border-radius': typeof val === 'string' || val === 0 ? val : `${val}px`,
  };
});

export const borderWidthConfig = {
  none: 0,
  button: 1,
  card: 1,
  checkbox: 2,
  radio: 2,
  sparkline: 2,
  focusRing: 2,
  input: 1,
};

export const borderWidthCss = mapValues(borderWidthConfig, (val) => {
  return val ? { 'border-width': `${val}px` } : { 'border-width': 0 };
});
