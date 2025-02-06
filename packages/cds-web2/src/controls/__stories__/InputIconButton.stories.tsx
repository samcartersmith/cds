import React from 'react';
import { inputIconButtonBuilder } from '@cbhq/cds-common2/internal/inputIconButtonBuilder';

import { Box } from '../../layout/Box';
import { InputIconButton } from '../InputIconButton';
import { TextInput } from '../TextInput';

export default {
  title: 'Core Components/Inputs/InputIconButton',
  component: InputIconButton,
};

const {
  Basic,
  SetColorAndInheritFocusStyle,
  DefaultsToPrimary,
  BasicEnd,
  AddCustomColor,
  AddCustomColorEnd,
  InvalidPlacement,
} = inputIconButtonBuilder(TextInput, InputIconButton, (props) => (
  <Box {...props} background="bgAlternate" />
));

export {
  AddCustomColor,
  AddCustomColorEnd,
  Basic,
  BasicEnd,
  DefaultsToPrimary,
  InvalidPlacement,
  SetColorAndInheritFocusStyle,
};
