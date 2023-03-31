import { buttonBuilder, buttonStories } from '@cbhq/cds-common/internal/buttonBuilder';

import { Button } from '../Button';

const { build, buildSheet } = buttonBuilder(Button);
build();

export const createButtonStories = buildSheet([
  ...buttonStories,
  {
    numberOfLines: 2,
    // @ts-expect-error We exclude children prop from types in storybuilder so that we don't have to repeat for each story, but we want to override for this use case.
    children:
      'Some really really really long button text that should get truncated after wrapping two lines',
  },
]);

export default {
  component: Button,
  title: 'Core Components/Buttons/Button',
};
