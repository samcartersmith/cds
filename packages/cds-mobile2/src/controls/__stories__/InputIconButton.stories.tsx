import React from 'react';
import type { InputVariant } from '@cbhq/cds-common2';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box } from '../../layout/Box';
import { InputIconButton } from '../InputIconButton';
import { TextInput } from '../TextInput';

const Basic = () => {
  const variants: InputVariant[] = [
    'foreground',
    'foregroundMuted',
    'primary',
    'negative',
    'positive',
  ];

  return (
    <>
      {variants.map((variant) => (
        <TextInput
          key={`${variant}-input-iconbutton`}
          label={variant}
          start={<InputIconButton accessibilityLabel="Add" name="add" variant="foregroundMuted" />}
          variant={variant}
          editable={__DEV__}
        />
      ))}
    </>
  );
};

const DefaultsToPrimary = () => {
  return (
    <TextInput
      label="Label"
      start={<InputIconButton accessibilityLabel="Search" name="search" />}
      variant="foregroundMuted"
      editable={__DEV__}
    />
  );
};

const SetColorAndInheritFocusStyle = () => {
  return (
    <TextInput
      label="Search"
      start={<InputIconButton accessibilityLabel="Search" name="search" variant="secondary" />}
      variant="foregroundMuted"
      editable={__DEV__}
    />
  );
};

const BasicEnd = () => {
  return (
    <TextInput
      end={<InputIconButton accessibilityLabel="Add" name="add" />}
      label="Label"
      editable={__DEV__}
    />
  );
};

const AddCustomColor = () => {
  return (
    <TextInput
      label="Label"
      start={
        <InputIconButton
          disableInheritFocusStyle
          accessibilityLabel="Add"
          name="add"
          variant="foregroundMuted"
        />
      }
      editable={__DEV__}
    />
  );
};

const AddCustomColorEnd = () => {
  return (
    <TextInput
      end={
        <InputIconButton
          disableInheritFocusStyle
          transparent
          accessibilityLabel="Add"
          name="add"
          variant="foregroundMuted"
        />
      }
      label="Label"
      editable={__DEV__}
    />
  );
};

const InputIconButtonScreen = () => {
  return (
    <ExampleScreen>
      <Example title="InputIconButton changes color with focus state">
        <Basic />
      </Example>

      <Example title="InputIconButton defaults to primary if no color is passed in">
        <DefaultsToPrimary />
      </Example>

      <Example title="InputIconButton has its own custom color when unFocused, but changes color with focus state when focused">
        <SetColorAndInheritFocusStyle />
      </Example>

      <Example title="InputIconButton works for end icons too">
        <BasicEnd />
      </Example>

      <Example title="Override color of focused state">
        <AddCustomColor />
      </Example>

      <Example title="Override color of focused state for end icon">
        <AddCustomColorEnd />
      </Example>

      <Example title="Using InputIconButton outside of a TextInput should not throw error">
        <Box alignItems="center" flexDirection="row" justifyContent="space-between" width={350}>
          <InputIconButton name="add" variant="foregroundMuted" />
        </Box>
      </Example>
    </ExampleScreen>
  );
};

export default InputIconButtonScreen;
