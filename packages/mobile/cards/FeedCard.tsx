import { PressableProps } from 'react-native';
import { createFeedCard } from '@cbhq/cds-common/cards/createFeedCard';

import { Button, IconButton } from '../buttons';
import { HStack } from '../layout/HStack';

import { Card } from './Card';
import { CardBody } from './CardBody';
import { CardFooter } from './CardFooter';
import { CardHeader } from './CardHeader';
import { LikeButton } from './LikeButton';

export type FeedCardProps = React.ComponentProps<typeof FeedCard>;

export const FeedCard = createFeedCard<PressableProps['onPress']>({
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  HStack,
  IconButton,
  LikeButton,
  platform: 'mobile',
});
