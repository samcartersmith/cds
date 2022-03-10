import React from 'react';
import { ScrollView } from 'react-native';
import { CreateSelectProps, selectBuilderMobile } from '@cbhq/cds-common/internal/selectBuilder';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack, VStack } from '../../layout';
import { Tray } from '../../overlays/Tray/Tray';
import { InputIcon } from '../InputIcon';
import { Select } from '../Select';
import { SelectOption } from '../SelectOption';
import { TextInput } from '../TextInput';

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
        <DefaultSelect placeholder="Select an option... " />
      </Example>
      <Example title="Scrollable Tray">
        <ScrollableSelect placeholder="Select an option... " hasDescription />
      </Example>
      <Example title="Label and Helper Text">
        <DefaultSelect
          label="What do you want? "
          helperText="You may choose only one option"
          placeholder="Select an option... "
        />
      </Example>
      <Example title="Compact with Label">
        <ScrollableSelect label="Amt. to deposit" compact hasDescription compactSelectOption />
      </Example>
      <Example title="Start Node">
        <DefaultSelect startNode={<InputIcon name="cashUSD" />} />
      </Example>
      <Example title="Start Node with Compact Label">
        <DefaultSelect
          compact
          label="How much would you like to deposit? "
          startNode={<InputIcon name="cashUSD" />}
        />
      </Example>
      <Example title="Disabled">
        <DefaultSelect
          placeholder="This is a really long placeholder that will overflow and be truncated"
          disabled
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
          hideHandleBar
        />
      </Example>
      <Example title="Positive">
        <DefaultSelect
          label="What do you want?"
          variant="positive"
          placeholder="Some positive feedback"
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
