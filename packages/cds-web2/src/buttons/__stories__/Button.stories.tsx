import React from 'react';
import { buttonBuilder, buttonStories } from '@cbhq/cds-common2/internal/buttonBuilder';

import { Icon } from '../../icons/Icon';
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
      <Button end={<Icon color="fg" name="caretRight" size="s" />}>Test</Button>
      <Button end={<Icon color="fg" name="add" size="s" />} variant="secondary">
        Test
      </Button>
      <Button end={<Icon color="fg" name="add" size="s" />} endIcon="airdrop" variant="secondary">
        Test
      </Button>
    </ButtonGroup>
  </VStack>
);
