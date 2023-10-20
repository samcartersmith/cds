import React from 'react';
import { ScrollView } from 'react-native';
import { CreateSelectProps, selectBuilderMobile } from '@cbhq/cds-common/internal/selectBuilder';

import { DotSymbol } from '../../dots';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box, HStack, VStack } from '../../layout';
import { RemoteImage } from '../../media';
import { Tray } from '../../overlays/Tray/Tray';
import { InputIcon } from '../InputIcon';
import { Select } from '../Select';
import { SelectOption } from '../SelectOption';
import { TextInput } from '../TextInput';

export default function SelectScreen() {
  const { DefaultSelect, AssetSelect, ScrollableSelect, SelectFilter, SelectForm } =
    selectBuilderMobile({
      Tray,
      Select,
      SelectOption,
      ScrollView,
      HStack,
      TextInput,
      VStack,
      Box,
      RemoteImage,
      DotSymbol,
    } as CreateSelectProps);

  return (
    <ExampleScreen>
      <Example title="Default with Tray">
        <DefaultSelect placeholder="Select an option... " />
      </Example>
      <Example title="Asset Select with Tray">
        <AssetSelect />
      </Example>
      <Example title="Scrollable Tray">
        <ScrollableSelect hasDescription placeholder="Select an option... " />
      </Example>
      <Example title="Label and Helper Text">
        <DefaultSelect
          helperText="You may choose only one option"
          label="What do you want? "
          placeholder="Select an option... "
        />
      </Example>
      <Example title="Compact with Label">
        <ScrollableSelect compact compactSelectOption hasDescription label="Amt. to deposit" />
      </Example>
      <Example title="Start Node">
        <DefaultSelect
          accessibilityHint="Select cash amount"
          accessibilityLabel="USD Cash"
          startNode={<InputIcon name="cashUSD" />}
        />
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
          disabled
          helperText="I am helpful"
          label="I am a label"
          placeholder="This is a really long placeholder that will overflow and be truncated"
        />
      </Example>
      <Example title="Negative without HandleBar">
        <DefaultSelect
          hideHandleBar
          helperText="Wow this is really broken. Good luck! "
          label="I am a label"
          placeholder="Someone needs to fix this"
          variant="negative"
        />
      </Example>
      <Example title="Positive">
        <DefaultSelect
          label="What do you want?"
          placeholder="Some positive feedback"
          variant="positive"
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
