import { ChipBaseProps, Shape } from '@cbhq/cds-common';
import { assets } from '@cbhq/cds-common/internal/data/assets';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';

import { Icon } from '../../icons/Icon';
import { HStack, VStack } from '../../layout';
import { RemoteImage } from '../../media';
import { TextHeadline } from '../../typography';
import { Chip } from '../Chip';

export default {
  title: 'Core Components/Chips/Chip',
  component: Chip,
};

const assetIconProps = {
  height: 16,
  shape: 'circle' as Shape,
  source: assets.eth.imageUrl,
  width: 16,
};

const ChipExamples = ({
  label,
  ...props
}: { label?: string } & Omit<ChipBaseProps, 'children'>) => (
  <HStack gap={2}>
    <Chip {...props}>{label ?? <TextHeadline as="span">Base</TextHeadline>}</Chip>
    <Chip {...props} start={<RemoteImage {...assetIconProps} />}>
      {label ?? <TextHeadline as="span">Start</TextHeadline>}
    </Chip>
    <Chip
      {...props}
      end={<Icon color="foreground" name="caretDown" size="s" />}
      start={<RemoteImage {...assetIconProps} />}
    >
      {label ?? <TextHeadline as="span">End & Start</TextHeadline>}
    </Chip>
    <Chip {...props} end={<Icon color="foreground" name="filter" size="s" />}>
      Filter 2
    </Chip>
    <Chip
      {...props}
      end={<Icon color="foreground" name="caretDown" size="s" />}
      onPress={NoopFn}
      start={<RemoteImage {...assetIconProps} />}
    >
      {label ?? <TextHeadline as="span">Pressable</TextHeadline>}
    </Chip>
    <Chip
      {...props}
      disabled
      end={<Icon color="foreground" name="caretDown" size="s" />}
      onPress={NoopFn}
      start={<RemoteImage {...assetIconProps} />}
    >
      {label ?? <TextHeadline as="span">Disabled</TextHeadline>}
    </Chip>
  </HStack>
);

export const Default = () => (
  <VStack gap={2}>
    <TextHeadline as="h3">Default</TextHeadline>
    <ChipExamples />
    <TextHeadline as="h3" spacingTop={3}>
      Inverted
    </TextHeadline>
    <ChipExamples inverted />
    <TextHeadline as="h3">Compact</TextHeadline>
    <ChipExamples compact />
    <TextHeadline as="h3" spacingTop={3}>
      Long text
    </TextHeadline>
    <ChipExamples label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget" />
  </VStack>
);
