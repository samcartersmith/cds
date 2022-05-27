import React, { ComponentType } from 'react';

import { avatarIconSizeMap } from '../tokens/dot';
import type {
  AvatarBaseProps,
  BoxBaseProps,
  DotBaseProps,
  DotCountBaseProps,
  DotSymbolBaseProps,
  IconBaseProps,
  IconName,
  StackBaseProps,
  TextBaseProps,
} from '../types';

import { assets } from './data/assets';
import { avatarSizes } from './data/avatars';
import { iconSizes } from './data/iconData';

export const VARIANTS = ['positive', 'negative', 'primary', 'foregroundMuted'] as const;
export const PIN_DIRECTIONS = ['top-start', 'top-end', 'bottom-start', 'bottom-end'] as const;
export const SIZES = ['s', 'm', 'l'] as const;

export function dotBuilder(
  DotCount: ComponentType<DotCountBaseProps>,
  DotStatusColor: ComponentType<DotBaseProps>,
  DotSymbol: ComponentType<
    DotSymbolBaseProps & {
      source?: string;
    }
  >,
  Box: ComponentType<BoxBaseProps>,
  Avatar: ComponentType<AvatarBaseProps>,
  TextLabel1: ComponentType<TextBaseProps>,
  TextLegal: ComponentType<TextBaseProps>,
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

  const DotCountOverlap = () => {
    return (
      <>
        <DotCount variant="negative" count={1} overlap="circular" pin="top-end">
          <Avatar shape="circle" size="l" alt="Sneezy" />
        </DotCount>
        <DotCount variant="negative" count={30} overlap="circular" pin="top-end">
          <Avatar shape="circle" size="xl" alt="Sneezy" />
        </DotCount>
        <DotCount variant="negative" count={100} overlap="circular" pin="top-end">
          <Avatar shape="circle" size="xxl" alt="Sneezy" />
        </DotCount>
        <DotCount variant="negative" count={99} overlap="circular" pin="top-end">
          <Avatar shape="circle" size="xxxl" alt="Sneezy" />
        </DotCount>
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

  const DotStatusColorOverlap = () => {
    return (
      <>
        {PIN_DIRECTIONS.map((pinDirection) =>
          avatarSizes.map((avatarSize) => (
            <VStack
              gap={4}
              spacing={1}
              alignItems="flex-start"
              key={`DotStatusColor-overlap-${pinDirection}-${avatarSize}`}
              spacingBottom={4}
            >
              <TextLabel1>
                {pinDirection}, avatarSize: {avatarSize}
              </TextLabel1>
              <DotStatusColor overlap="circular" variant="positive" pin={pinDirection}>
                <Avatar shape="circle" size={avatarSize} alt="Unknown avatar circle" />
              </DotStatusColor>
            </VStack>
          )),
        )}
      </>
    );
  };

  const DotSymbolPlacements = () => {
    return (
      <>
        {PIN_DIRECTIONS.map((pinDirection) => (
          <VStack
            alignItems="flex-start"
            gap={4}
            spacing={1}
            key={`dotsymbol-placement-${pinDirection}`}
            spacingBottom={4}
          >
            <TextLabel1>{pinDirection}</TextLabel1>
            <DotSymbol size="m" pin={pinDirection} source={assets.eth.imageUrl}>
              <Avatar shape="square" size="xxxl" alt="Sneezy" />
            </DotSymbol>
            <DotSymbol size="m" pin={pinDirection} source={assets.eth.imageUrl}>
              <Avatar shape="square" size="xl" alt="Sneezy" />
            </DotSymbol>
            <DotSymbol size="m" pin={pinDirection} source={assets.eth.imageUrl}>
              <Icon name="airdrop" size="l" />
            </DotSymbol>
          </VStack>
        ))}
      </>
    );
  };

  const DotSymbolSizes = () => {
    return (
      <>
        {SIZES.map((size) => (
          <VStack alignItems="flex-start" gap={1} key={`dotsymbol-size-${size}`}>
            <DotSymbol source={assets.eth.imageUrl} size={size} />
          </VStack>
        ))}
      </>
    );
  };

  const DotSymbolIcon = () => {
    return (
      <>
        {PIN_DIRECTIONS.map((pinDirection) =>
          avatarSizes.map((avatarSize) => (
            <VStack
              alignItems="flex-start"
              gap={4}
              spacing={1}
              key={`dotsymbol-icons-${pinDirection}-${avatarSize}`}
              spacingBottom={4}
            >
              <TextLabel1>
                Pin Direction: {pinDirection} Avatar Size: {avatarSize} Icon Size:{' '}
                {avatarIconSizeMap[avatarSize]}
              </TextLabel1>
              <DotSymbol
                overlap="circular"
                size={avatarIconSizeMap[avatarSize]}
                pin={pinDirection}
                iconName="safe"
              >
                <Avatar src={assets.eth.imageUrl} size={avatarSize} alt="Ethereum asset logo" />
              </DotSymbol>
            </VStack>
          )),
        )}
      </>
    );
  };

  const DotSymbolOverlap = () => {
    return (
      <>
        {PIN_DIRECTIONS.map((pinDirection) =>
          iconSizes.map((size) => (
            <VStack
              alignItems="flex-start"
              gap={4}
              spacing={1}
              key={`dotsymbol-overlap-${size}-${pinDirection}`}
              spacingBottom={4}
            >
              <TextLabel1>
                {pinDirection}, dot-size: {size}
              </TextLabel1>
              <DotSymbol
                overlap="circular"
                size={size}
                pin={pinDirection}
                source={assets.ada.imageUrl}
              >
                <Avatar src={assets.eth.imageUrl} size="xxxl" alt="Sneezy" />
              </DotSymbol>
            </VStack>
          )),
        )}
      </>
    );
  };

  return {
    DotCountBasic,
    DotCountVariant,
    DotCountOverlap,
    DotCountPlacements,
    DotStatusColorBasic,
    DotStatusColorVariant,
    DotStatusColorSizes,
    DotStatusColorPlacements,
    DotStatusColorOverlap,
    DotSymbolPlacements,
    DotSymbolSizes,
    DotSymbolIcon,
    DotSymbolOverlap,
  };
}
