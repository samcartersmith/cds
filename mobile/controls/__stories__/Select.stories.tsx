import React from 'react';
import { ScrollView } from 'react-native';
import { prices } from '@cbhq/cds-common/internal/data/prices';
import { selectBuilderMobile, CreateSelectProps } from '@cbhq/cds-common/internal/selectBuilder';

import { Tray } from '../../overlays/Tray/Tray';

import { Select } from '../Select';
import { SelectOption } from '../SelectOption';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack, VStack } from '../../layout';
import { TextInput } from '../TextInput';
import { InputIcon } from '../InputIcon';

const longListOfOptions = prices.slice(0, 10).map((option) => {
  return {
    label: option,
    value: option,
  };
});

const options = [
  {
    label: 'Cake',
    value: 'Cake',
  },
  {
    label: 'Death',
    value: 'Death',
  },
];

export default function SelectScreen() {
  const { DefaultSelect, ScrollableSelect, SelectFilter, SelectForm } = selectBuilderMobile({
    Tray,
    Select,
    SelectOption,
    ScrollView,
    HStack,
    TextInput,
    VStack,
  } as CreateSelectProps);

  return (
    <ExampleScreen>
      <Example title="Default with Tray">
        <DefaultSelect placeholder="Cake or death?" options={options} />
      </Example>
      <Example title="Scrollable Tray">
        <ScrollableSelect
          placeholder="Choose an option"
          options={longListOfOptions}
          hasDescription
        />
      </Example>
      <Example title="Label and Helper Text">
        <DefaultSelect
          label="What is your demise? "
          helperText="You may choose only one option"
          placeholder="Choose wisely... "
          options={options}
        />
      </Example>
      <Example title="Compact with Label">
        <ScrollableSelect
          label="Amt. to deposit"
          placeholder="$1,000,000"
          compact
          hasDescription
          compactSelectOption
          options={longListOfOptions}
        />
      </Example>
      <Example title="Start Node">
        <DefaultSelect
          value={longListOfOptions[0].value}
          options={longListOfOptions}
          startNode={<InputIcon name="cashUSD" />}
        />
      </Example>
      <Example title="Start Node with Compact Label">
        <DefaultSelect
          compact
          label="How much would you like to deposit? "
          value={longListOfOptions[0].value}
          options={longListOfOptions}
          startNode={<InputIcon name="cashUSD" />}
        />
      </Example>
      <Example title="Disabled">
        <DefaultSelect
          placeholder="This is a really long placeholder that will overflow and be truncated"
          disabled
          options={options}
          label="I am a label"
          helperText="I am helpful"
        />
      </Example>
      <Example title="Negative without HandleBar">
        <DefaultSelect
          label="I am a label"
          variant="negative"
          placeholder="Someone needs to fix this"
          helperText="Wow this is really broken. Good luck! "
          options={options}
          hideHandleBar
        />
      </Example>
      <Example title="Positive">
        <DefaultSelect
          label="What do you want?"
          variant="positive"
          placeholder="Some positive feedback"
          options={options}
        />
      </Example>
      <Example title="Select Filters">
        <SelectFilter />
      </Example>
      <Example title="Select in a Form">
        <SelectForm />
      </Example>
    </ExampleScreen>
  );
}
