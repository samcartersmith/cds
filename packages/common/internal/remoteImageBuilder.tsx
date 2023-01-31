import React, { ComponentType } from 'react';

import { paletteBorders } from '../palette/constants';
import { StackBaseProps, TextBaseProps } from '../types';

import { svgs } from './data/assets';
import { avatars, avatarSizes } from './data/avatars';
import { RemoteImageBuilderTypes } from './remoteImageGroupBuilder';

const imageURL = avatars[0];

export type RemoteImageBuilderProps = {
  RemoteImage: ComponentType<React.PropsWithChildren<RemoteImageBuilderTypes>>;
  VStack: ComponentType<React.PropsWithChildren<StackBaseProps>>;
  HStack: ComponentType<React.PropsWithChildren<StackBaseProps>>;
  TextBody: ComponentType<React.PropsWithChildren<TextBaseProps>>;
};

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
            <RemoteImage key={key} shape="squircle" source={imageURL} size={size} />
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
            <RemoteImage shape="circle" source={imageURL} size={size} />
          </VStack>
        );
      })}
    </HStack>
  );

  const BorderColorImg = () => (
    <VStack gap={2}>
      {paletteBorders.map((borderColor, idx) => {
        const key = `border-imgs-${idx}`;
        return (
          <RemoteImage
            key={key}
            shape="circle"
            source={imageURL}
            size="xxl"
            borderColor={borderColor}
          />
        );
      })}
    </VStack>
  );

  const BorderColorSvgs = () => (
    <VStack gap={1}>
      {paletteBorders.map((borderColor, idx) => {
        const key = `border-svgs-${idx}`;
        return (
          <RemoteImage
            key={key}
            shape="circle"
            source={svgs[0]}
            size="xxl"
            borderColor={borderColor}
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
    return <RemoteImage shape="rectangle" width={30} height={10} />;
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
