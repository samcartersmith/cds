import React from 'react';
import { css } from '@linaria/core';
import { svgs } from '@cbhq/cds-common2/internal/data/assets';
import { remoteImageBuilder } from '@cbhq/cds-common2/internal/remoteImageBuilder';

import { HStack, VStack } from '../../layout';
import { TextBody } from '../../typography/TextBody';
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
  TextBody: (props) => <TextBody as="p" {...props} />,
});

export const Default = () => {
  return (
    <>
      <VStack gap={2}>
        <TextTitle1 as="h3">Default Shape</TextTitle1>
        <HStack gap={2}>
          {mockItems.map((_, idx) => {
            const key = `square-${idx}`;
            return <RemoteImage key={key} source={imageURL} {...sharedProps} shape="square" />;
          })}
        </HStack>
      </VStack>
      <VStack gap={2}>
        <TextTitle1 as="h3">Circle Shape</TextTitle1>
        <HStack gap={2}>
          {mockItems.map((_, idx) => {
            const key = `square-${idx}`;
            return <RemoteImage key={key} source={imageURL} {...sharedProps} />;
          })}
        </HStack>
      </VStack>
      <VStack gap={2}>
        <TextTitle1 as="h3">Squircle Shape</TextTitle1>
        <HStack gap={2}>
          {mockItems.map((_, idx) => {
            const key = `squircle-${idx}`;
            return <RemoteImage key={key} source={imageURL} {...sharedProps} shape="squircle" />;
          })}
        </HStack>
      </VStack>
      <VStack gap={2}>
        <TextTitle1 as="h3">SVGs</TextTitle1>
        <HStack gap={2}>
          {svgs.map((imgURL, idx) => {
            const key = `svg-${idx}`;
            return <RemoteImage key={key} source={imgURL} {...sharedProps} shape="squircle" />;
          })}
        </HStack>
      </VStack>
      <VStack gap={2}>
        <TextTitle1 as="h3">DangerouslySetClassName</TextTitle1>
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
        <TextTitle1 as="h3">Avatar Sizes with Circle</TextTitle1>
        <AvatarSizesWithCircle />
      </VStack>
      <VStack gap={2}>
        <TextTitle1 as="h3">Avatar Sizes with Squircle</TextTitle1>
        <AvatarSizesWithSquircle />
      </VStack>
      <VStack gap={2}>
        <TextTitle1 as="h3">Border Color Imgs</TextTitle1>
        <BorderColorImg />
      </VStack>
      <VStack gap={2}>
        <TextTitle1 as="h3">Border Color Svgs</TextTitle1>
        <BorderColorSvgs />
      </VStack>
      <VStack gap={2}>
        <TextTitle1 as="h3">Circle Fallback</TextTitle1>
        <CircleFallback />
      </VStack>
      <VStack gap={2}>
        <TextTitle1 as="h3">Rectangle Fallback</TextTitle1>
        <RectangleFallback />
      </VStack>
      <VStack gap={2}>
        <TextTitle1 as="h3">Square Fallback</TextTitle1>
        <SquareFallback />
      </VStack>
    </>
  );
};
