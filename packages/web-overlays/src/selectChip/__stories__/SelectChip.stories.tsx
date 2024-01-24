import React, { useState } from 'react';
import { UiIconName } from '@cbhq/cds-icons';
import { Icon } from '@cbhq/cds-web/icons';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import { TextCaption } from '@cbhq/cds-web/typography';

import { SelectOption } from '../../select/SelectOption';
import { SelectChip, SelectChipProps } from '../SelectChip';

const sortOptions = ['Balance', 'Name', 'Asset Value'];

const ExampleSelectChip = ({
  value: defaultValue,
  ...props
}: Omit<SelectChipProps, 'onChange' | 'content' | 'children'>) => {
  const [value, setValue] = React.useState<string | undefined>(defaultValue);

  const content = (
    <>
      <HStack role="separator" spacingHorizontal={2} spacingVertical={2}>
        <TextCaption as="h2" color="foregroundMuted">
          Section Heading
        </TextCaption>
      </HStack>
      {sortOptions.map((option) => (
        <SelectOption key={option} title={option} value={option} />
      ))}
    </>
  );
  return (
    <SelectChip
      active={value !== undefined}
      // @ts-expect-error TODO: why is this happening?!
      content={content}
      onChange={setValue}
      value={value}
      {...props}
    />
  );
};

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export const Default = () => (
  <HStack gap={2}>
    <ExampleSelectChip value="Balance" />
    <ExampleSelectChip placeholder="Sort by" />
  </HStack>
);

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export const CustomEndNode = () => (
  <HStack gap={2}>
    <ExampleSelectChip
      end={<Icon color="foreground" name="filter" size="s" />}
      placeholder="Filter"
    />
    <ExampleSelectChip
      end={<Icon color="foreground" name="filter" size="s" />}
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

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
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
      // @ts-expect-error TODO: why is this happening?!
      content={content}
      end={<Icon color="foreground" name={value.iconName} size="s" />}
      // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
      onChange={(newValue: string) => handleChange(newValue)}
      value={value.value}
      valueLabel={value.label}
    />
  );
};

export default {
  title: 'Deprecated/SelectChip',
  component: SelectChip,
};
