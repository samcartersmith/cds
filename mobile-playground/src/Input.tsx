import React, { useState } from 'react';
import { IconButton } from '@cbhq/cds-mobile/buttons/IconButton';
import { Icon } from '@cbhq/cds-mobile/icons';

import { BetaTextInput, BetaTextInputProps } from '@cbhq/cds-mobile/inputs/BetaTextInput';
import { Input } from '@cbhq/cds-mobile/inputs/Input';
import {
  BetaCompactTextInput,
  BetaCompactTextInputProps,
} from '@cbhq/cds-mobile/inputs/BetaCompactTextInput';

import { TextBody } from '@cbhq/cds-mobile/typography';

import { Box, HStack, VStack } from '@cbhq/cds-mobile/layout';
import { Button } from '@cbhq/cds-mobile/buttons';
import ExamplesScreen from './internal/ExamplesScreen';
import Example from './internal/Example';

const MockTextInput = ({ ...props }: BetaTextInputProps) => {
  const [text, onChangeText] = useState('');

  return <BetaTextInput onChangeText={onChangeText} value={text} {...props} />;
};

const MockCompactTextInput = ({ ...props }: BetaCompactTextInputProps) => {
  const [text, onChangeText] = useState('');

  return <BetaCompactTextInput onChangeText={onChangeText} value={text} {...props} />;
};

const MockComplexInput = () => {
  const [text, onChangeText] = useState('');

  return (
    <HStack justifyContent="center">
      <BetaTextInput width="50%" label="Test" onChangeText={onChangeText} value={text} />
      <VStack spacingTop={0.5}>
        <Box spacingTop={2}>
          <Button>Hello</Button>
        </Box>
      </VStack>
    </HStack>
  );
};

export default function InputScreen() {
  return (
    <ExamplesScreen>
      <Example inline title="Input Layout">
        {/*
         * Ensure that every compartment does what its suppose to
         */}
        <Input
          prepend={
            <Box background="primary">
              <TextBody>Prepend</TextBody>
            </Box>
          }
          append={
            <Box background="primary">
              <TextBody>Append</TextBody>
            </Box>
          }
          startContent={
            <Box background="positive">
              <TextBody>StartContent</TextBody>
            </Box>
          }
          endContent={
            <Box background="positive">
              <TextBody>EndContent</TextBody>
            </Box>
          }
          input={
            <Box background="backgroundAlternate" flexGrow={2}>
              <TextBody>Input</TextBody>
            </Box>
          }
          label={
            <Box background="backgroundAlternate" width="100%" height={30}>
              <TextBody>Label</TextBody>
            </Box>
          }
          messageArea={
            <Box background="backgroundOverlay" width="100%" height={30}>
              <TextBody>MessageArea</TextBody>
            </Box>
          }
          borderStyle={{
            borderWidth: 1,
          }}
          variant="primary"
        />
      </Example>
      <Example inline title="TextInput ForegroundMuted">
        <MockTextInput
          label="Username"
          description="username must start with an @ symbol"
          variant="foregroundMuted"
          placeholder="john.doe@coinbase.com"
        />
      </Example>
      <Example inline title="TextInput Positive">
        <MockTextInput
          label="Username"
          description="username must start with an @ symbol"
          variant="positive"
          placeholder="john.doe@coinbase.com"
        />
      </Example>
      <Example inline title="TextInput Negative">
        <MockTextInput
          label="Username"
          description="username must start with an @ symbol"
          variant="negative"
          placeholder="john.doe@coinbase.com"
        />
      </Example>
      <Example inline title="TextInput StartContent">
        <MockTextInput
          startContent={<IconButton variant="foregroundMuted" name="search" transparent />}
          label="Search"
          description="Search for assets here"
          variant="foregroundMuted"
          placeholder="ex. Bitcoin"
        />
      </Example>
      <Example inline title="TextInput endContent">
        <MockTextInput
          endContent={<Icon size="m" color="foregroundMuted" name="lightningBolt" />}
          label="Search"
          description="Search for assets here"
          variant="foregroundMuted"
          placeholder="ex. Bitcoin"
        />
      </Example>
      <Example inline title="TextInput endContent 50%">
        <MockTextInput
          endContent={<Icon size="m" color="foregroundMuted" name="lightningBolt" />}
          label="Search"
          width="50%"
          description="Search for assets here"
          variant="foregroundMuted"
          placeholder="ex. Bitcoin"
        />
      </Example>
      <Example inline title="TextInput endContent auto">
        <MockTextInput
          endContent={<Icon size="m" color="foregroundMuted" name="lightningBolt" />}
          label="Search"
          width="auto"
          description="Search for new asset listing on Coinbase"
          variant="foregroundMuted"
          placeholder="ex. Bitcoin"
        />
      </Example>
      <Example inline title="TextInput start/end Content">
        <MockTextInput
          endContent={<TextBody color="foregroundMuted">Cancel</TextBody>}
          startContent={<IconButton name="search" transparent />}
          label="Search"
          description="Search for assets here"
          variant="foregroundMuted"
          placeholder="ex. Bitcoin"
        />
      </Example>
      <Example inline title="TextInput Prefix">
        <MockTextInput
          label="One Time Password"
          description="One Time Password for 2FA Authentication"
          variant="foregroundMuted"
          prefix="000"
          placeholder="189-280-1111"
        />
      </Example>
      <Example inline title="TextInput Suffix">
        <MockTextInput
          label="One Time Password"
          description="One Time Password for 2FA Authentication"
          variant="foregroundMuted"
          suffix="010000000"
          placeholder="189-280-1111"
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
          description="Password is in an incorrect format"
        />
      </Example>
      <Example inline title="CompactTextInput Positive">
        <MockCompactTextInput
          label="One Time Password"
          variant="positive"
          placeholder="189-280-1111"
          description="Password is looking good!"
        />
      </Example>
      <Example inline title="CompactTextInput 50%">
        <MockCompactTextInput label="Bitcoin" width="50%" placeholder="190" />
      </Example>
      <Example>
        <MockComplexInput />
      </Example>
    </ExamplesScreen>
  );
}
