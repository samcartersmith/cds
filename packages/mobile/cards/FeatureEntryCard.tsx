import { createFeatureEntryCardDeprecated } from '@cbhq/cds-common/cards/createFeatureEntryCardDeprecated';

import { Button } from '../buttons/Button';
import { SpotSquare } from '../illustrations/SpotSquare';

import { Card } from './Card';
import { CardBody } from './CardBody';

/** @deprecated will be removed in v7.0.0 use NudgeCard or UpsellCard instead */
export const FeatureEntryCard = createFeatureEntryCardDeprecated({
  Button,
  Card,
  CardBody,
  SpotSquare,
});
