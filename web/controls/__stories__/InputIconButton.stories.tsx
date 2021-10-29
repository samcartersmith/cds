import { InputIconButton } from '../InputIconButton';
import { TextInput } from '../TextInput';
import { Box } from '../../layout/Box';
import { createStories } from ':cds-storybook/stories/InputIconButton';

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
} = createStories(TextInput, InputIconButton, (props) => (
  <Box {...props} background="backgroundAlternate" />
));
