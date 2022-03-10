import { cardBuilder, CreateCardProps } from '@cbhq/cds-common/internal/cardBuilder';

import { Button } from '../../buttons/Button';
import { IconButton } from '../../buttons/IconButton';
import { ListCell, CellMedia } from '../../cells';
import { ThemeProvider } from '../../system/ThemeProvider';
import { Box } from '../Box';
import { Card, FeedCard, CardBody } from '../../cards';
import { SpotSquare } from '../../illustrations';
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
  FeedCardExample,
  SpotSquareExample,
} = cardBuilder({
  Box,
  Button,
  Card,
  CardBody,
  SpotSquare,
  FeedCard,
  IconButton,
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
} = cardBuilder({
  Box,
  Button,
  Card,
  CardBody,
  SpotSquare,
  FeedCard,
  IconButton,
  CellMedia,
  ListCell,
  LoremIpsum,
  VStack,
  ThemeProvider: DarkThemeProvider,
} as CreateCardProps);
