import React, { memo } from 'react';

import { CardBaseProps, CardBodyBaseProps, FeatureEntryCardBaseProps } from '../types/alpha';

type CreateFeatureEntryCardParams<OnPressFn> = {
  Card: React.ComponentType<CardBaseProps<OnPressFn>>;
  CardBody: React.ComponentType<CardBodyBaseProps<OnPressFn>>;
};

export function createFeatureEntryCard<OnPressFn>({
  Card,
  CardBody,
}: CreateFeatureEntryCardParams<OnPressFn>) {
  const FeatureEntryCard = memo(function FeatureEntryCard({
    onPress,
    ...props
  }: FeatureEntryCardBaseProps<OnPressFn>) {
    return (
      <Card testID={props.testID} onPress={onPress} flexShrink={0}>
        <CardBody mediaPlacement="end" {...props} />
      </Card>
    );
  });

  FeatureEntryCard.displayName = 'FeatureEntryCard';
  return FeatureEntryCard;
}
