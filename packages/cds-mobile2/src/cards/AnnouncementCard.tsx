import React, { memo } from 'react';
import type { AnnouncementCardBaseProps } from '@cbhq/cds-common2/types';

import type { PressableProps } from '../system/Pressable';

import { Card } from './Card';
import { CardBody, type CardBodyProps } from './CardBody';

/** @deprecated will be removed in v7.0.0 use NudgeCard or UpsellCard instead */
export type AnnouncementCardProps = AnnouncementCardBaseProps &
  Pick<CardBodyProps, 'onActionPress'> & {
    onPress?: PressableProps['onPress'];
  };

/** @deprecated will be removed in v7.0.0 use NudgeCard or UpsellCard instead */
export const AnnouncementCard = memo(function AnnouncementCard({
  onPress,
  width,
  title,
  description,
  testID,
  accessibilityLabel,
  accessibilityHint,
  elevation = 0,
  borderRadius = 0,
  onActionPress,
  ...props
}: AnnouncementCardProps) {
  const accessibilityLabelValue =
    typeof title === 'string' && accessibilityLabel === undefined ? title : accessibilityLabel;

  const accessibilityHintValue =
    typeof description === 'string' && accessibilityHint === undefined
      ? description
      : accessibilityHint;

  return (
    <Card
      accessibilityHint={accessibilityHintValue}
      accessibilityLabel={accessibilityLabelValue}
      borderRadius={borderRadius}
      elevation={elevation}
      flexShrink={0}
      onPress={onPress}
      testID={testID}
      width={width}
    >
      <CardBody
        alignItems="flex-start"
        description={description}
        onActionPress={onActionPress}
        title={title}
        {...props}
      />
    </Card>
  );
});
