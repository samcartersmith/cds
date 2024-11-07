import React from 'react';
import { assets } from '@cbhq/cds-common/internal/data/assets';
import { ChipBaseProps } from '@cbhq/cds-common/types';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons';
import { VStack } from '../../layout';
import { RemoteImage, RemoteImageProps } from '../../media';
import { TextHeadline } from '../../typography';
import { Chip } from '../Chip';

const assetIconProps: RemoteImageProps = {
  height: 16,
  shape: 'circle',
  source: assets.eth.imageUrl,
  width: 16,
};

const ChipExamples = ({
  label,
  ...props
}: { label?: string } & Omit<ChipBaseProps, 'children'>) => (
  <VStack gap={1}>
    <Chip {...props}>{label ?? <TextHeadline>Base</TextHeadline>}</Chip>
    <Chip {...props} start={<RemoteImage {...assetIconProps} />}>
      {label ?? <TextHeadline>Start</TextHeadline>}
    </Chip>
    <Chip
      {...props}
      end={<Icon color="foreground" name="caretDown" size="s" />}
      start={<RemoteImage {...assetIconProps} />}
    >
      {label ?? <TextHeadline>End & Start</TextHeadline>}
    </Chip>
    <Chip {...props} end={<Icon color="foreground" name="filter" size="s" />}>
      <TextHeadline>Filter 2</TextHeadline>
    </Chip>
    <Chip
      {...props}
      end={<Icon color="foreground" name="caretDown" size="s" />}
      onPress={NoopFn}
      start={<RemoteImage {...assetIconProps} />}
    >
      {label ?? <TextHeadline>Pressable</TextHeadline>}
    </Chip>
    <Chip
      {...props}
      disabled
      end={<Icon color="foreground" name="caretDown" size="s" />}
      onPress={NoopFn}
      start={<RemoteImage {...assetIconProps} />}
    >
      {label ?? <TextHeadline>Disabled</TextHeadline>}
    </Chip>
  </VStack>
);

const ChipScreen = () => (
  <ExampleScreen>
    <Example title="Default">
      <ChipExamples />
    </Example>
    <Example title="Inverted">
      <ChipExamples inverted />
    </Example>
    <Example title="Compact">
      <ChipExamples compact />
    </Example>
    <Example title="Long text">
      <ChipExamples label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget" />
    </Example>
  </ExampleScreen>
);

export default ChipScreen;
