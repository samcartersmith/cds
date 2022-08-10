import React, { memo } from 'react';

import { useAccessibilityProps } from '../accessibility/useAccessibilityProps';
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
    testID = 'feature-entry-card',
    ...props
  }: FeatureEntryCardBaseProps<OnPressFn>) {
    const accessibilityProps = useAccessibilityProps(props, {
      accessibilityLabel: props.title,
      accessibilityHint: props.description,
    });

    return (
      <Card {...accessibilityProps} testID={testID} onPress={onPress} flexShrink={0}>
        <CardBody testID={`${testID}-body`} mediaPlacement="end" {...props} />
      </Card>
    );
  });

  FeatureEntryCard.displayName = 'FeatureEntryCard';
  return FeatureEntryCard;
}
