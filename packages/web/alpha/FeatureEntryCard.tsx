import { createFeatureEntryCard } from '@cbhq/cds-common/cards/createFeatureEntryCard';

import { Card } from './Card';
import { CardBody } from './CardBody';

export type FeatureEntryCardProps = React.ComponentProps<typeof FeatureEntryCard>;

export const FeatureEntryCard = createFeatureEntryCard({
  Card,
  CardBody,
});
