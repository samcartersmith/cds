import React from 'react';
import { Box } from '@cbhq/cds-mobile/layout';
import { TextInput } from '@cbhq/cds-mobile/controls/TextInput';
import { InputIconButton } from '@cbhq/cds-mobile/controls/InputIconButton';
import { createStories } from ':cds-storybook/stories/InputIconButton';

import Example from '../internal/Example';
import ExamplesScreen from '../internal/ExamplesScreen';

export const {
  Basic,
  SetColorAndInheritFocusStyle,
  DefaultsToPrimary,
  BasicEnd,
  AddCustomColor,
  AddCustomColorEnd,
  InvalidPlacement,
} = createStories(TextInput, InputIconButton, (props) => (
  <Box {...props} background="backgroundAlternate" />
));

const InputIconButtonScreen = () => {
  return (
    <ExamplesScreen>
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
        <Box flexDirection="row" alignItems="center" justifyContent="space-between" width={350}>
          <InputIconButton name="add" variant="foregroundMuted" />
        </Box>
      </Example>
    </ExamplesScreen>
  );
};

export default InputIconButtonScreen;
