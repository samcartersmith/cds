import React, { useState } from 'react';
import { IconButton } from '@cbhq/cds-mobile/buttons/IconButton';
import { Icon } from '@cbhq/cds-mobile/icons';

import { BetaTextInput, BetaTextInputProps } from '@cbhq/cds-mobile/inputs/BetaTextInput';
import { Input } from '@cbhq/cds-mobile/inputs/Input';

import { TextBody } from '@cbhq/cds-mobile/typography';

import { Box, HStack, VStack } from '@cbhq/cds-mobile/layout';
import { Button } from '@cbhq/cds-mobile/buttons';
import ExamplesScreen from './internal/ExamplesScreen';
import Example from './internal/Example';

const MockTextInput = ({ ...props }: BetaTextInputProps) => {
  const [text, onChangeText] = useState('');

  return <BetaTextInput onChangeText={onChangeText} value={text} {...props} />;
};

const MockCompactTextInput = ({ ...props }: BetaTextInputProps) => {
  const [text, onChangeText] = useState('');

  return <BetaTextInput compact onChangeText={onChangeText} value={text} {...props} />;
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
          helperText={
            <Box background="backgroundOverlay" width="100%" height={30}>
              <TextBody>helperText</TextBody>
            </Box>
          }
          borderStyle={{
            borderWidth: 1,
          }}
          variant="primary"
        />
      </Example>
      <Example inline title="Input Prepend Only - Test for borderRadius">
        {/*
         * Ensure that every compartment does what its suppose to
         */}
        <Input
          prepend={
            <Box background="primary">
              <TextBody>Prepend</TextBody>
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
          helperText={
            <Box background="backgroundOverlay" width="100%" height={30}>
              <TextBody>helperText</TextBody>
            </Box>
          }
          borderStyle={{
            borderWidth: 1,
          }}
          variant="primary"
        />
      </Example>
      <Example inline title="Input Append Only - Test for borderRadius">
        {/*
         * Ensure that every compartment does what its suppose to
         */}
        <Input
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
          helperText={
            <Box background="backgroundOverlay" width="100%" height={30}>
              <TextBody>helperText</TextBody>
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
      <Example inline title="TextInput StartContent">
        <MockTextInput
          startContent={<IconButton variant="foregroundMuted" name="search" transparent />}
          label="Search"
          helperText="Search for assets here"
          variant="foregroundMuted"
          placeholder="ex. Bitcoin"
        />
      </Example>
      <Example inline title="TextInput endContent">
        <MockTextInput
          endContent={<Icon size="m" color="foregroundMuted" name="lightningBolt" />}
          label="Search"
          helperText="Search for assets here"
          variant="foregroundMuted"
          placeholder="ex. Bitcoin"
        />
      </Example>
      <Example inline title="TextInput endContent 50%">
        <MockTextInput
          endContent={<Icon size="m" color="foregroundMuted" name="lightningBolt" />}
          label="Search"
          width="50%"
          helperText="Search for assets here"
          variant="foregroundMuted"
          placeholder="ex. Bitcoin"
        />
      </Example>
      <Example inline title="TextInput Start Align Input Text">
        <MockTextInput label="Search" placeholder="ex. Bitcoin" textAlignInput="start" />
      </Example>
      <Example inline title="TextInput End Align Input Text">
        <MockTextInput label="Search" placeholder="ex. Bitcoin" textAlignInput="end" />
      </Example>
      <Example inline title="TextInput Start Align helperText">
        <MockTextInput
          label="Search"
          placeholder="ex. Bitcoin"
          textAlignHelperText="start"
          helperText="Great asset choice!"
        />
      </Example>
      <Example inline title="TextInput Start Align helperText and Input Text">
        <MockTextInput
          label="Search"
          placeholder="ex. Bitcoin"
          textAlignHelperText="start"
          textAlignInput="start"
          helperText="Great asset choice!"
        />
      </Example>
      <Example inline title="TextInput End Align helperText">
        <MockTextInput
          label="Search"
          placeholder="ex. Bitcoin"
          textAlignHelperText="end"
          helperText="Great asset choice!"
        />
      </Example>
      <Example inline title="TextInput endContent auto">
        <MockTextInput
          endContent={<Icon size="m" color="foregroundMuted" name="lightningBolt" />}
          label="Search"
          width="auto"
          helperText="Search for new asset listing on Coinbase"
          variant="foregroundMuted"
          placeholder="ex. Bitcoin"
        />
      </Example>
      <Example inline title="TextInput start/end Content">
        <MockTextInput
          endContent={<TextBody color="foregroundMuted">Cancel</TextBody>}
          startContent={<IconButton name="search" transparent />}
          label="Search"
          helperText="Search for assets here"
          variant="foregroundMuted"
          placeholder="ex. Bitcoin"
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
      <Example inline title="CompactTextInput Start Align helperText">
        <MockCompactTextInput
          label="One Time Password"
          placeholder="189-280-1111"
          textAlignHelperText="start"
          helperText="Password is looking good!"
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
