import { createAnnouncementCard } from '@cbhq/cds-common/cards/createAnnouncementCard';

import { OnPress } from '../system';

import { Card } from './Card';
import { CardBody } from './CardBody';

/** @deprecated will be removed in v7.0.0 use NudgeCard or UpsellCard instead */
export type AnnouncementCardProps = React.ComponentProps<typeof AnnouncementCard>;

/** @deprecated will be removed in v7.0.0 use NudgeCard or UpsellCard instead */
export const AnnouncementCard = createAnnouncementCard<OnPress>({
  Card,
  CardBody,
});
