import { FeedCardProps, createFeedCard } from '@cbhq/cds-common/cards/createFeedCard';

import { Card } from '../cards/Card';
import { CardMedia } from './CardMedia';
import { CardHeader } from './CardHeader';
import { CardBody } from './CardBody';
import { CardFooter } from './CardFooter';

export type { FeedCardProps };

export const FeedCard = createFeedCard({
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardMedia,
});
