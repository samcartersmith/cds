import React, { useState } from 'react';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box } from '../../layout/Box';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { TextBody } from '../../typography/TextBody';
import { InputIcon } from '../InputIcon';
import { InputIconButton } from '../InputIconButton';
import { TextInput, TextInputProps } from '../TextInput';

const MockTextInput = ({ ...props }: TextInputProps) => {
  const [text, onChangeText] = useState('');

  return <TextInput onChangeText={onChangeText} value={text} {...props} />;
};

const MockCompactTextInput = ({ ...props }: TextInputProps) => {
  const [text, onChangeText] = useState('');

  return <TextInput compact onChangeText={onChangeText} value={text} {...props} />;
};

const MockComplexInput = () => {
  const [text, onChangeText] = useState('');

  return (
    <HStack justifyContent="center">
      <TextInput
        accessibilityLabel="Text input field"
        width="50%"
        label="Test"
        onChangeText={onChangeText}
        value={text}
      />
      <VStack spacingTop={1}>
        <Box spacingTop={3}>
          <Button>Hello</Button>
        </Box>
      </VStack>
    </HStack>
  );
};

export default function InputScreen() {
  return (
    <ExampleScreen>
      <Example inline title="TextInput ForegroundMuted">
        <MockTextInput
          label="Username"
          helperText="username must start with an @ symbol"
          variant="foregroundMuted"
          placeholder="john.doe@coinbase.com"
        />
      </Example>
      <Example inline title="TextInput Positive">
        <MockTextInput
          label="Username"
          helperText="username must start with an @ symbol"
          variant="positive"
          placeholder="john.doe@coinbase.com"
        />
      </Example>
      <Example inline title="TextInput Negative">
        <MockTextInput
          label="Username"
          helperText="username must start with an @ symbol"
          variant="negative"
          placeholder="john.doe@coinbase.com"
        />
      </Example>
      <Example inline title="TextInput startNode">
        <MockTextInput
          start={<InputIconButton name="search" transparent />}
          label="Search"
          helperText="Search for assets here"
          variant="foregroundMuted"
          placeholder="ex. Bitcoin"
        />
      </Example>
      <Example inline title="TextInput endNode">
        <MockTextInput
          end={<InputIcon name="lightningBolt" />}
          label="Search"
          helperText="Search for assets here"
          variant="foregroundMuted"
          placeholder="ex. Bitcoin"
        />
      </Example>
      <Example inline title="TextInput endNode 50%">
        <MockTextInput
          end={<InputIcon name="lightningBolt" />}
          label="Search"
          width="50%"
          helperText="Search for assets here"
          variant="foregroundMuted"
          placeholder="ex. Bitcoin"
        />
      </Example>
      <Example inline title="TextInput Start Align Input Text and HelperText">
        <MockTextInput
          label="Search"
          placeholder="ex. Bitcoin"
          align="start"
          helperText="HelperText"
        />
      </Example>
      <Example inline title="TextInput End Align Input Text and HelperText">
        <MockTextInput
          label="Search"
          placeholder="ex. Bitcoin"
          helperText="HelperText"
          align="end"
        />
      </Example>
      <Example inline title="TextInput start/end Node">
        <MockTextInput
          end={
            <TextBody spacingEnd={2} color="foregroundMuted">
              Cancel
            </TextBody>
          }
          start={<InputIconButton name="search" transparent />}
          label="Search"
          helperText="Search for assets here"
          variant="foregroundMuted"
          placeholder="ex. Bitcoin"
        />
      </Example>
      <Example inline title="TextInput suffix">
        <MockTextInput
          label="Search"
          helperText="Search for assets here"
          variant="foregroundMuted"
          placeholder="ex. Bitcoin"
          suffix="DOGE"
        />
      </Example>
      <Example inline title="TextInput Disabled">
        <MockTextInput
          disabled
          label="One Time Password"
          variant="foregroundMuted"
          placeholder="189-280-1111"
        />
      </Example>
      <Example inline title="TextInput No Label">
        <MockTextInput variant="foregroundMuted" placeholder="189-280-1111" />
      </Example>
      <Example inline title="CompactTextInput">
        <MockCompactTextInput
          label="One Time Password"
          variant="foregroundMuted"
          placeholder="189-280-1111"
        />
      </Example>
      <Example inline title="CompactTextInput Negative">
        <MockCompactTextInput
          label="One Time Password"
          variant="negative"
          placeholder="189-280-1111"
          helperText="Password is in an incorrect format"
        />
      </Example>
      <Example inline title="CompactTextInput Positive">
        <MockCompactTextInput
          label="One Time Password"
          variant="positive"
          placeholder="189-280-1111"
          helperText="Password is looking good!"
        />
      </Example>
      <Example inline title="CompactTextInput Start Align Input Text and HelperText">
        <MockCompactTextInput
          label="One Time Password"
          placeholder="189-280-1111"
          align="start"
          helperText="Password is looking good!"
        />
      </Example>
      <Example inline title="CompactTextInput 50%">
        <MockCompactTextInput label="Bitcoin" width="50%" placeholder="190" />
      </Example>
      <Example inline title="CompactTextInput Disabled">
        <MockCompactTextInput label="Bitcoin" disabled />
      </Example>
      <Example inline title="Accessibility Test">
        <MockCompactTextInput
          label="Bitcoin"
          accessibilityHint="Bitcoin search"
          accessibilityLabel="Bitcoin search"
        />
      </Example>
      <Example>
        <MockComplexInput />
      </Example>
    </ExampleScreen>
  );
}
