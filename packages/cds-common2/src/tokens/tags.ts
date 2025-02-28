import { ThemeVars } from '../core/theme';
import { TagColorScheme, TagIntent } from '../types/TagBaseProps';

export const horizontalSpacing = {
  informational: 0.5,
  promotional: 1,
} as const;

type TagColorMap = Record<
  TagIntent,
  Record<
    TagColorScheme,
    { background: ThemeVars.SpectrumColor; foreground: ThemeVars.SpectrumColor }
  >
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
      foreground: 'green0',
    },
    blue: {
      background: 'blue60',
      foreground: 'blue0',
    },
    yellow: {
      background: 'yellow30',
      foreground: 'yellow70',
    },
    purple: {
      background: 'purple80',
      foreground: 'purple0',
    },
    red: {
      background: 'red60',
      foreground: 'red0',
    },
    gray: {
      background: 'gray80',
      foreground: 'gray10',
    },
  },
};

export const spacing = {
  '0': 'var(--space-0)',
  '1': 'var(--space-1)',
  '2': 'var(--space-2)',
  '3': 'var(--space-3)',
  '4': 'var(--space-4)',
  '5': 'var(--space-5)',
  '6': 'var(--space-6)',
  '7': 'var(--space-7)',
  '8': 'var(--space-8)',
  '9': 'var(--space-9)',
  '10': 'var(--space-10)',
  '0.5': 'var(--space-0\\.5)',
  '1.5': 'var(--space-1\\.5)',
};
