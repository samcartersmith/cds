import { createFeatureEntryCardDeprecated } from '@cbhq/cds-common/cards/createFeatureEntryCardDeprecated';

import { Button } from '../buttons/Button';
import { SpotSquare } from '../illustrations/SpotSquare';

import { Card } from './Card';
import { CardBody } from './CardBody';

export const FeatureEntryCard = createFeatureEntryCardDeprecated({
  Button,
  Card,
  CardBody,
  SpotSquare,
});
