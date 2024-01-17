import { createFeatureEntryCard } from '@cbhq/cds-common/cards/createFeatureEntryCard';

import { Card } from './Card';
import { CardBody } from './CardBody';

/** @deprecated will be removed in v7.0.0 use NudgeCard or UpsellCard instead */
export type FeatureEntryCardProps = React.ComponentProps<typeof FeatureEntryCard>;

/** @deprecated will be removed in v7.0.0 use NudgeCard or UpsellCard instead */
export const FeatureEntryCard = createFeatureEntryCard({
  Card,
  CardBody,
});
