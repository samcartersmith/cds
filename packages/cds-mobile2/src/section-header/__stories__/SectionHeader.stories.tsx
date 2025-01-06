import React, { useState } from 'react';
import { View } from 'react-native';
import { SectionHeaderProps } from '@cbhq/cds-common2';
import { assets } from '@cbhq/cds-common2/internal/data/assets';
import { NoopFn } from '@cbhq/cds-common2/utils/mockUtils';

import { Button, IconButton } from '../../buttons';
import { SelectChip } from '../../chips/SelectChip';
import { SearchInput, SelectOption } from '../../controls';
import { ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons';
import { Divider, HStack } from '../../layout';
import { RemoteImage } from '../../media';
import { Link, TextBody, TextHeadline, TextTitle3 } from '../../typography';
import { SectionHeader } from '../SectionHeader';

const defaultProps: SectionHeaderProps = {
  title: 'SectionHeader',
  start: <RemoteImage shape="circle" size="m" source={assets.btc.imageUrl} />,
  icon: <Icon color="iconForeground" name="info" size="xs" />,
  balance: (
    <HStack alignItems="flex-end" flexWrap="wrap" gap={0.5}>
      <TextTitle3 color="textForegroundMuted" numberOfLines={1}>
        $3,9081.01
      </TextTitle3>
      <TextBody color="textPositive">↗ 6.37%</TextBody>
    </HStack>
  ),
  description: 'Add up to 2 lines of text.',
  testID: 'section-header',
};

const sortOptions = ['BTC', 'ETH', 'LTC'];

const SelectChipDropdown = () => {
  const [value, setValue] = useState<string | undefined>(sortOptions[0]);
  return (
    <HStack justifyContent="flex-end">
      <SelectChip active={value !== undefined} onChange={setValue} value={value}>
        {sortOptions.map((option) => (
          <SelectOption key={option} title={option} value={option} />
        ))}
      </SelectChip>
    </HStack>
  );
};

const SectionHeaderScreen = () => {
  return (
    <View>
      <ExampleScreen>
        <SectionHeader title="SectionHeader" />
        <Divider />
        <SectionHeader
          {...defaultProps}
          end={
            <HStack paddingTop={1}>
              <SearchInput compact onChangeText={NoopFn} placeholder="Placeholder" value="" />
            </HStack>
          }
        />
        <Divider />
        <SectionHeader {...defaultProps} end={<SelectChipDropdown />} />
        <Divider />
        <SectionHeader
          end={
            <HStack paddingTop={1}>
              <SearchInput compact onChangeText={NoopFn} placeholder="Placeholder" value="" />
            </HStack>
          }
          title={defaultProps.title}
        />
        <Divider />
        <SectionHeader
          {...defaultProps}
          balance={null}
          end={
            <Button compact variant="secondary">
              Button
            </Button>
          }
        />
        <Divider />
        <SectionHeader
          {...defaultProps}
          balance={null}
          end={
            <HStack gap={1}>
              <IconButton name="caretLeft" />
              <IconButton name="caretRight" />
            </HStack>
          }
        />
        <Divider />
        <SectionHeader
          {...defaultProps}
          balance={null}
          end={
            <TextHeadline>
              <Link to="http://www.coinbase.com">See all</Link>
            </TextHeadline>
          }
        />
        <Divider />
        <SectionHeader
          {...defaultProps}
          end={<IconButton name="upload" />}
          padding={0}
          title="CompactHeader"
        />
        <Divider />
        <SectionHeader {...defaultProps} balance={null} end={<IconButton name="upload" />} />
      </ExampleScreen>
    </View>
  );
};

export default SectionHeaderScreen;
