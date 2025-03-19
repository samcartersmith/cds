import React from 'react';
import type { ThemeVars } from '@cbhq/cds-common2/core/theme';
import type { InputVariant } from '@cbhq/cds-common2';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box } from '../../layout/Box';
import { InputIcon } from '../InputIcon';
import { TextInput } from '../TextInput';

const variants = ['foreground', 'foregroundMuted', 'primary', 'negative', 'positive'] as const;

const variantColorMap: Record<InputVariant, ThemeVars.Color> = {
  primary: 'fgPrimary',
  positive: 'fgPositive',
  negative: 'fgNegative',
  foreground: 'fg',
  foregroundMuted: 'fgMuted',
  secondary: 'bgSecondary',
};

const Basic = () => {
  return (
    <>
      {variants.map((variant) => (
        <TextInput
          key={`${variant}-inputicon`}
          label={variant}
          start={<InputIcon color={variantColorMap[variant]} name="add" />}
          variant={variant}
          editable={__DEV__}
        />
      ))}
    </>
  );
};

const AccessibleInputIcon = () => {
  return (
    <TextInput
      accessibilityLabel="Search add an item"
      label="Add"
      start={<InputIcon name="add" />}
      editable={__DEV__}
    />
  );
};

const DefaultsToForeground = () => {
  return (
    <TextInput
      label="Search"
      start={<InputIcon name="search" />}
      variant="foregroundMuted"
      editable={__DEV__}
    />
  );
};

const SetColorAndInheritFocusStyle = () => {
  return (
    <TextInput
      label="Search"
      start={<InputIcon color="fgPositive" name="search" />}
      variant="foregroundMuted"
      editable={__DEV__}
    />
  );
};

const BasicEnd = () => {
  return <TextInput end={<InputIcon name="add" />} label="Label" editable={__DEV__} />;
};

const AddCustomColor = () => {
  return (
    <TextInput
      label="Label"
      start={<InputIcon disableInheritFocusStyle color="fg" name="add" />}
      editable={__DEV__}
    />
  );
};

const AddCustomColorEnd = () => {
  return (
    <TextInput
      end={<InputIcon disableInheritFocusStyle color="fg" name="add" />}
      label="Label"
      editable={__DEV__}
    />
  );
};

const InvalidPlacement = () => {
  return (
    <Box background="bgAlternate">
      <InputIcon name="add" />
    </Box>
  );
};

const InputIconScreen = () => {
  return (
    <ExampleScreen>
      <Example title="InputIcon changes color with focus state">
        <Basic />
      </Example>

      <Example title="With good accessible label">
        <AccessibleInputIcon />
      </Example>

      <Example title="InputIcon defaults to foreground if no color is passed in">
        <DefaultsToForeground />
      </Example>

      <Example title="InputIcon has its own custom color when unFocused, but changes color with focus state when focused">
        <SetColorAndInheritFocusStyle />
      </Example>

      <Example title="InputIcon works for end icons too">
        <BasicEnd />
      </Example>

      <Example title="Override color of focused state">
        <AddCustomColor />
      </Example>

      <Example title="Override color of focused state for end icon">
        <AddCustomColorEnd />
      </Example>

      <Example title="Using InputIcon outside of a TextInput should not throw error">
        <InvalidPlacement />
      </Example>
    </ExampleScreen>
  );
};

export default InputIconScreen;
