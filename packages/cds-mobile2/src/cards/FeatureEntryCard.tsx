import { FeatureEntryCardBaseProps } from '@cbhq/cds-common2';
import { createFeatureEntryCard } from '@cbhq/cds-common2/cards/createFeatureEntryCard';

import { Card } from './Card';
import { CardBody, CardBodyProps } from './CardBody';

/** @deprecated will be removed in v7.0.0 use NudgeCard or UpsellCard instead */
export type FeatureEntryCardProps = FeatureEntryCardBaseProps &
  Pick<CardBodyProps, 'onActionPress'>;

/** @deprecated will be removed in v7.0.0 use NudgeCard or UpsellCard instead */
export const FeatureEntryCard = createFeatureEntryCard({
  Card,
  CardBody,
});
