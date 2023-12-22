import React from 'react';
import { assets, squareAssets, svgs } from '@cbhq/cds-common/internal/data/assets';
import { remoteImageBuilder } from '@cbhq/cds-common/internal/remoteImageBuilder';
import { entries } from '@cbhq/cds-utils';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { TextBody } from '../../typography/TextBody';
import { getSource, RemoteImage } from '../RemoteImage';

const sharedProps = {
  resizeMode: 'cover',
  shape: 'circle',
  width: 32,
  height: 32,
} as const;

const customDimensions = {
  width: 220,
  height: 40,
} as const;

const wideLogoSource =
  'https://static-assets.coinbase.com/design-system/subBrandLogo/coinbaseOneSubBrand.svg';

const mockItems = Array.from({ length: 4 });
const images = entries(assets).map(([, { imageUrl }]) => imageUrl);
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
  TextBody: (props) => <TextBody {...props} />,
});

const RemoteImageScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Default Shape">
        <HStack gap={2}>
          {mockItems.map((_, idx) => {
            const key = `square-${idx}`;
            return (
              <RemoteImage key={key} source={squareAssets.human2} {...sharedProps} shape="square" />
            );
          })}
        </HStack>
      </Example>
      <Example title="Circle Shape">
        <HStack gap={2}>
          {mockItems.map((_, idx) => {
            const key = `circle-${idx}`;
            return <RemoteImage key={key} source={squareAssets.human1} {...sharedProps} />;
          })}
        </HStack>
      </Example>
      <Example title="Squircle Shape">
        <HStack gap={2}>
          {mockItems.map((_, idx) => {
            const key = `squircle-${idx}`;
            return (
              <RemoteImage
                key={key}
                source={squareAssets.human3}
                {...sharedProps}
                shape="squircle"
              />
            );
          })}
        </HStack>
      </Example>
      <Example title="Custom Dimensions">
        <VStack gap={2}>
          <RemoteImage source={wideLogoSource} {...customDimensions} resizeMode="cover" />
          <RemoteImage source={wideLogoSource} {...customDimensions} resizeMode="contain" />
          <RemoteImage
            aspectRatio={[9, 1]}
            resizeMode="contain"
            source={wideLogoSource}
            width={customDimensions.width}
          />
          <RemoteImage
            aspectRatio={[9, 1]}
            height={customDimensions.height}
            resizeMode="contain"
            source={wideLogoSource}
          />
        </VStack>
      </Example>
      <Example title="svgs">
        <HStack gap={2}>
          {svgs.map((imgURL, idx) => {
            const key = `svg-${idx}`;
            return (
              <RemoteImage key={key} source={getSource(imgURL)} {...sharedProps} shape="squircle" />
            );
          })}
        </HStack>
      </Example>
      <Example title="shouldApplyDarkModeEnhacements">
        <HStack gap={2}>
          {images.map((item) => (
            <RemoteImage
              key={item}
              source={getSource(item)}
              {...sharedProps}
              shouldApplyDarkModeEnhacements
            />
          ))}
        </HStack>
      </Example>
      <Example title="darkModeEnhancementsApplide">
        <HStack gap={2}>
          {images.map((item) => (
            <RemoteImage
              key={item}
              source={getSource(item)}
              {...sharedProps}
              darkModeEnhancementsApplied
            />
          ))}
        </HStack>
      </Example>
      <Example title="Avatar Sizes with Circle">
        <AvatarSizesWithCircle />
      </Example>
      <Example title="Avatar Sizes with Squircle">
        <AvatarSizesWithSquircle />
      </Example>
      <Example title="Border Color Imgs">
        <BorderColorImg />
      </Example>
      <Example title="Border Color Svgs">
        <BorderColorSvgs />
      </Example>
      <Example title="Circle Fallback">
        <CircleFallback />
      </Example>
      <Example title="Rectangle Fallback">
        <RectangleFallback />
      </Example>
      <Example title="Square Fallback">
        <SquareFallback />
      </Example>
    </ExampleScreen>
  );
};

export default RemoteImageScreen;
