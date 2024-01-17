import React, { memo, useMemo } from 'react';

import { CardBaseProps, CardBodyBaseProps, FeatureEntryCardBaseProps } from '../types/alpha';

type CreateFeatureEntryCardParams<OnPressFn> = {
  Card: React.ComponentType<React.PropsWithChildren<CardBaseProps<OnPressFn>>>;
  CardBody: React.ComponentType<React.PropsWithChildren<CardBodyBaseProps<OnPressFn>>>;
};

/** @deprecated will be removed in v7.0.0 use NudgeCard or UpsellCard instead */
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
      <Card {...accessibilityProps} flexShrink={0} onPress={onPress} testID={testID}>
        <CardBody mediaPlacement="end" testID={`${testID}-body`} {...props} />
      </Card>
    );
  });

  FeatureEntryCard.displayName = 'FeatureEntryCard';
  return FeatureEntryCard;
}
