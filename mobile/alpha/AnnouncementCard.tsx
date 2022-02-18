import {
  createAnnouncementCard,
  AnnouncementCardBaseProps,
} from '@cbhq/cds-common/cards/createAnnouncementCard';
import { Card, CardProps } from '../cards/Card';
import { CardBody } from './CardBody';

export type AnnouncementCardProps = AnnouncementCardBaseProps<CardProps['onPress']>;

export const AnnouncementCard = createAnnouncementCard({
  Card,
  CardBody,
});
