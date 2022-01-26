import { createAnnouncementCard } from '@cbhq/cds-common/cards/createAnnouncementCard';

import { Button } from '../buttons/Button';
import { IconButton } from '../buttons/IconButton';
import { Pictogram } from '../illustrations/Pictogram';

import { Card } from './Card';
import { CardBody } from './CardBody';
import { CardFooter } from './CardFooter';
import { CardHeader } from './CardHeader';

export const AnnouncementCard = createAnnouncementCard({
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  IconButton,
  Pictogram,
});
