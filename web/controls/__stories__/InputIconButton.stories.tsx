import { inputIconButtonBuilder } from '@cbhq/cds-common/internal/inputIconButtonBuilder';

import { InputIconButton } from '../InputIconButton';
import { TextInput } from '../TextInput';
import { Box } from '../../layout/Box';

export default {
  title: 'Core Components/Inputs/InputIconButton',
  component: InputIconButton,
};

export const {
  Basic,
  SetColorAndInheritFocusStyle,
  DefaultsToPrimary,
  BasicEnd,
  AddCustomColor,
  AddCustomColorEnd,
  InvalidPlacement,
} = inputIconButtonBuilder(TextInput, InputIconButton, (props) => (
  <Box {...props} background="backgroundAlternate" />
));
