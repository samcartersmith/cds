import { HStack } from '@cbhq/cds-mobile/layout';
import { RemoteImage, getSource } from '@cbhq/cds-mobile/media';

import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';
import { assets } from './data/assets';
import { entries } from '@cbhq/cds-utils';

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
          {mockItems.map((_, idx) => (
            <RemoteImage
              key={`square-${idx}`}
              source={getSource(`https://source.unsplash.com/120x120?beach-${idx}`)}
              {...sharedProps}
              shape="square"
            />
          ))}
        </HStack>
      </Example>
      <Example title="Circle Shape">
        <HStack gap={2}>
          {mockItems.map((_, idx) => (
            <RemoteImage
              key={`circle-${idx}`}
              source={getSource(`https://source.unsplash.com/120x120?avatar-${idx}`)}
              {...sharedProps}
            />
          ))}
        </HStack>
      </Example>
      <Example title="Squircle Shape">
        <HStack gap={2}>
          {mockItems.map((_, idx) => (
            <RemoteImage
              key={`squircle-${idx}`}
              source={getSource(`https://source.unsplash.com/120x120?user-${idx}`)}
              {...sharedProps}
              shape="squircle"
            />
          ))}
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
