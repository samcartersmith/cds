import { buttonBuilder, buttonStories } from '@cbhq/cds-common/internal/buttonBuilder';

import { Icon } from '../../icons';
import { VStack } from '../../layout';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';

const { build, buildSheet } = buttonBuilder(Button);
build();

export const createButtonStories = buildSheet([...buttonStories]);

export default {
  component: Button,
  title: 'Core Components/Buttons/Button',
};
export const CustomEndIconButton = () => (
  <VStack gap={2}>
    <ButtonGroup accessibilityLabel="Group">
      <Button end={<Icon color="foreground" name="caretRight" size="s" />}>Test</Button>
      <Button end={<Icon color="foreground" name="add" size="s" />} variant="secondary">
        Test
      </Button>
      <Button
        end={<Icon color="foreground" name="add" size="s" />}
        endIcon="airdrop"
        variant="secondary"
      >
        Test
      </Button>
    </ButtonGroup>
  </VStack>
);
