import { createButtonStories, CreateButtonStoriesParams } from ':cds-storybook/stories/Button';

import { Button } from '../Button';
import { VStack } from '../../layout/VStack';
import { ThemeProvider } from '../../system/ThemeProvider';

export default {
  title: 'Core Components/Buttons/Button (Frontier)',
  component: Button,
};

export const { Defaults, States, Variants, Icons, BlockWithIcons } = createButtonStories({
  Button,
  ThemeProvider,
  VStack,
  frontier: true,
} as CreateButtonStoriesParams);

export const {
  Defaults: DarkModeDefaults,
  States: DarkModeStates,
  Variants: DarkModeVariants,
  Icons: DarkModeIcons,
  BlockWithIcons: DarkModeBlockWithIcons,
} = createButtonStories({
  Button,
  ThemeProvider,
  VStack,
  frontier: true,
  spectrum: 'dark',
} as CreateButtonStoriesParams);

export const {
  Defaults: DenseDefaults,
  States: DenseStates,
  Variants: DenseVariants,
  Icons: DenseIcons,
  BlockWithIcons: DenseBlockWithIcons,
} = createButtonStories({
  Button,
  ThemeProvider,
  VStack,
  frontier: true,
  scale: 'xSmall',
} as CreateButtonStoriesParams);
