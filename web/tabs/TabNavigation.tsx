import { TabNavigationProps } from '@cbhq/cds-common';
import { noop } from '@cbhq/cds-utils';
import React, { useMemo, memo } from 'react';
import { useScaleDensity } from '@cbhq/cds-common/scale/useScaleDensity';
import { ScaleProvider } from '@cbhq/cds-common/scale/ScaleProvider';
import { HStack, VStack } from '../layout';
import { TabIndicator } from './TabIndicator';
import { useTabLabels } from './hooks/useTabLabels';

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const TabNavigation = memo(
  ({
    tabs,
    defaultTab = '',
    variant = 'primary',
    testID,
    onChange = noop,
    ...rest
  }: TabNavigationProps) => {
    const isDense = useScaleDensity() === 'dense';
    const isPrimary = useMemo(() => variant === 'primary', [variant]);
    const shouldOverrideScale = useMemo(() => isDense && isPrimary, [isDense, isPrimary]);
    const { tabLabels, tabIndicatorProps } = useTabLabels({ tabs, defaultTab, variant, onChange });

    return (
      <VStack testID={testID} {...rest} spacing={0}>
        {shouldOverrideScale ? (
          <ScaleProvider value="large">
            <HStack role="tablist" gap={4} flexShrink={0}>
              {tabLabels}
            </HStack>
          </ScaleProvider>
        ) : (
          <HStack role="tablist" gap={4} flexShrink={0}>
            {tabLabels}
          </HStack>
        )}
        {isPrimary && <TabIndicator {...tabIndicatorProps} />}
      </VStack>
    );
  },
);

TabNavigation.displayName = 'TabNavigation';
