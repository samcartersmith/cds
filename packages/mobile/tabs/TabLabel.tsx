import React, { memo, useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { TabLabelProps as CommonTabLabelProps } from '@cbhq/cds-common';

import { DotCount } from '../dots/DotCount';
import { useSpacingScale } from '../hooks/useSpacingScale';
import { HStack } from '../layout';
import { TextHeadline, TextTitle3, TextTitle4 } from '../typography';
import { TextProps } from '../typography/createText';

import { useDotAnimation } from './hooks/useDotAnimation';

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
export const TabLabel = memo(
  ({ active, variant = 'primary', count = 0, ...props }: TabLabelProps) => {
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

    // ⚡️ Side effects
    const lastCount = useRef(0);
    const { animateIn, animateOut, width, opacity } = useDotAnimation();
    useEffect(() => {
      // Animate dotBadge in
      if (count && lastCount.current !== count) animateIn(count);
      if (!count && lastCount.current !== count) animateOut(count);

      lastCount.current = count;
    }, [count, animateIn, animateOut]);

    // Memoized dot Styles
    const dotStyles = useMemo(
      () => ({ container: { width }, inner: { opacity, marginLeft: spacing[0.5] } }),
      [opacity, spacing, width],
    );

    return (
      <HStack alignItems="center">
        {shouldMeasureElement ? (
          <View>
            <TextElement color={color} {...props} dangerouslySetStyle={dynamicStyles} />
            {/* This element is used to ensure the element width doesn't change when we change font-weight */}
            <TextTitle3 dangerouslySetStyle={styles.hiddenElement} aria-hidden="true" {...props} />
          </View>
        ) : (
          <TextElement color={color} {...props} dangerouslySetStyle={dynamicStyles} />
        )}
        <Animated.View style={dotStyles.container}>
          <Animated.View style={dotStyles.inner}>
            <DotCount count={count} />
          </Animated.View>
        </Animated.View>
      </HStack>
    );
  },
);

TabLabel.displayName = 'TabLabel';

const styles = StyleSheet.create({
  hiddenElement: {
    opacity: 0,
    width: '100%',
    height: 0,
  },
});
