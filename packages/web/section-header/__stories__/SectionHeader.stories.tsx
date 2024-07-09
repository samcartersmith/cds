import { useCallback, useState } from 'react';
import { SectionHeaderProps } from '@cbhq/cds-common';
import { assets } from '@cbhq/cds-common/internal/data/assets';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';

import { Button, IconButton } from '../../buttons';
import { CellMedia } from '../../cells';
import { SelectChip } from '../../chips';
import { SearchInput, SelectOption } from '../../controls';
import { Icon } from '../../icons';
import { Divider, HStack, VStack } from '../../layout';
import { RemoteImage } from '../../media';
import { Tooltip } from '../../overlays';
import {
  Link,
  TextBody,
  TextCaption,
  TextDisplay3,
  TextHeadline,
  TextLabel1,
  TextTitle3,
} from '../../typography';
import { SectionHeader } from '../SectionHeader';

const assetOptions: AssetOption[] = [
  { title: 'Polygon', value: 'polygon', imageUrl: assets.polygon.imageUrl },
  { title: 'Ethereum', value: 'ethereum', imageUrl: assets.eth.imageUrl },
  { title: 'DAI', value: 'dai', imageUrl: assets.dai.imageUrl },
];

type AssetOption = {
  title: string;
  value: string;
  imageUrl: string;
};

const exampleProps: SectionHeaderProps = {
  title: 'SectionHeader',
  start: <RemoteImage shape="circle" size="m" source={assets.btc.imageUrl} />,
  icon: (
    <Tooltip content="Tooltip content" placement="right">
      <Icon color="foreground" name="info" size="xs" />
    </Tooltip>
  ),
  balance: (
    <HStack alignItems="flex-end" flexWrap="wrap" gap={0.5}>
      <TextTitle3 as="h3" color="foregroundMuted" numberOfLines={1}>
        $3,9081.01
      </TextTitle3>
      <TextBody as="p" color="positive">
        ↗ 6.37%
      </TextBody>
    </HStack>
  ),
  description: 'Add up to 2 lines of body copy.',
};

const SelectChipDropdown = () => {
  const [value, setValue] = useState<AssetOption>();

  const content = (
    <VStack>
      {assetOptions.map(({ title, value, imageUrl }) => {
        return (
          <SelectOption
            key={value}
            media={<CellMedia source={imageUrl} type="asset" />}
            title={title}
            value={value}
          />
        );
      })}
    </VStack>
  );

  const handleOnChange = useCallback(
    (newValue: string) => setValue(assetOptions.find(({ value }) => value === newValue)),
    [],
  );

  return (
    <HStack justifyContent="flex-end" width="100%">
      <SelectChip
        active={value !== undefined}
        content={content}
        minWidth={200}
        onChange={handleOnChange}
        placeholder="Networks"
        start={value && <RemoteImage source={value?.imageUrl} />}
        value={value ? value.value : undefined}
        valueLabel={value ? value.title : undefined}
      />
    </HStack>
  );
};

export const Examples = () => {
  return (
    <VStack gap={0} left={0} position="absolute" top={0} width="100%">
      <SectionHeader title={exampleProps.title} />
      <Divider />
      <SectionHeader end={<SelectChipDropdown />} title={exampleProps.title} />
      <Divider />
      <HStack
        flexWrap="wrap"
        gap={1}
        justifyContent="space-between"
        spacing={2}
        spacingHorizontal={4}
      >
        <SectionHeader {...exampleProps} icon={null} spacingHorizontal={0} spacingVertical={0} />
        <HStack flexGrow={1} maxWidth={475}>
          <SearchInput compact onChangeText={NoopFn} placeholder="Placeholder" value="" />
        </HStack>
      </HStack>
      <Divider />
      <SectionHeader
        {...exampleProps}
        balance={null}
        end={
          <Button compact variant="secondary">
            Button
          </Button>
        }
      />
      <Divider />
      <SectionHeader
        {...exampleProps}
        balance={null}
        end={
          <HStack gap={1}>
            <IconButton accessibilityLabel="Left caret" name="caretLeft" />
            <IconButton accessibilityLabel="Right caret" name="caretRight" />
          </HStack>
        }
      />
      <Divider />
      <SectionHeader
        {...exampleProps}
        balance={null}
        end={
          <TextHeadline as="label">
            <Link openInNewWindow to="http://www.coinbase.com">
              See all
            </Link>
          </TextHeadline>
        }
      />
      <Divider />
      <SectionHeader
        {...exampleProps}
        balance={null}
        end={<IconButton accessibilityLabel="Upload" name="upload" />}
      />
      <Divider />
      <SectionHeader
        {...exampleProps}
        balance={
          <VStack>
            <TextTitle3 as="h3" color="foregroundMuted">
              $3908.01
            </TextTitle3>
            <TextBody as="p" color="positive">
              ↗ 6.37%
            </TextBody>
          </VStack>
        }
        // description={null}
        end={
          <HStack>
            <SelectChipDropdown />
          </HStack>
        }
        icon={null}
        start={null}
        title={<TextLabel1 as="p">SectionHeader</TextLabel1>}
      />
      <Divider />
      <SectionHeader
        {...exampleProps}
        balance={
          <HStack alignItems="flex-end" gap={1}>
            <TextDisplay3 as="sub" color="foregroundMuted">
              $3908.01
            </TextDisplay3>
            <TextBody as="p" color="negative">
              ↘ 6.37%
            </TextBody>
          </HStack>
        }
        end={
          <HStack gap={1}>
            <IconButton accessibilityLabel="Left caret" name="caretLeft" />
            <IconButton accessibilityLabel="Right caret" name="caretRight" />
          </HStack>
        }
        icon={null}
        start={null}
        title={<TextLabel1 as="p">SectionHeader</TextLabel1>}
      />
      <Divider />
      <SectionHeader
        {...exampleProps}
        end={
          <HStack>
            <SelectChipDropdown />
          </HStack>
        }
        spacing={0}
      />
      <Divider />
      <SectionHeader
        {...exampleProps}
        balance={null}
        start={null}
        title={<TextCaption as="sub">{exampleProps.title}</TextCaption>}
      />
    </VStack>
  );
};

export default {
  title: 'Core Components/SectionHeader',
  component: SectionHeader,
};
