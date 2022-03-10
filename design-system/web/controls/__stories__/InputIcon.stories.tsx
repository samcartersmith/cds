import { inputIconBuilder } from '@cbhq/cds-common/internal/inputIconBuilder';

import { InputIcon } from '../InputIcon';
import { TextInput } from '../TextInput';
import { Box } from '../../layout/Box';

export default {
  title: 'Core Components/Inputs/InputIcon',
  component: InputIcon,
};

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
