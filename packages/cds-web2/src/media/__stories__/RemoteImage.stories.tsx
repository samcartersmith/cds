import React from 'react';
import { css } from '@linaria/core';
import { svgs } from '@cbhq/cds-common2/internal/data/assets';
import { remoteImageBuilder } from '@cbhq/cds-common2/internal/remoteImageBuilder';

import { HStack, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { TextTitle1 } from '../../typography/TextTitle1';
import { RemoteImage } from '../RemoteImage';

export default {
  component: RemoteImage,
  title: 'Core Components/RemoteImage',
};

const sharedProps = {
  resizeMode: 'cover',
  shape: 'circle',
  width: 32,
  height: 32,
} as const;

const whiteBorder = css`
  border-color: black;
  border-width: 8px;
`;

const imageURL =
  'https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg';

const mockItems = Array.from({ length: 4 });

const {
  AvatarSizesWithCircle,
  AvatarSizesWithSquircle,
  BorderColorImg,
  BorderColorSvgs,
  CircleFallback,
  RectangleFallback,
  SquareFallback,
} = remoteImageBuilder({
  RemoteImage,
  VStack,
  HStack,
  Text: (props) => <Text as="p" {...props} />,
});

export const Default = () => {
  return (
    <>
      <VStack gap={2}>
        <Text as="h3" font="title1">
          Default Shape
        </Text>
        <HStack gap={2}>
          {mockItems.map((_, idx) => {
            const key = `square-${idx}`;
            return <RemoteImage key={key} source={imageURL} {...sharedProps} shape="square" />;
          })}
        </HStack>
      </VStack>
      <VStack gap={2}>
        <Text as="h3" font="title1">
          Circle Shape
        </Text>
        <HStack gap={2}>
          {mockItems.map((_, idx) => {
            const key = `square-${idx}`;
            return <RemoteImage key={key} source={imageURL} {...sharedProps} />;
          })}
        </HStack>
      </VStack>
      <VStack gap={2}>
        <Text as="h3" font="title1">
          Squircle Shape
        </Text>
        <HStack gap={2}>
          {mockItems.map((_, idx) => {
            const key = `squircle-${idx}`;
            return <RemoteImage key={key} source={imageURL} {...sharedProps} shape="squircle" />;
          })}
        </HStack>
      </VStack>
      <VStack gap={2}>
        <Text as="h3" font="title1">
          SVGs
        </Text>
        <HStack gap={2}>
          {svgs.map((imgURL, idx) => {
            const key = `svg-${idx}`;
            return <RemoteImage key={key} source={imgURL} {...sharedProps} shape="squircle" />;
          })}
        </HStack>
      </VStack>
      <VStack gap={2}>
        <Text as="h3" font="title1">
          DangerouslySetClassName
        </Text>
        <HStack gap={2}>
          {svgs.map((imgURL, idx) => {
            const key = `svg-${idx}`;
            return (
              <RemoteImage
                key={key}
                className={whiteBorder}
                source={imgURL}
                {...sharedProps}
                shape="squircle"
              />
            );
          })}
        </HStack>
      </VStack>
      <VStack gap={2}>
        <Text as="h3" font="title1">
          Avatar Sizes with Circle
        </Text>
        <AvatarSizesWithCircle />
      </VStack>
      <VStack gap={2}>
        <Text as="h3" font="title1">
          Avatar Sizes with Squircle
        </Text>
        <AvatarSizesWithSquircle />
      </VStack>
      <VStack gap={2}>
        <Text as="h3" font="title1">
          Border Color Imgs
        </Text>
        <BorderColorImg />
      </VStack>
      <VStack gap={2}>
        <Text as="h3" font="title1">
          Border Color Svgs
        </Text>
        <BorderColorSvgs />
      </VStack>
      <VStack gap={2}>
        <Text as="h3" font="title1">
          Circle Fallback
        </Text>
        <CircleFallback />
      </VStack>
      <VStack gap={2}>
        <Text as="h3" font="title1">
          Rectangle Fallback
        </Text>
        <RectangleFallback />
      </VStack>
      <VStack gap={2}>
        <Text as="h3" font="title1">
          Square Fallback
        </Text>
        <SquareFallback />
      </VStack>
    </>
  );
};
