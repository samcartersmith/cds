import React from 'react';
import { ScrollView } from 'react-native';
import { prices } from '@cbhq/cds-common/internal/data/prices';
import { selectBuilderMobile, CreateSelectProps } from '@cbhq/cds-common/internal/selectBuilder';

import { Tray } from '../../overlays/Tray/Tray';

import { Select } from '../Select';
import { SelectOption } from '../SelectOption';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';

const longListOfOptions = prices.slice(0, 10).map((option) => {
  return {
    label: option,
    value: option,
  };
});

export default function SelectScreen() {
  const { DefaultSelect, ScrollableSelect } = selectBuilderMobile({
    Tray,
    Select,
    SelectOption,
    ScrollView,
  } as CreateSelectProps);

  return (
    <ExampleScreen>
      <Example title="Default with Tray">
        <DefaultSelect placeholder="Cake or death?" options={options} />
      </Example>
      <Example title="With Helper Text & Scrollable Tray">
        <ScrollableSelect
          placeholder="Choose an option"
          options={longListOfOptions}
          hasDescription
          helperText="I am helpful"
        />
      </Example>
      <Example title="With Label">
        <DefaultSelect
          label="What is your demise? "
          placeholder="Choose wisely... "
          options={options}
        />
      </Example>
      <Example title="Compact with Label">
        <ScrollableSelect
          label="$"
          placeholder="1,000,000"
          compact
          hasDescription
          compactSelectOption
          options={longListOfOptions}
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
