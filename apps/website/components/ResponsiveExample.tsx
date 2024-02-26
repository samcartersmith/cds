import React, { useState } from 'react';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { Scale, SetState } from '@cbhq/cds-common/types';
import { entries } from '@cbhq/cds-utils';
import { Select } from '@cbhq/cds-web/controls/Select';
import { SelectOption } from '@cbhq/cds-web/controls/SelectOption';
import { Switch } from '@cbhq/cds-web/controls/Switch';
import { Box } from '@cbhq/cds-web/layout/Box';
import { HStack } from '@cbhq/cds-web/layout/HStack';
import { Spacer } from '@cbhq/cds-web/layout/Spacer';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { FeatureFlagProvider, FeatureFlagProviderProps } from '@cbhq/cds-web/system';
import { ThemeProvider } from '@cbhq/cds-web/system/ThemeProvider';
import { TextLabel1 } from '@cbhq/cds-web/typography';

type ResponsiveOptions = typeof options;
type ResponsiveId = keyof ResponsiveOptions;

const options = {
  smallMobile: {
    value: 'smallMbile',
    label: 'Small mobile',
    dimensions: { width: 320, maxHeight: 568 },
  },
  largeMobile: {
    value: 'largeMobile',
    label: 'Large mobile',
    dimensions: { width: 414, maxHeight: 896 },
  },
  tablet: { value: 'tablet', label: 'Tablet', dimensions: { width: 834, maxHeight: 1112 } },
} as const;

const scales = ['large', 'xSmall', 'small', 'medium', 'xLarge', 'xxLarge', 'xxxLarge'] as const;

export function ResponsiveExample({
  children,
  notInLiveEditor = false,
  noSpacing,
  ...featureFlags
}: {
  children?: React.ReactNode;
  notInLiveEditor?: boolean;
  noSpacing?: boolean;
} & FeatureFlagProviderProps) {
  const [selectedId, setValue] = useState<ResponsiveId>('largeMobile');
  const [selectedScale, setScale] = useState<Scale>('large');
  const [darkModeEnabled, { toggle: toggleDarkMode }] = useToggler(false);
  const selected = options[selectedId];
  const ControlsWrapper = notInLiveEditor ? VStack : HStack;
  return (
    <FeatureFlagProvider {...featureFlags}>
      <Box
        alignItems="flex-start"
        background="backgroundAlternate"
        flexDirection={notInLiveEditor ? 'row' : 'column-reverse'}
        justifyContent="space-between"
        spacing={gutter}
      >
        <Spacer />
        <ThemeProvider scale={selectedScale} spectrum={darkModeEnabled ? 'dark' : 'light'}>
          <Box
            background
            bordered
            alignItems="stretch"
            flexDirection="column"
            flexWrap="nowrap"
            overflow="scroll"
            spacing={gutter}
            {...selected.dimensions}
          >
            {children}
          </Box>
        </ThemeProvider>
        <Spacer />
        <ControlsWrapper
          gap={2}
          spacingBottom={notInLiveEditor ? 0 : 3}
          width={notInLiveEditor ? undefined : '100%'}
        >
          <Select
            compact
            label="Device"
            onChange={setValue as unknown as SetState<string>}
            value={selectedId}
          >
            {entries(options).map(([id, { label }]) => (
              <SelectOption key={id} title={label} value={id} />
            ))}
          </Select>
          <Select
            compact
            label="Scale"
            onChange={setScale as unknown as SetState<string>}
            value={selectedScale}
          >
            {scales.map((scale) => (
              <SelectOption key={scale} title={scale} value={scale} />
            ))}
          </Select>
          <HStack alignItems="center" flexShrink={0} gap={1}>
            <Switch checked={darkModeEnabled} onChange={toggleDarkMode} />
            <TextLabel1 as="p" color="foregroundMuted">
              Dark mode
            </TextLabel1>
          </HStack>
        </ControlsWrapper>
      </Box>
    </FeatureFlagProvider>
  );
}
