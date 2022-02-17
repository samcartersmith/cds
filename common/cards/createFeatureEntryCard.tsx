import React, { memo } from 'react';

import { CardBaseProps } from '../types';
import { CardBodyBaseProps } from './createCardBody';

type CreateFeatureEntryCardParams<OnPressFn> = {
  Card: React.ComponentType<CardBaseProps & { onPress?: OnPressFn }>;
  CardBody: React.ComponentType<CardBodyBaseProps<OnPressFn>>;
};

export type FeatureEntryCardBaseProps<T> = Omit<CardBodyBaseProps<T>, 'orientation' | 'variant'> & {
  /** The callback function to trigger when the entire Card is pressed. This will not be used if Card has an onActionPress. */
  onPress?: T;
};

export function createFeatureEntryCard<OnPressFn>({
  Card,
  CardBody,
}: CreateFeatureEntryCardParams<OnPressFn>) {
  const FeatureEntryCard = memo(function FeatureEntryCard({
    onPress,
    width,
    ...props
  }: FeatureEntryCardBaseProps<OnPressFn>) {
    return (
      <Card testID={props.testID} onPress={onPress} flexShrink={0}>
        <CardBody variant="feature" {...props} />
      </Card>
    );
  });

  FeatureEntryCard.displayName = 'FeatureEntryCard';
  return FeatureEntryCard;
}
