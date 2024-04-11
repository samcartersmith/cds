import { assets } from '@cbhq/cds-common/internal/data/assets';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';

import { HStack, VStack } from '../../layout';
import { RemoteImage, RemoteImageProps } from '../../media';
import { ThemeProvider } from '../../system';
import { TextDisplay2, TextHeadline } from '../../typography';
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

export const Default = () => (
  <VStack gap={3}>
    <VStack gap={2}>
      <TextDisplay2 as="h2">Default</TextDisplay2>
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
      <TextHeadline as="h3" spacingTop={3}>
        Long text
      </TextHeadline>
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
    <ThemeProvider scale="xSmall">
      <VStack gap={2}>
        <TextDisplay2 as="h2">Dense</TextDisplay2>
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
        <TextHeadline as="h3" spacingTop={3}>
          Long text
        </TextHeadline>
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
