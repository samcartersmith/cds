import React, { useState } from 'react';
import { IconButton } from '@cbhq/cds-mobile/buttons/IconButton';
import { Icon } from '@cbhq/cds-mobile/icons';

import { TextField, TextFieldProps } from '@cbhq/cds-mobile/inputs/TextField';

import { TextBody } from '@cbhq/cds-mobile/typography';

import { Box, HStack, VStack } from '@cbhq/cds-mobile/layout';
import { Button } from '@cbhq/cds-mobile/buttons';
import ExamplesScreen from './internal/ExamplesScreen';
import Example from './internal/Example';

const MockTextInput = ({ ...props }: TextFieldProps) => {
  const [text, onChangeText] = useState('');

  return <TextField onChangeText={onChangeText} value={text} {...props} />;
};

const MockCompactTextInput = ({ ...props }: TextFieldProps) => {
  const [text, onChangeText] = useState('');

  return <TextField compact onChangeText={onChangeText} value={text} {...props} />;
};

const MockComplexInput = () => {
  const [text, onChangeText] = useState('');

  return (
    <HStack justifyContent="center">
      <TextField width={50} label="Test" onChangeText={onChangeText} value={text} />
      <VStack spacingTop={0.5}>
        <Box spacingTop={3}>
          <Button>Hello</Button>
        </Box>
      </VStack>
    </HStack>
  );
};

export default function InputScreen() {
  return (
    <ExamplesScreen>
      <Example inline title="TextField ForegroundMuted">
        <MockTextInput
          label="Username"
          helperText="username must start with an @ symbol"
          variant="foregroundMuted"
          placeholder="john.doe@coinbase.com"
        />
      </Example>
      <Example inline title="TextField Positive">
        <MockTextInput
          label="Username"
          helperText="username must start with an @ symbol"
          variant="positive"
          placeholder="john.doe@coinbase.com"
        />
      </Example>
      <Example inline title="TextField Negative">
        <MockTextInput
          label="Username"
          helperText="username must start with an @ symbol"
          variant="negative"
          placeholder="john.doe@coinbase.com"
        />
      </Example>
      <Example inline title="TextField startNode">
        <MockTextInput
          start={<IconButton variant="foregroundMuted" name="search" transparent />}
          label="Search"
          helperText="Search for assets here"
          variant="foregroundMuted"
          placeholder="ex. Bitcoin"
        />
      </Example>
      <Example inline title="TextField endNode">
        <MockTextInput
          end={<Icon size="m" color="foregroundMuted" name="lightningBolt" />}
          label="Search"
          helperText="Search for assets here"
          variant="foregroundMuted"
          placeholder="ex. Bitcoin"
        />
      </Example>
      <Example inline title="TextField endNode 50%">
        <MockTextInput
          end={<Icon size="m" color="foregroundMuted" name="lightningBolt" />}
          label="Search"
          width={50}
          helperText="Search for assets here"
          variant="foregroundMuted"
          placeholder="ex. Bitcoin"
        />
      </Example>
      <Example inline title="TextField Start Align Input Text and HelperText">
        <MockTextInput
          label="Search"
          placeholder="ex. Bitcoin"
          align="start"
          helperText="HelperText"
        />
      </Example>
      <Example inline title="TextField End Align Input Text and HelperText">
        <MockTextInput
          label="Search"
          placeholder="ex. Bitcoin"
          helperText="HelperText"
          align="end"
        />
      </Example>
      <Example inline title="TextField start/end Node">
        <MockTextInput
          end={<TextBody color="foregroundMuted">Cancel</TextBody>}
          start={<IconButton name="search" transparent />}
          label="Search"
          helperText="Search for assets here"
          variant="foregroundMuted"
          placeholder="ex. Bitcoin"
        />
      </Example>
      <Example inline title="TextField Disabled">
        <MockTextInput
          disabled
          label="One Time Password"
          variant="foregroundMuted"
          placeholder="189-280-1111"
        />
      </Example>
      <Example inline title="CompactTextField">
        <MockCompactTextInput
          label="One Time Password"
          variant="foregroundMuted"
          placeholder="189-280-1111"
        />
      </Example>
      <Example inline title="CompactTextField Negative">
        <MockCompactTextInput
          label="One Time Password"
          variant="negative"
          placeholder="189-280-1111"
          helperText="Password is in an incorrect format"
        />
      </Example>
      <Example inline title="CompactTextField Positive">
        <MockCompactTextInput
          label="One Time Password"
          variant="positive"
          placeholder="189-280-1111"
          helperText="Password is looking good!"
        />
      </Example>
      <Example inline title="CompactTextField Start Align Input Text and HelperText">
        <MockCompactTextInput
          label="One Time Password"
          placeholder="189-280-1111"
          align="start"
          helperText="Password is looking good!"
        />
      </Example>
      <Example inline title="CompactTextField 50%">
        <MockCompactTextInput label="Bitcoin" width={50} placeholder="190" />
      </Example>
      <Example inline title="CompactTextField Disabled">
        <MockCompactTextInput label="Bitcoin" disabled />
      </Example>
      <Example>
        <MockComplexInput />
      </Example>
    </ExamplesScreen>
  );
}
