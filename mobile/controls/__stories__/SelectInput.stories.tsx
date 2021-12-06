import React from 'react';
import { ScrollView } from 'react-native';
import { prices } from '@cbhq/cds-common/internal/data/prices';
import {
  selectInputBuilderMobile,
  CreateSelectInputProps,
} from '@cbhq/cds-common/internal/selectInputBuilder';

import { Tray } from '../../overlays/Tray/Tray';

import { SelectInput } from '../SelectInput';
import { SelectOptionCell } from '../SelectOptionCell';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';

const longListOfOptions = prices.slice(0, 10).map((option) => {
  return {
    label: option,
    value: option,
  };
});

export default function SelectInputScreen() {
  const { DefaultSelectInput, ScrollableSelectInput } = selectInputBuilderMobile({
    Tray,
    SelectInput,
    SelectOptionCell,
    ScrollView,
  } as CreateSelectInputProps);

  return (
    <ExampleScreen>
      <Example title="Default with Tray">
        <DefaultSelectInput placeholder="Cake or death?" options={options} />
      </Example>
      <Example title="With Helper Text & Scrollable Tray">
        <ScrollableSelectInput
          placeholder="Choose an option"
          options={longListOfOptions}
          hasDescription
          helperText="I am helpful"
        />
      </Example>
      <Example title="With Label">
        <DefaultSelectInput
          label="What is your demise? "
          placeholder="Choose wisely... "
          options={options}
        />
      </Example>
      <Example title="Compact with Label">
        <ScrollableSelectInput
          label="$"
          placeholder="1,000,000"
          compact
          hasDescription
          compactSelectOptionCell
          options={longListOfOptions}
        />
      </Example>
      <Example title="Disabled">
        <DefaultSelectInput
          placeholder="This is a really long placeholder that will overflow and be truncated"
          disabled
          options={options}
          label="I am a label"
          helperText="I am helpful"
        />
      </Example>
      <Example title="Negative without HandleBar">
        <DefaultSelectInput
          label="I am a label"
          variant="negative"
          placeholder="Someone needs to fix this"
          helperText="Wow this is really broken. Good luck! "
          options={options}
          hideHandleBar
        />
      </Example>
      <Example title="Positive">
        <DefaultSelectInput
          label="What do you want?"
          variant="positive"
          placeholder="Some positive feedback"
          options={options}
        />
      </Example>
    </ExampleScreen>
  );
}

const options = [
  {
    label: 'Cake',
    value: 'CAKE',
  },
  {
    label: 'Death',
    value: 'DEATH',
  },
];
