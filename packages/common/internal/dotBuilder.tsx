import React, { ComponentType } from 'react';

import type {
  AvatarBaseProps,
  BoxBaseProps,
  DotBaseProps,
  DotCountBaseProps,
  IconBaseProps,
  IconName,
  StackBaseProps,
  TextBaseProps,
} from '../types';

export const VARIANTS = ['positive', 'negative', 'primary', 'foregroundMuted'] as const;
export const PIN_DIRECTIONS = ['top-start', 'top-end', 'bottom-start', 'bottom-end'] as const;
export const SIZES = ['s', 'm', 'l'] as const;

export function dotBuilder(
  DotCount: ComponentType<DotCountBaseProps>,
  DotStatusColor: ComponentType<DotBaseProps>,
  Box: ComponentType<BoxBaseProps>,
  Avatar: ComponentType<AvatarBaseProps>,
  TextLabel1: ComponentType<TextBaseProps>,
  Icon: ComponentType<IconBaseProps & { name: IconName }>,
  VStack: ComponentType<BoxBaseProps & StackBaseProps>,
) {
  const DotCountBasic = () => {
    const counts = [1, 100, 30, 2, 0, 99];
    return (
      <>
        {counts.map((count) => (
          <Box alignItems="flex-start" spacing={1} key={`DotCount-${count}`}>
            <DotCount count={count} />
          </Box>
        ))}
      </>
    );
  };

  const DotStatusColorBasic = () => {
    return <DotStatusColor variant="positive" />;
  };

  const DotCountVariant = () => {
    return (
      <VStack alignItems="flex-start" gap={1} key="DotCount-variant-negative">
        <DotCount variant="negative" count={30} />
      </VStack>
    );
  };

  const DotStatusColorVariant = () => {
    return (
      <>
        {VARIANTS.map((variant) => (
          <VStack alignItems="flex-start" gap={1} key={`DotStatusColor-variant-${variant}`}>
            <DotStatusColor variant={variant} />
          </VStack>
        ))}
      </>
    );
  };

  const DotStatusColorSizes = () => {
    return (
      <>
        {SIZES.map((size) => (
          <VStack alignItems="flex-start" gap={1} key={`DotStatusColor-size-${size}`}>
            <DotStatusColor variant="negative" size={size} />
          </VStack>
        ))}
      </>
    );
  };

  const DotCountPlacements = () => {
    return (
      <VStack
        alignItems="flex-start"
        gap={4}
        spacing={1}
        key="DotCount-placement-top-end"
        spacingBottom={4}
      >
        <TextLabel1>top-end</TextLabel1>
        <DotCount pin="top-end" count={30}>
          <Avatar size="xl" shape="square" alt="Sneezy" />
        </DotCount>
        <DotCount pin="top-end" count={30}>
          <Avatar size="l" shape="square" alt="Sneezy" />
        </DotCount>
        <DotCount pin="top-end" count={1}>
          <Icon name="calendar" size="m" />
        </DotCount>
        <DotCount pin="top-end" count={0}>
          <TextLabel1>Count = 0. Dot should not show up</TextLabel1>
          <Icon name="calendar" size="m" />
        </DotCount>
      </VStack>
    );
  };

  const DotStatusColorPlacements = () => {
    return (
      <>
        {PIN_DIRECTIONS.map((pinDirection) => (
          <VStack
            gap={4}
            spacing={1}
            alignItems="flex-start"
            key={`DotStatusColor-placement-${pinDirection}`}
            spacingBottom={4}
          >
            <TextLabel1>{pinDirection}</TextLabel1>
            <DotStatusColor variant="positive" pin={pinDirection}>
              <Avatar shape="square" size="l" alt="Sneezy" />
            </DotStatusColor>
            <DotStatusColor variant="positive" pin={pinDirection}>
              <Avatar shape="square" size="xxl" alt="Sneezy" />
            </DotStatusColor>
            <DotStatusColor variant="positive" pin={pinDirection}>
              <Icon name="calendar" size="l" />
            </DotStatusColor>
          </VStack>
        ))}
      </>
    );
  };

  return {
    DotCountBasic,
    DotStatusColorBasic,
    DotCountVariant,
    DotStatusColorVariant,
    DotStatusColorSizes,
    DotCountPlacements,
    DotStatusColorPlacements,
  };
}
