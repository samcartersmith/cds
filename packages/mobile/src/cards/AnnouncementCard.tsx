import { AnnouncementCardBaseProps } from '@cbhq/cds-common';
import { createAnnouncementCard } from '@cbhq/cds-common/cards/createAnnouncementCard';

import { OnPress } from '../system';

import { Card } from './Card';
import { CardBody, CardBodyProps } from './CardBody';

/** @deprecated will be removed in v7.0.0 use NudgeCard or UpsellCard instead */
export type AnnouncementCardProps = AnnouncementCardBaseProps &
  Pick<CardBodyProps, 'onActionPress'>;

/** @deprecated will be removed in v7.0.0 use NudgeCard or UpsellCard instead */
export const AnnouncementCard = createAnnouncementCard<OnPress>({
  Card,
  CardBody,
});
