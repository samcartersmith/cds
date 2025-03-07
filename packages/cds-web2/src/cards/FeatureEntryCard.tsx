import React, { memo } from 'react';
import { FeatureEntryCardBaseProps } from '@cbhq/cds-common2/types';

import { type CardProps, Card } from './Card';
import { type CardBodyProps, CardBody } from './CardBody';

/** @deprecated will be removed in v7.0.0 use NudgeCard or UpsellCard instead */
export type FeatureEntryCardProps = FeatureEntryCardBaseProps & {
  onClick?: CardProps['onClick'];
  onActionPress?: CardBodyProps['onActionPress'];
};

/** @deprecated will be removed in v7.0.0 use NudgeCard or UpsellCard instead */
export const FeatureEntryCard = memo(function FeatureEntryCard({
  onClick,
  testID = 'feature-entry-card',
  accessibilityHint,
  accessibilityLabel,
  description,
  title,
  borderRadius = 0,
  elevation = 0,
  ...props
}: FeatureEntryCardProps) {
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
      onClick={onClick}
      testID={testID}
    >
      <CardBody description={description} testID={`${testID}-body`} title={title} {...props} />
    </Card>
  );
});
