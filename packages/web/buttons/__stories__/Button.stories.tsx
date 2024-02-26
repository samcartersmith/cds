import { buttonBuilder, buttonStories } from '@cbhq/cds-common/internal/buttonBuilder';

import { Button } from '../Button';

const { build, buildSheet } = buttonBuilder(Button);
build();

export const createButtonStories = buildSheet([...buttonStories]);

export default {
  component: Button,
  title: 'Core Components/Buttons/Button',
};
