import { TabLabelProps as CommonTabLabelProps } from '@cbhq/cds-common';
import React, { useMemo, memo } from 'react';
import { TextHeadline, TextTitle3 } from '../typography';
import { useSpacingScale } from '../hooks/useSpacingScale';
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

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export type TabLabelProps = CommonTabLabelProps & TextProps;

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const TabLabel = memo(({ active, variant = 'primary', ...props }: TabLabelProps) => {
  const TextElement = useMemo(() => (variant === 'primary' ? TextHeadline : TextTitle3), [variant]);
  const color = useMemo(() => COLORS[variant][active ? 'active' : 'inactive'], [active, variant]);

  // Styles
  const spacing = useSpacingScale();
  const styles = useMemo(
    () =>
      // Only primary tabs need special spacing
      variant === 'primary' && {
        marginTop: spacing[2],
        marginBottom: spacing[2] - 2, // Account for the 2px TabIndicator
      },
    [spacing, variant],
  );

  return <TextElement color={color} {...props} dangerouslySetStyle={styles} />;
});

TabLabel.displayName = 'TabLabel';
