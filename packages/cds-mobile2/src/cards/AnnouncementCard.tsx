import React, { memo, useMemo } from 'react';
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
  const accessibilityProps = useMemo(
    () => ({
      accessibilityLabel:
        accessibilityLabel ?? typeof title === 'string' ? (title as string) : undefined,
      accessibilityHint:
        accessibilityHint ?? typeof description === 'string' ? (description as string) : undefined,
    }),
    [accessibilityHint, accessibilityLabel, title, description],
  );

  return (
    <Card
      {...accessibilityProps}
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
