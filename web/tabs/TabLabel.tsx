import { TabLabelProps as CommonTabLabelProps } from '@cbhq/cds-common';
import React, { useMemo, memo } from 'react';
import { TextHeadline, TextTitle3 } from '../typography';
import { TextProps } from '../typography/TextProps';

const COLORS = {
  primary: {
    active: 'primary',
    inactive: 'foreground',
  },
  secondary: {
    active: 'foreground',
    inactive: 'foregroundMuted',
  },
} as const;

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export type TabLabelProps = CommonTabLabelProps & TextProps;

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const TabLabel = memo(({ active, variant = 'primary', ...props }: TabLabelProps) => {
  const TextElement = useMemo(() => (variant === 'primary' ? TextHeadline : TextTitle3), [variant]);
  const color = useMemo(() => COLORS[variant][active ? 'active' : 'inactive'], [active, variant]);

  return <TextElement as="h2" color={color} {...props} />;
});

TabLabel.displayName = 'TabLabel';
