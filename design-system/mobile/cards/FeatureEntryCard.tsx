import { createFeatureEntryCardDeprecated } from '@cbhq/cds-common/cards/createFeatureEntryCardDeprecated';
import { Card } from './Card';
import { CardBody } from './CardBody';
import { Button } from '../buttons/Button';
import { SpotSquare } from '../illustrations/SpotSquare';

export const FeatureEntryCard = createFeatureEntryCardDeprecated({
  Button,
  Card,
  CardBody,
  SpotSquare,
});
