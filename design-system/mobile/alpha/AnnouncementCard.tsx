import { createAnnouncementCard } from '@cbhq/cds-common/cards/createAnnouncementCard';
import { Card } from './Card';
import { CardBody } from './CardBody';

export type AnnouncementCardProps = React.ComponentProps<typeof AnnouncementCard>;

export const AnnouncementCard = createAnnouncementCard({
  Card,
  CardBody,
});
