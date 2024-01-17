import { createAnnouncementCardDeprecated } from '@cbhq/cds-common/cards/createAnnouncementCardDeprecated';

import { Button } from '../buttons/Button';
import { IconButton } from '../buttons/IconButton';
import { Pictogram } from '../illustrations/Pictogram';

import { Card } from './Card';
import { CardBody } from './CardBody';
import { CardHeader } from './CardHeader';

/** @deprecated will be removed in v7.0.0 use NudgeCard or UpsellCard instead */
export const AnnouncementCard = createAnnouncementCardDeprecated({
  Button,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Pictogram,
});
