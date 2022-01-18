import { createAnnouncementCard } from '@cbhq/cds-common/cards/createAnnouncementCard';
import { Card } from './Card';
import { CardBody } from './CardBody';
import { CardHeader } from './CardHeader';
import { Button } from '../buttons/Button';
import { IconButton } from '../buttons/IconButton';
import { Pictogram } from '../illustrations/Pictogram';

export const AnnouncementCard = createAnnouncementCard({
  Button,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Pictogram,
});
