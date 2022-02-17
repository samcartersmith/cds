import { createAnnouncementCardDeprecated } from '@cbhq/cds-common/cards/createAnnouncementCardDeprecated';
import { Card } from './Card';
import { CardBody } from './CardBody';
import { CardHeader } from './CardHeader';
import { Button } from '../buttons/Button';
import { IconButton } from '../buttons/IconButton';
import { Pictogram } from '../illustrations/Pictogram';

export const AnnouncementCard = createAnnouncementCardDeprecated({
  Button,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Pictogram,
});
