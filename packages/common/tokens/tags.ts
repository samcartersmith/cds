import { PaletteValue } from '../types';
import { ColorScheme, TagIntent } from '../types/TagBaseProps';

export const horizontalSpacing = {
  informational: 0.5,
  promotional: 1,
} as const;

type TagColorMap = Record<
  TagIntent,
  Record<ColorScheme, { background: PaletteValue; foreground: PaletteValue }>
>;
export const tagColorMap: TagColorMap = {
  informational: {
    green: {
      background: 'green0',
      foreground: 'green60',
    },
    blue: {
      background: 'blue0',
      foreground: 'blue60',
    },
    yellow: {
      background: 'yellow0',
      foreground: 'yellow70',
    },
    purple: {
      background: 'purple0',
      foreground: 'purple80',
    },
    red: {
      background: 'red0',
      foreground: 'red60',
    },
    gray: {
      background: 'gray10',
      foreground: 'gray80',
    },
  },
  promotional: {
    green: {
      background: 'green60',
      foreground: 'gray0',
    },
    blue: {
      background: 'blue60',
      foreground: 'gray0',
    },
    yellow: {
      background: 'yellow30',
      foreground: 'yellow80',
    },
    purple: {
      background: 'purple80',
      foreground: 'gray0',
    },
    red: {
      background: 'red60',
      foreground: 'gray0',
    },
    gray: {
      background: 'gray80',
      foreground: 'gray10',
    },
  },
};
