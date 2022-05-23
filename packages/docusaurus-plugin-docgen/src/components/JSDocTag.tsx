import React from 'react';
import { Box } from '@cbhq/cds-web/layout';
import { ThemeProvider } from '@cbhq/cds-web/system';
import { TextLabel1 } from '@cbhq/cds-web/typography';

export const JSDOC_TAG_VARIANTS = [
  'beta',
  'danger',
  'deprecated',
  'internal',
  'new',
  'required',
] as const;

export type JSDocTagVariant = typeof JSDOC_TAG_VARIANTS[number];

type JSDocTagProps = {
  variant: JSDocTagVariant;
  order?: number;
};

const JSDOC_TAG_HEIGHT = 24;

const JSDOC_TAG_STYLES = {
  padding: '2px 6px 2px 6px',
  borderRadius: JSDOC_TAG_HEIGHT,
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
  internal: COLOR_PRESETS.red,
  new: COLOR_PRESETS.blue,
  required: COLOR_PRESETS.blue,
} as const;

const LABELS: Record<JSDocTagVariant, string> = {
  beta: 'Beta',
  danger: 'Dangerous',
  deprecated: 'Deprecated',
  internal: 'Internal',
  new: 'New',
  required: 'Required',
};

export function JSDocTag({ variant }: JSDocTagProps) {
  return (
    <ThemeProvider display="contents" palette={BADGE_PALETTES[variant]}>
      <Box
        width="fit-content"
        height={JSDOC_TAG_HEIGHT}
        background="primary"
        dangerouslySetStyle={JSDOC_TAG_STYLES}
      >
        <TextLabel1 as="span" transform="none" color="primaryForeground">
          {LABELS[variant] ?? variant}
        </TextLabel1>
      </Box>
    </ThemeProvider>
  );
}
