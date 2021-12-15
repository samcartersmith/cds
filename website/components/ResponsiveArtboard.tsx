import React, { useState } from 'react';

import { entries } from '@cbhq/cds-utils';
import { Select } from '@cbhq/cds-web/controls/Select';
import { SelectOption } from '@cbhq/cds-web/controls/SelectOption';
import { Box } from '@cbhq/cds-web/layout/Box';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { HStack } from '@cbhq/cds-web/layout/HStack';
import { FeatureFlagProvider, FeatureFlagProviderProps } from '@cbhq/cds-web/system';
import { ThemeProvider } from '@cbhq/cds-web/system/ThemeProvider';
import { Scale, SetState } from '@cbhq/cds-common/types';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { TextLabel1 } from '@cbhq/cds-web/typography';
import { Switch } from '@cbhq/cds-web/controls/Switch';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { Spacer } from '@cbhq/cds-web/layout/Spacer';

type ResponsiveOptions = typeof options;
type ResponsiveId = keyof ResponsiveOptions;

const options = {
  smallMobile: {
    value: 'smallMbile',
    label: 'Small mobile',
    dimensions: { width: 320, height: 568 },
  },
  largeMobile: {
    value: 'largeMobile',
    label: 'Large mobile',
    dimensions: { width: 414, height: 896 },
  },
  tablet: { value: 'tablet', label: 'Tablet', dimensions: { width: 834, height: 1112 } },
  desktop: {
    value: 'desktop',
    label: 'Desktop',
    dimensions: { width: 1280, height: undefined },
  },
} as const;

const scales = ['large', 'xSmall', 'small', 'medium', 'xLarge', 'xxLarge', 'xxxLarge'] as const;

export function ResponsiveArtboard({
  children,
  ...featureFlags
}: {
  children?: React.ReactNode;
} & FeatureFlagProviderProps) {
  const [selectedId, setValue] = useState<ResponsiveId>('largeMobile');
  const [selectedScale, setScale] = useState<Scale>('large');
  const [frontierEnabled, { toggle: toggleFrontier }] = useToggler(true);
  const [darkModeEnabled, { toggle: toggleDarkMode }] = useToggler(false);
  const selected = options[selectedId];
  return (
    <FeatureFlagProvider {...featureFlags} frontier={frontierEnabled}>
      <HStack
        spacing={gutter}
        alignItems="flex-start"
        justifyContent="space-between"
        background="backgroundAlternate"
      >
        <Spacer />
        <ThemeProvider scale={selectedScale} spectrum={darkModeEnabled ? 'dark' : 'light'}>
          <Box
            spacingHorizontal={gutter}
            overflow="scroll"
            background
            bordered
            alignItems="stretch"
            flexWrap="nowrap"
            flexDirection="column"
            {...selected.dimensions}
          >
            {children}
          </Box>
        </ThemeProvider>
        <Spacer />
        <VStack gap={2}>
          <Select
            value={selectedId}
            label="Device size"
            onChange={setValue as unknown as SetState<string>}
            compact
          >
            {entries(options).map(([id, { label }]) => (
              <SelectOption key={id} value={id} title={label} />
            ))}
          </Select>
          <Select
            value={selectedScale}
            label="Scale density"
            onChange={setScale as unknown as SetState<string>}
            compact
          >
            {scales.map((scale) => (
              <SelectOption key={scale} value={scale} title={scale} />
            ))}
          </Select>
          <HStack alignItems="center" gap={1}>
            <Switch onChange={toggleFrontier} checked={frontierEnabled} />
            <TextLabel1 as="p" color="foregroundMuted">
              Frontier
            </TextLabel1>
          </HStack>
          <HStack alignItems="center" gap={1}>
            <Switch onChange={toggleDarkMode} checked={darkModeEnabled} />
            <TextLabel1 as="p" color="foregroundMuted">
              Dark mode
            </TextLabel1>
          </HStack>
        </VStack>
      </HStack>
    </FeatureFlagProvider>
  );
}
