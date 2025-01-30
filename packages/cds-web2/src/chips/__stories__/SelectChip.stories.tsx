import React, { useState } from 'react';
import { loremIpsum } from '@cbhq/cds-common2/internal/data/loremIpsum';
import { UiIconName } from '@cbhq/cds-icons';

import { SelectOption } from '../../controls/SelectOption';
import { Icon } from '../../icons/Icon';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { SelectChip, SelectChipProps } from '../SelectChip';

const defaultSortOptions = ['Balance', 'Name', 'Asset Value'];
const customSortOptions = [loremIpsum, ...defaultSortOptions];
const customContentStyle = { maxWidth: 300 };

const ExampleSelectChip = ({
  value: defaultValue,
  sortOptions = defaultSortOptions,
  ...props
}: Omit<SelectChipProps, 'onChange' | 'content' | 'children'> & { sortOptions?: string[] }) => {
  const [value, setValue] = React.useState<string | undefined>(defaultValue);

  const content = (
    <>
      <HStack padding={2} role="separator">
        <Text as="h2" color="textForegroundMuted" font="caption">
          Section Heading
        </Text>
      </HStack>
      {sortOptions.map((option) => (
        <SelectOption key={option} title={option} value={option} />
      ))}
    </>
  );
  return (
    <SelectChip
      active={value !== undefined}
      content={content}
      onChange={setValue}
      value={value}
      {...props}
    />
  );
};

export const Default = () => (
  <HStack gap={2}>
    <ExampleSelectChip value="Balance" />
    <ExampleSelectChip placeholder="Sort by" />
  </HStack>
);

export const CustomEndNode = () => (
  <HStack gap={2}>
    <ExampleSelectChip
      end={<Icon color="iconForeground" name="filter" size="s" />}
      placeholder="Filter"
    />
    <ExampleSelectChip
      end={<Icon color="iconForeground" name="filter" size="s" />}
      placeholder="Filter"
      value="Balance"
    />
  </HStack>
);

type ValueObject = {
  label: string;
  title: string;
  value: string;
  iconName: UiIconName;
};

export const ObjectValueModel = () => {
  const options: ValueObject[] = [
    {
      label: 'Price',
      title: 'Price (High to Low)',
      value: 'price-high-low',
      iconName: 'arrowDown',
    },
    { label: 'Price', title: 'Price (Low to High)', value: 'price-low-high', iconName: 'arrowUp' },
    {
      label: 'Market Cap',
      title: 'Market Cap (High to Low)',
      value: 'market-cap-high-low',
      iconName: 'arrowDown',
    },
    {
      label: 'Market Cap',
      title: 'Market Cap (Low to High)',
      value: 'market-cap-low-high',
      iconName: 'arrowUp',
    },
  ];
  const [value, setValue] = useState(options[0]);

  const handleChange = (newValue: string) => {
    setValue(options.find(({ value }) => value === newValue) ?? options[0]);
  };

  const content = (
    <VStack>
      {options.map(({ title, value }) => (
        <SelectOption key={value} title={title} value={value} />
      ))}
    </VStack>
  );
  return (
    <SelectChip
      active={value !== undefined}
      content={content}
      end={<Icon color="iconForeground" name={value.iconName} size="s" />}
      onChange={(newValue: string) => handleChange(newValue)}
      value={value.value}
      valueLabel={value.label}
    />
  );
};

export const CustomStyle = () => {
  return (
    <ExampleSelectChip
      contentStyle={customContentStyle}
      sortOptions={customSortOptions}
      value={customSortOptions[0]}
    />
  );
};

export default {
  title: 'Core Components/Chips/SelectChip',
  component: SelectChip,
};
