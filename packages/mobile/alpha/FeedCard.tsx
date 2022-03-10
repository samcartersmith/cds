import { createFeedCard } from '@cbhq/cds-common/cards/createFeedCard';

import { HStack } from '../layout/HStack';

import { Button } from './Button';
import { Card } from './Card';
import { CardBody } from './CardBody';
import { CardFooter } from './CardFooter';
import { CardHeader } from './CardHeader';
import { IconButton } from './IconButton';
import { LikeButton } from './LikeButton';

export type FeedCardProps = React.ComponentProps<typeof FeedCard>;

export const FeedCard = createFeedCard({
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
