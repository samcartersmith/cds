import React from 'react';
import { inputIconButtonBuilder } from '@cbhq/cds-common2/internal/inputIconButtonBuilder';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box } from '../../layout/Box';
import { InputIconButton } from '../InputIconButton';
import { TextInput } from '../TextInput';

const {
  Basic,
  SetColorAndInheritFocusStyle,
  DefaultsToPrimary,
  BasicEnd,
  AddCustomColor,
  AddCustomColorEnd,
} = inputIconButtonBuilder(
  (props) => <TextInput editable={__DEV__} {...props} />,
  InputIconButton,
  (props) => <Box {...props} background="bgAlternate" />,
);

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
