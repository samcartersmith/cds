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

export const VARIANTS = ['positive', 'negative'] as const;
export const PLACEMENTS = ['top-start', 'top-end', 'bottom-start', 'bottom-end'] as const;
export const SIZES = ['xs', 's', 'm', 'l'] as const;

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
          <Box spacing={1} key={`DotCount-${count}`}>
            <DotCount count={count} variant="positive" />
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
      <>
        {VARIANTS.map((variant) => (
          <VStack gap={1} key={`DotCount-variant-${variant}`}>
            <DotCount variant={variant} count={30} />
          </VStack>
        ))}
      </>
    );
  };

  const DotStatusColorVariant = () => {
    return (
      <>
        {VARIANTS.map((variant) => (
          <VStack gap={1} key={`DotStatusColor-variant-${variant}`}>
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
          <VStack gap={1} key={`DotStatusColor-size-${size}`}>
            <DotStatusColor variant="negative" size={size} />
          </VStack>
        ))}
      </>
    );
  };

  const DotCountPlacements = () => {
    return (
      <>
        {PLACEMENTS.map((placement) => (
          <VStack gap={4} spacing={1} key={`DotCount-placement-${placement}`} spacingBottom={4}>
            <TextLabel1>{placement}</TextLabel1>
            <DotCount variant="positive" placement={placement} count={30}>
              <Avatar size="xxxl" alt="Sneezy" />
            </DotCount>
            <DotCount variant="positive" placement={placement} count={30}>
              <Avatar size="xl" alt="Sneezy" />
            </DotCount>
            <DotCount variant="positive" placement={placement} count={1}>
              <Icon name="airdrop" size="l" />
            </DotCount>
          </VStack>
        ))}
      </>
    );
  };

  const DotStatusColorPlacements = () => {
    return (
      <>
        {PLACEMENTS.map((placement) => (
          <VStack
            gap={4}
            spacing={1}
            key={`DotStatusColor-placement-${placement}`}
            spacingBottom={4}
          >
            <TextLabel1>{placement}</TextLabel1>
            <DotStatusColor variant="positive" placement={placement}>
              <Avatar size="xxxl" alt="Sneezy" />
            </DotStatusColor>
            <DotStatusColor variant="positive" placement={placement}>
              <Avatar size="xxl" alt="Sneezy" />
            </DotStatusColor>
            <DotStatusColor variant="positive" placement={placement}>
              <Icon name="airdrop" size="l" />
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
