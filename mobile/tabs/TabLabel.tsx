import { TabLabelProps as CommonTabLabelProps } from '@cbhq/cds-common';
import React, { useMemo, memo } from 'react';
import { TextHeadline, TextTitle3 } from '../typography';
import { TextProps } from '../typography/createText';

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

export type TabLabelProps = CommonTabLabelProps & TextProps;
export const TabLabel = memo(({ active, variant = 'primary', ...props }: TabLabelProps) => {
  const TextElement = useMemo(() => (variant === 'primary' ? TextHeadline : TextTitle3), [variant]);
  const color = useMemo(() => COLORS[variant][active ? 'active' : 'inactive'], [active, variant]);

  return <TextElement color={color} {...props} />;
});

TabLabel.displayName = 'TabLabel';
