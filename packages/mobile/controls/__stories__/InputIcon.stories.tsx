import React from 'react';
import { inputIconBuilder } from '@cbhq/cds-common/internal/inputIconBuilder';

import { Box } from '../../layout/Box';

import { TextInput } from '../TextInput';
import { InputIcon } from '../InputIcon';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';

export const {
  Basic,
  DefaultsToForeground,
  SetColorAndInheritFocusStyle,
  BasicEnd,
  AddCustomColor,
  AddCustomColorEnd,
  InvalidPlacement,
} = inputIconBuilder(TextInput, InputIcon, (props) => (
  <Box {...props} background="backgroundAlternate" />
));

const InputIconScreen = () => {
  return (
    <ExampleScreen>
      <Example title="InputIcon changes color with focus state">
        <Basic />
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
