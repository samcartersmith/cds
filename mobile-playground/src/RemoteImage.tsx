import React from 'react';
import { HStack } from '@cbhq/cds-mobile/layout';
import { RemoteImage, getSource } from '@cbhq/cds-mobile/media';

import { entries } from '@cbhq/cds-utils';
import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';
import { svgs, assets } from './data/assets';

const sharedProps = {
  resizeMode: 'cover',
  shape: 'circle',
  width: 32,
  height: 32,
} as const;

const mockItems = Array.from({ length: 4 });
const images = entries(assets).map(([, { imageUrl }]) => imageUrl);

const RemoteImageScreen = () => {
  return (
    <ExamplesScreen>
      <Example title="Default Shape">
        <HStack gap={2}>
          {mockItems.map((_, idx) => {
            const key = `square-${idx}`;
            return (
              <RemoteImage
                key={key}
                source={getSource(`https://source.unsplash.com/120x120?beach-${idx}`)}
                {...sharedProps}
                shape="square"
              />
            );
          })}
        </HStack>
      </Example>
      <Example title="Circle Shape">
        <HStack gap={2}>
          {mockItems.map((_, idx) => {
            const key = `circle-${idx}`;
            return (
              <RemoteImage
                key={key}
                source={getSource(`https://source.unsplash.com/120x120?avatar-${idx}`)}
                {...sharedProps}
              />
            );
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
                source={getSource(`https://source.unsplash.com/120x120?user-${idx}`)}
                {...sharedProps}
                shape="squircle"
              />
            );
          })}
        </HStack>
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
          {images.map(item => (
            <RemoteImage
              key={item}
              source={getSource(item)}
              {...sharedProps}
              shouldApplyDarkModeEnhacements
            />
          ))}
        </HStack>
      </Example>
    </ExamplesScreen>
  );
};

export default RemoteImageScreen;
