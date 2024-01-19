import React, { ComponentType, useEffect, useState } from 'react';

import { avatarDotSizeMap, avatarIconSizeMap } from '../tokens/dot';
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

export const VARIANTS = ['positive', 'negative', 'primary', 'foregroundMuted', 'warning'] as const;
export const PIN_DIRECTIONS = ['top-start', 'top-end', 'bottom-start', 'bottom-end'] as const;
export const SIZES = ['s', 'm', 'l'] as const;

export function dotBuilder(
  DotCount: ComponentType<React.PropsWithChildren<DotCountBaseProps>>,
  DotStatusColor: ComponentType<React.PropsWithChildren<DotBaseProps>>,
  DotSymbol: ComponentType<
    React.PropsWithChildren<
      DotSymbolBaseProps & {
        source?: string;
      }
    >
  >,
  Box: ComponentType<React.PropsWithChildren<BoxBaseProps>>,
  Avatar: ComponentType<React.PropsWithChildren<AvatarBaseProps>>,
  TextLabel1: ComponentType<React.PropsWithChildren<TextBaseProps>>,
  TextLegal: ComponentType<React.PropsWithChildren<TextBaseProps>>,
  Icon: ComponentType<React.PropsWithChildren<IconBaseProps & { name: IconName }>>,
  VStack: ComponentType<React.PropsWithChildren<BoxBaseProps & StackBaseProps>>,
  HStack: ComponentType<React.PropsWithChildren<BoxBaseProps & StackBaseProps>>,
) {
  /** START DOTCOUNT */
  const DotCountBasic = () => {
    const counts = [1, 100, 30, 2, 0, 99];
    return (
      <>
        {counts.map((count) => (
          <Box key={`DotCount-${count}`} alignItems="flex-start" spacing={1}>
            <DotCount count={count} />
          </Box>
        ))}
        <Box alignItems="flex-start" spacing={1}>
          <DotCount count={11} max={9} />
        </Box>
      </>
    );
  };

  const DotCountDynamic = () => {
    const [count, setCount] = useState<number>(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setCount((prev) => (prev === 0 ? Math.floor(Math.random() * 99) : 0));
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }, []);
    return (
      <Box alignItems="flex-start" minHeight={100} spacing={1}>
        <DotCount count={count}>
          <Icon name="airdrop" size="m" />
        </DotCount>
      </Box>
    );
  };

  const DotCountVariant = () => {
    return (
      <VStack key="DotCount-variant-negative" alignItems="flex-start" gap={1}>
        <DotCount count={30} variant="negative" />
      </VStack>
    );
  };

  const DotCountOverlap = () => {
    return (
      <>
        <DotCount count={1} overlap="circular" pin="top-end" variant="negative">
          <Avatar alt="Sneezy" shape="circle" size="l" />
        </DotCount>
        <DotCount count={30} overlap="circular" pin="top-end" variant="negative">
          <Avatar alt="Sneezy" shape="circle" size="xl" />
        </DotCount>
        <DotCount count={100} overlap="circular" pin="top-end" variant="negative">
          <Avatar alt="Sneezy" shape="circle" size="xxl" />
        </DotCount>
        <DotCount count={99} overlap="circular" pin="top-end" variant="negative">
          <Avatar alt="Sneezy" shape="circle" size="xxxl" />
        </DotCount>
      </>
    );
  };

  const DotCountPlacements = () => {
    return (
      <VStack
        key="DotCount-placement-top-end"
        alignItems="flex-start"
        gap={4}
        spacing={1}
        spacingBottom={4}
      >
        <TextLabel1>top-end</TextLabel1>
        <DotCount count={30} pin="top-end">
          <Avatar alt="Sneezy" shape="square" size="xl" />
        </DotCount>
        <DotCount count={30} pin="top-end">
          <Avatar alt="Sneezy" shape="square" size="l" />
        </DotCount>
        <DotCount count={1} pin="top-end">
          <Icon name="calendar" size="m" />
        </DotCount>
        <DotCount count={0} pin="top-end">
          <TextLabel1>Count = 0. Dot should not show up</TextLabel1>
          <Icon name="calendar" size="m" />
        </DotCount>
      </VStack>
    );
  };

  /**
   * This is test that when the Dot is placed next to other
   * items, the position of the pinning is still correct
   */
  const DotCountComplex = () => {
    return (
      <HStack gap={2}>
        <DotCount count={2} overlap="circular" pin="top-end">
          <Avatar alt="Sneezy" shape="circle" size="xxxl" />
        </DotCount>
        <VStack>
          <TextLabel1>Hello Hello</TextLabel1>
          <TextLabel1>Hello Hello</TextLabel1>
          <TextLabel1>Hello Hello</TextLabel1>
          <TextLabel1>Hello Hello</TextLabel1>
          <TextLabel1>Hello Hello</TextLabel1>
          <TextLabel1>Hello Hello</TextLabel1>
        </VStack>
      </HStack>
    );
  };

  const AllDotCount = () => {
    return (
      <VStack gap={2}>
        <DotCountBasic />
        <DotCountDynamic />
        <DotCountVariant />
        <DotCountOverlap />
        <DotCountPlacements />
        <DotCountComplex />
      </VStack>
    );
  };

  /** START DOTSTATUS */

  const DotStatusColorBasic = () => {
    return <DotStatusColor variant="positive" />;
  };

  const DotStatusColorVariant = () => {
    return (
      <>
        {VARIANTS.map((variant) => (
          <VStack key={`DotStatusColor-variant-${variant}`} alignItems="flex-start" gap={1}>
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
          <VStack key={`DotStatusColor-size-${size}`} alignItems="flex-start" gap={1}>
            <DotStatusColor size={size} variant="negative" />
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
            key={`DotStatusColor-placement-${pinDirection}`}
            alignItems="flex-start"
            gap={4}
            spacing={1}
            spacingBottom={4}
          >
            <TextLabel1>{pinDirection}</TextLabel1>
            <DotStatusColor pin={pinDirection} variant="positive">
              <Avatar alt="Sneezy" shape="square" size="l" />
            </DotStatusColor>
            <DotStatusColor pin={pinDirection} variant="positive">
              <Avatar alt="Sneezy" shape="square" size="xxl" />
            </DotStatusColor>
            <DotStatusColor pin={pinDirection} variant="positive">
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
              key={`DotStatusColor-overlap-${pinDirection}-${avatarSize}`}
              alignItems="flex-start"
              gap={4}
              spacing={1}
              spacingBottom={4}
            >
              <TextLabel1>
                {pinDirection}, avatarSize: {avatarSize}
              </TextLabel1>
              <DotStatusColor overlap="circular" pin={pinDirection} variant="positive">
                <Avatar alt="Unknown avatar circle" shape="circle" size={avatarSize} />
              </DotStatusColor>
            </VStack>
          )),
        )}
      </>
    );
  };

  const AllDotStatusColor = () => {
    return (
      <VStack gap={2}>
        <DotStatusColorBasic />
        <DotStatusColorVariant />
        <DotStatusColorSizes />
        <DotStatusColorPlacements />
        <DotStatusColorOverlap />
      </VStack>
    );
  };

  /** START DOTSYMBOL */

  const DotSymbolPlacements = () => {
    return (
      <>
        {PIN_DIRECTIONS.map((pinDirection) => (
          <VStack
            key={`dotsymbol-placement-${pinDirection}`}
            alignItems="flex-start"
            gap={4}
            spacing={1}
            spacingBottom={4}
          >
            <TextLabel1>{pinDirection}</TextLabel1>
            <DotSymbol pin={pinDirection} size="m" source={assets.eth.imageUrl}>
              <Avatar alt="Sneezy" shape="square" size="xxxl" />
            </DotSymbol>
            <DotSymbol pin={pinDirection} size="m" source={assets.eth.imageUrl}>
              <Avatar alt="Sneezy" shape="square" size="xl" />
            </DotSymbol>
            <DotSymbol pin={pinDirection} size="m" source={assets.eth.imageUrl}>
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
          <VStack key={`dotsymbol-size-${size}`} alignItems="flex-start" gap={1}>
            <DotSymbol size={size} source={assets.eth.imageUrl} />
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
              key={`dotsymbol-icons-${pinDirection}-${avatarSize}`}
              alignItems="flex-start"
              gap={4}
              spacing={1}
              spacingBottom={4}
            >
              <TextLabel1>
                Pin Direction: {pinDirection} Avatar Size: {avatarSize} Icon Size:{' '}
                {avatarIconSizeMap[avatarSize]}
              </TextLabel1>
              <DotSymbol
                iconName="safe"
                overlap="circular"
                pin={pinDirection}
                size={avatarIconSizeMap[avatarSize]}
              >
                <Avatar alt="Ethereum asset logo" size={avatarSize} src={assets.eth.imageUrl} />
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
              key={`dotsymbol-overlap-${size}-${pinDirection}`}
              alignItems="flex-start"
              gap={4}
              spacing={1}
              spacingBottom={4}
            >
              <TextLabel1>
                {pinDirection}, dot-size: {size}
              </TextLabel1>
              <DotSymbol
                overlap="circular"
                pin={pinDirection}
                size={size}
                source={assets.ada.imageUrl}
              >
                <Avatar alt="Sneezy" size="xxxl" src={assets.eth.imageUrl} />
              </DotSymbol>
            </VStack>
          )),
        )}
      </>
    );
  };

  /**
   * This is test that when the Dot is placed next to other
   * items, the position of the pinning is still correct
   */
  const DotSymbolComplex = () => {
    return (
      <HStack gap={2}>
        <DotSymbol
          overlap="circular"
          pin="bottom-end"
          size={avatarDotSizeMap.xxxl}
          source={assets.polygon.imageUrl}
        >
          <Avatar alt="Sneezy" shape="square" size="xxl" />
        </DotSymbol>
        <VStack>
          <TextLabel1>Hello Hello</TextLabel1>
          <TextLabel1>Hello Hello</TextLabel1>
          <TextLabel1>Hello Hello</TextLabel1>
          <TextLabel1>Hello Hello</TextLabel1>
          <TextLabel1>Hello Hello</TextLabel1>
          <TextLabel1>Hello Hello</TextLabel1>
        </VStack>
      </HStack>
    );
  };

  const AllDotSymbol = () => {
    return (
      <VStack gap={2}>
        <DotSymbolPlacements />
        <DotSymbolSizes />
        <DotSymbolIcon />
        <DotSymbolOverlap />
        <DotSymbolComplex />
      </VStack>
    );
  };

  return {
    DotCountBasic,
    DotCountDynamic,
    DotCountVariant,
    DotCountOverlap,
    DotCountPlacements,
    DotCountComplex,
    AllDotCount,
    DotStatusColorBasic,
    DotStatusColorVariant,
    DotStatusColorSizes,
    DotStatusColorPlacements,
    DotStatusColorOverlap,
    AllDotStatusColor,
    DotSymbolPlacements,
    DotSymbolSizes,
    DotSymbolIcon,
    DotSymbolOverlap,
    DotSymbolComplex,
    AllDotSymbol,
  };
}
