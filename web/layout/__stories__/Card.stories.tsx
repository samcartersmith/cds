import { createStories, CreateCardProps } from ':cds-storybook/stories/Card';

import { Button } from '../../buttons/Button';
import { ListCell, CellMedia } from '../../cells';
import { ThemeProvider } from '../../system/ThemeProvider';
import { Box } from '../Box';
import { Card } from '../Card';
import { VStack } from '../VStack';
import { LoremIpsum } from './LoremIpsum';

export default {
  title: 'Core Components/Card',
  component: Card,
};

const DarkThemeProvider: React.FC = ({ children }) => (
  <ThemeProvider spectrum="dark">{children}</ThemeProvider>
);

export const {
  PressableCards,
  PressableColoredCards,
  NonClickableCards,
  NonClickableColoredCards,
  PinnedTopCard,
  PinnedRightCard,
  PinnedBottomCard,
  PinnedLeftCard,
} = createStories({
  Box,
  Button,
  Card,
  CellMedia,
  ListCell,
  LoremIpsum,
  VStack,
  ThemeProvider,
} as CreateCardProps);

export const {
  PressableCards: DarkModePressableCards,
  PressableColoredCards: DarkModePressableColoredCards,
  NonClickableCards: DarkModeNonClickableCards,
  NonClickableColoredCards: DarkModeNonClickableColoredCards,
  PinnedTopCard: DarkModePinnedTopCard,
  PinnedRightCard: DarkModePinnedRightCard,
  PinnedBottomCard: DarkModePinnedBottomCard,
  PinnedLeftCard: DarkModePinnedLeftCard,
} = createStories({
  Box,
  Button,
  Card,
  CellMedia,
  ListCell,
  LoremIpsum,
  VStack,
  ThemeProvider: DarkThemeProvider,
} as CreateCardProps);
