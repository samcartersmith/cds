import { InputIcon } from '../InputIcon';
import { TextInput } from '../TextInput';
import { Box } from '../../layout/Box';
import { createStories } from ':cds-storybook/stories/InputIcon';

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
} = createStories(TextInput, InputIcon, (props) => (
  <Box {...props} background="backgroundAlternate" />
));
