import {
  createFeatureEntryCard,
  FeatureEntryCardBaseProps,
} from '@cbhq/cds-common/cards/createFeatureEntryCard';

import { ButtonProps } from '../buttons/Button';
import { Card } from '../cards/Card';
import { CardBody } from './CardBody';

type OnPress = ButtonProps['onPress'];
export type FeatureEntryCardProps = FeatureEntryCardBaseProps<OnPress>;

export const FeatureEntryCard = createFeatureEntryCard({
  Card,
  CardBody,
});
