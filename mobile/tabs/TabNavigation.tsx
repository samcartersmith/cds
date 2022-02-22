import { TabNavigationProps } from '@cbhq/cds-common';
import React, { useMemo, memo } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useScaleDensity } from '@cbhq/cds-common/scale/useScaleDensity';
import { ScaleProvider } from '@cbhq/cds-common/scale/ScaleProvider';
import { Box, HStack, VStack } from '../layout';
import { TabIndicator } from './TabIndicator';
import { useTabLabels } from './hooks/useTabLabels';

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const TabNavigation = memo(
  ({ tabs, value, variant = 'primary', testID, onChange, ...rest }: TabNavigationProps) => {
    const isDense = useScaleDensity() === 'dense';
    const isPrimary = useMemo(() => variant === 'primary', [variant]);
    const shouldOverrideScale = useMemo(() => isDense && isPrimary, [isDense, isPrimary]);
    const { tabLabels, tabIndicatorProps } = useTabLabels({ tabs, value, variant, onChange });

    return (
      <Box testID={testID} overflow="gradient" {...rest}>
        <ScrollView horizontal scrollEventThrottle={1} showsHorizontalScrollIndicator={false}>
          <VStack>
            {shouldOverrideScale ? (
              <ScaleProvider value="large">
                <HStack gap={4}>{tabLabels}</HStack>
              </ScaleProvider>
            ) : (
              <HStack gap={4}>{tabLabels}</HStack>
            )}
            {isPrimary && <TabIndicator {...tabIndicatorProps} />}
          </VStack>
        </ScrollView>
      </Box>
    );
  },
);

TabNavigation.displayName = 'TabNavigation';
