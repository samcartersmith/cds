import React, { memo } from 'react';
import type { FeatureEntryCardBaseProps } from '@cbhq/cds-common2/types';

import type { PressableProps } from '../system/Pressable';

import { Card } from './Card';
import { CardBody, type CardBodyProps } from './CardBody';

/** @deprecated This component will be removed in a future version. Use NudgeCard or UpsellCard instead. */
export type FeatureEntryCardProps = FeatureEntryCardBaseProps &
  Pick<CardBodyProps, 'onActionPress'> & {
    onPress?: PressableProps['onPress'];
  };

/** @deprecated This component will be removed in a future version. Use NudgeCard or UpsellCard instead. */
export const FeatureEntryCard = memo(function FeatureEntryCard({
  onPress,
  testID = 'feature-entry-card',
  accessibilityHint,
  accessibilityLabel,
  description,
  title,
  borderRadius = 0,
  elevation = 0,
  onActionPress,
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
      onPress={onPress}
      testID={testID}
    >
      <CardBody
        description={description}
        onActionPress={onActionPress}
        testID={`${testID}-body`}
        title={title}
        {...props}
      />
    </Card>
  );
});
