import React from 'react';
import { Box } from '@cbhq/cds-mobile/layout';
import { TextInput } from '@cbhq/cds-mobile/controls/TextInput';
import { InputIcon } from '@cbhq/cds-mobile/controls/InputIcon';
import { createStories } from ':cds-storybook/stories/InputIcon';

import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';

export const {
  Basic,
  DefaultsToForeground,
  SetColorAndInheritFocusStyle,
  BasicEnd,
  AddCustomColor,
  AddCustomColorEnd,
  InvalidPlacement,
} = createStories(TextInput, InputIcon, (props) => (
  <Box {...props} background="backgroundAlternate" />
));

const InputIconScreen = () => {
  return (
    <ExamplesScreen>
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
    </ExamplesScreen>
  );
};

export default InputIconScreen;
