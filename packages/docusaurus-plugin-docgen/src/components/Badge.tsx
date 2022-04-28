import React from 'react';
import { Box } from '@cbhq/cds-web/layout';
import { ThemeProvider } from '@cbhq/cds-web/system';
import { TextCaption } from '@cbhq/cds-web/typography';

export type BadgeVariant = keyof typeof badgePalettes;

type BadgeProps = {
  variant: BadgeVariant;
  order?: number;
};

const badgePalettes = {
  beta: { primary: ['green30', 0.5], primaryForeground: 'gray100' },
  dangerous: { primary: ['red30', 0.5], primaryForeground: 'gray100' },
  deprecated: { primary: ['purple30', 0.5], primaryForeground: 'gray100' },
  internal: { primary: ['blue30', 0.5], primaryForeground: 'gray100' },
  required: { primary: ['yellow30', 0.5], primaryForeground: 'gray100' },
} as const;

const badgeText = {
  beta: 'Beta',
  dangerous: 'Dangerous',
  deprecated: 'Deprecated',
  internal: 'Internal',
  required: 'Required',
} as Record<BadgeVariant, string>;

export function Badge({ variant }: BadgeProps) {
  return (
    <ThemeProvider display="contents" palette={badgePalettes[variant]}>
      <Box width="fit-content" borderRadius="pill" spacing={1} background="primary">
        <TextCaption as="span" transform="none">
          {badgeText[variant] ?? variant}
        </TextCaption>
      </Box>
    </ThemeProvider>
  );
}
