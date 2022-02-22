import { TabLabelProps as CommonTabLabelProps } from '@cbhq/cds-common';
import React, { useMemo, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextHeadline, TextTitle3, TextTitle4 } from '../typography';
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
  const shouldMeasureElement = useMemo(() => !active && variant !== 'primary', [active, variant]);
  const color = useMemo(() => COLORS[variant][active ? 'active' : 'inactive'], [active, variant]);
  const TextElement = useMemo(() => {
    if (variant === 'primary') return TextHeadline;
    if (active) return TextTitle3;

    return TextTitle4;
  }, [active, variant]);

  // Styles
  const spacing = useSpacingScale();
  const dynamicStyles = useMemo(
    () =>
      // Only primary tabs need special spacing
      variant === 'primary' && {
        paddingTop: spacing[2],
        paddingBottom: spacing[2] - 2, // Account for the 2pt TabIndicator
      },
    [spacing, variant],
  );

  return (
    <>
      {shouldMeasureElement ? (
        <View>
          <TextElement color={color} {...props} dangerouslySetStyle={dynamicStyles} />
          {/* This element is used to ensure the element width doesn't change when we change font-weight */}
          <TextTitle3 dangerouslySetStyle={styles.hiddenElement} aria-hidden="true" {...props} />
        </View>
      ) : (
        <TextElement color={color} {...props} dangerouslySetStyle={dynamicStyles} />
      )}
    </>
  );
});

TabLabel.displayName = 'TabLabel';

const styles = StyleSheet.create({
  hiddenElement: {
    opacity: 0,
    width: '100%',
    height: 0,
  },
});
