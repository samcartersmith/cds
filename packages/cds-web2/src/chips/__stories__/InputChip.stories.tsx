import React from 'react';
import { assets } from '@cbhq/cds-common2/internal/data/assets';

import { HStack, VStack } from '../../layout';
import { RemoteImage, RemoteImageProps } from '../../media';
import { ThemeProvider } from '../../system/ThemeProvider';
import { denseTheme } from '../../themes/denseTheme';
import { Text } from '../../typography/Text';
import { InputChip } from '../InputChip';

export default {
  title: 'Core Components/Chips/InputChip',
  component: InputChip,
};

const assetIconProps: RemoteImageProps = {
  height: 16,
  shape: 'circle',
  source: assets.eth.imageUrl,
  width: 16,
};

const NoopFn = () => {};

export const Default = () => (
  <VStack gap={3}>
    <VStack gap={2}>
      <Text as="h2" font="display2">
        Default
      </Text>
      <HStack gap={2}>
        <InputChip onPress={NoopFn} value="USD" />
        <InputChip onPress={NoopFn} start={<RemoteImage {...assetIconProps} />} value="USD" />
        <InputChip
          disabled
          onPress={NoopFn}
          start={<RemoteImage {...assetIconProps} />}
          value="USD"
        />
      </HStack>
      <Text as="h3" font="headline" paddingTop={3}>
        Long text
      </Text>
      <HStack gap={2}>
        <InputChip onPress={NoopFn} value="Lorem ipsum sit dolar" />
        <InputChip
          onPress={NoopFn}
          start={<RemoteImage {...assetIconProps} />}
          value="Lorem ipsum sit dolar"
        />
        <InputChip
          disabled
          onPress={NoopFn}
          start={<RemoteImage {...assetIconProps} />}
          value="Lorem ipsum sit dolar"
        />
      </HStack>
    </VStack>
    <ThemeProvider activeColorScheme="light" theme={{ ...denseTheme }}>
      <VStack gap={2}>
        <Text as="h2" font="display2">
          Dense
        </Text>
        <HStack gap={2}>
          <InputChip onPress={NoopFn} value="USD" />
          <InputChip onPress={NoopFn} start={<RemoteImage {...assetIconProps} />} value="USD" />
          <InputChip
            disabled
            onPress={NoopFn}
            start={<RemoteImage {...assetIconProps} />}
            value="USD"
          />
        </HStack>
        <Text as="h3" font="headline" paddingTop={3}>
          Long text
        </Text>
        <HStack gap={2}>
          <InputChip onPress={NoopFn} value="Lorem ipsum sit dolar" />
          <InputChip
            onPress={NoopFn}
            start={<RemoteImage {...assetIconProps} />}
            value="Lorem ipsum sit dolar"
          />
          <InputChip
            disabled
            onPress={NoopFn}
            start={<RemoteImage {...assetIconProps} />}
            value="Lorem ipsum sit dolar"
          />
        </HStack>
      </VStack>
    </ThemeProvider>
  </VStack>
);
