import React from 'react';
import { Box } from '@cbhq/cds-web/layout';
import { ThemeProvider } from '@cbhq/cds-web/system';
import { TextLabel1 } from '@cbhq/cds-web/typography';

export const BADGE_VARIANTS = [
  'beta',
  'danger',
  'deprecated',
  'internal',
  'new',
  'required',
] as const;

export type BadgeVariant = typeof BADGE_VARIANTS[number];

type BadgeProps = {
  variant: BadgeVariant;
  order?: number;
};

const BADGE_SPACING = {
  padding: '2px 4px 2px 4px',
};

const COLOR_PRESETS = {
  blue: { primary: 'blue0', primaryForeground: 'blue60' },
  green: { primary: 'green0', primaryForeground: 'green60' },
  red: { primary: 'red0', primaryForeground: 'red60' },
} as const;

const BADGE_PALETTES = {
  beta: COLOR_PRESETS.green,
  danger: COLOR_PRESETS.red,
  deprecated: COLOR_PRESETS.red,
  internal: COLOR_PRESETS.blue,
  new: COLOR_PRESETS.green,
  required: COLOR_PRESETS.blue,
} as const;

const BADGE_TEXT: Record<BadgeVariant, string> = {
  beta: 'Beta',
  danger: 'Dangerous',
  deprecated: 'Deprecated',
  internal: 'Internal',
  new: 'New',
  required: 'Required',
};

export function Badge({ variant }: BadgeProps) {
  return (
    <ThemeProvider display="contents" palette={BADGE_PALETTES[variant]}>
      <Box
        width="fit-content"
        borderRadius="roundedSmall"
        height={24}
        background="primary"
        dangerouslySetStyle={BADGE_SPACING}
      >
        <TextLabel1 as="span" transform="none" color="primaryForeground">
          {BADGE_TEXT[variant] ?? variant}
        </TextLabel1>
      </Box>
    </ThemeProvider>
  );
}
