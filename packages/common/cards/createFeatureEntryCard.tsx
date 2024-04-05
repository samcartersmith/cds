import React, { memo } from 'react';

import { CardBaseProps, CardBodyBaseProps, FeatureEntryCardBaseProps } from '../types';

type CreateFeatureEntryCardParams<OnPressFn> = {
  Card: React.ComponentType<CardBaseProps & { onPress?: OnPressFn }>;
  CardBody: React.ComponentType<
    CardBodyBaseProps & { onPress?: OnPressFn; onActionPress?: OnPressFn }
  >;
};

/** @deprecated will be removed in v7.0.0 use NudgeCard or UpsellCard instead */
export function createFeatureEntryCard<OnPressFn>({
  Card,
  CardBody,
}: CreateFeatureEntryCardParams<OnPressFn>) {
  const FeatureEntryCard = memo(function FeatureEntryCard({
    onPress,
    testID = 'feature-entry-card',
    accessibilityHint,
    accessibilityLabel,
    description,
    title,
    borderRadius = 'roundedNone',
    elevation = 0,
    ...props
  }: FeatureEntryCardBaseProps & { onPress?: OnPressFn; onActionPress?: OnPressFn }) {
    return (
      <Card
        accessibilityHint={
          accessibilityHint ?? typeof description === 'string' ? (description as string) : undefined
        }
        accessibilityLabel={
          accessibilityLabel ?? typeof title === 'string' ? (title as string) : undefined
        }
        borderRadius={borderRadius}
        elevation={elevation}
        flexShrink={0}
        onPress={onPress}
        testID={testID}
      >
        <CardBody description={description} testID={`${testID}-body`} title={title} {...props} />
      </Card>
    );
  });

  FeatureEntryCard.displayName = 'FeatureEntryCard';
  return FeatureEntryCard;
}
