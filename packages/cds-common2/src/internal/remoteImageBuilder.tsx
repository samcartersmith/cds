import React from 'react';

import { ThemeVars } from '../core/theme';
import { StackBaseProps, TextBaseProps } from '../types';

import { svgs } from './data/assets';
import { avatars, avatarSizes } from './data/avatars';
import { RemoteImageBuilderTypes } from './remoteImageGroupBuilder';

const imageURL = avatars[0];

export type RemoteImageBuilderProps = {
  RemoteImage: React.ComponentType<React.PropsWithChildren<RemoteImageBuilderTypes>>;
  VStack: React.ComponentType<React.PropsWithChildren<StackBaseProps>>;
  HStack: React.ComponentType<React.PropsWithChildren<StackBaseProps>>;
  TextBody: React.ComponentType<React.PropsWithChildren<TextBaseProps>>;
};

export const borderColors = [
  'backgroundPrimary',
  'backgroundPrimaryWash',
  'backgroundSecondary',
  'backgroundPositive',
  'backgroundNegative',
  'line',
  'lineHeavy',
  'transparent',
  'backgroundWarning',
] as const satisfies ThemeVars.Color[];

export const remoteImageBuilder = ({
  RemoteImage,
  VStack,
  HStack,
  TextBody,
}: RemoteImageBuilderProps) => {
  const AvatarSizesWithSquircle = () => (
    <HStack gap={2}>
      {avatarSizes.map((size, idx) => {
        const key = `squircle-${idx}`;
        return (
          <VStack key={key}>
            <TextBody>{size}</TextBody>
            <RemoteImage key={key} shape="squircle" size={size} source={imageURL} />
          </VStack>
        );
      })}
    </HStack>
  );

  const AvatarSizesWithCircle = () => (
    <HStack gap={2}>
      {avatarSizes.map((size, idx) => {
        const key = `circle-${idx}`;
        return (
          <VStack key={key}>
            <TextBody>{size}</TextBody>
            <RemoteImage shape="circle" size={size} source={imageURL} />
          </VStack>
        );
      })}
    </HStack>
  );

  const BorderColorImg = () => (
    <VStack gap={2}>
      {borderColors.map((borderColor, idx) => {
        const key = `border-imgs-${idx}`;
        return (
          <RemoteImage
            key={key}
            borderColor={borderColor}
            shape="circle"
            size="xxl"
            source={imageURL}
          />
        );
      })}
    </VStack>
  );

  const BorderColorSvgs = () => (
    <VStack gap={1}>
      {borderColors.map((borderColor, idx) => {
        const key = `border-svgs-${idx}`;
        return (
          <RemoteImage
            key={key}
            borderColor={borderColor}
            shape="circle"
            size="xxl"
            source={svgs[0]}
          />
        );
      })}
    </VStack>
  );

  const CircleFallback = () => {
    return (
      <VStack gap={1}>
        {avatarSizes.map((size, idx) => {
          const key = `circle-fallback-${idx}`;
          return (
            <VStack key={key}>
              <TextBody>{size}</TextBody>
              <RemoteImage shape="circle" size={size} />
            </VStack>
          );
        })}
      </VStack>
    );
  };

  const SquareFallback = () => {
    return (
      <VStack gap={1}>
        {avatarSizes.map((size, idx) => {
          const key = `square-fallback-${idx}`;
          return (
            <VStack key={key}>
              <TextBody>{size}</TextBody>
              <RemoteImage shape="square" size={size} />
            </VStack>
          );
        })}
      </VStack>
    );
  };

  const RectangleFallback = () => {
    return <RemoteImage height={10} shape="rectangle" width={30} />;
  };

  return {
    AvatarSizesWithSquircle,
    AvatarSizesWithCircle,
    BorderColorImg,
    BorderColorSvgs,
    CircleFallback,
    RectangleFallback,
    SquareFallback,
  };
};
