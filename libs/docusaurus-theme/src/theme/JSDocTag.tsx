import React, { memo } from 'react';
import type { JSDocTagProps, JSDocTagVariant } from '@theme/JSDocTag';
import { Tag } from '@cbhq/cds-web/tag/Tag';

export const JSDOC_TAG_VARIANTS = [
  'beta',
  'danger',
  'deprecated',
  'internal',
  'new',
  'required',
] as const;

const TAG_PROPS = {
  beta: {
    colorScheme: 'yellow',
    intent: 'promotional',
  },
  danger: {
    colorScheme: 'red',
    intent: 'promotional',
  },
  deprecated: {
    colorScheme: 'red',
    intent: 'informational',
  },
  internal: {
    colorScheme: 'blue',
    intent: 'informational',
  },
  new: {
    colorScheme: 'blue',
    intent: 'promotional',
  },
  required: {
    colorScheme: 'gray',
    intent: 'informational',
  },
} as const;

const LABELS: Record<JSDocTagVariant, string> = {
  beta: 'Beta',
  danger: 'Dangerous',
  deprecated: 'Deprecated',
  internal: 'Internal',
  new: 'New',
  required: 'Required',
};

const JSDocTag = memo(function JSDocTag({ variant }: JSDocTagProps) {
  return <Tag {...TAG_PROPS[variant]}>{LABELS[variant] ?? variant}</Tag>;
});

export default JSDocTag;
