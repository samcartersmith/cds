import React, { memo, useMemo } from 'react';

import { CardBaseProps, CardBodyBaseProps, FeatureEntryCardBaseProps } from '../types/alpha';

type CreateFeatureEntryCardParams<OnPressFn> = {
  Card: React.ComponentType<React.PropsWithChildren<CardBaseProps<OnPressFn>>>;
  CardBody: React.ComponentType<React.PropsWithChildren<CardBodyBaseProps<OnPressFn>>>;
};

export function createFeatureEntryCard<OnPressFn>({
  Card,
  CardBody,
}: CreateFeatureEntryCardParams<OnPressFn>) {
  const FeatureEntryCard = memo(function FeatureEntryCard({
    onPress,
    testID = 'feature-entry-card',
    ...props
  }: FeatureEntryCardBaseProps<OnPressFn>) {
    const accessibilityProps = useMemo(
      () => ({
        accessibilityLabel: props.accessibilityLabel ?? props.title,
        accessibilityHint: props.accessibilityHint ?? props.description,
      }),
      [props.accessibilityHint, props.accessibilityLabel, props.title, props.description],
    );

    return (
      <Card {...accessibilityProps} testID={testID} onPress={onPress} flexShrink={0}>
        <CardBody testID={`${testID}-body`} mediaPlacement="end" {...props} />
      </Card>
    );
  });

  FeatureEntryCard.displayName = 'FeatureEntryCard';
  return FeatureEntryCard;
}
