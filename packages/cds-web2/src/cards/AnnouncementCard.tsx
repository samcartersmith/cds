import React, { memo } from 'react';
import type { AnnouncementCardBaseProps } from '@cbhq/cds-common2/types';

import { Card, type CardProps } from './Card';
import { CardBody, type CardBodyProps } from './CardBody';

export type AnnouncementCardProps = AnnouncementCardBaseProps & {
  onActionPress?: CardBodyProps['onActionPress'];
  onClick?: CardProps['onClick'];
};

/** @deprecated will be removed in v7.0.0 use NudgeCard or UpsellCard instead */
export const AnnouncementCard = memo(function AnnouncementCard({
  width,
  title,
  description,
  testID,
  accessibilityLabel,
  accessibilityHint,
  elevation = 0,
  borderRadius = 0,
  onClick,
  // TODO this is only spread on the CardBody - are we sure that there are no CardBaseProps trapped in here that never make it to that element?
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
      onClick={onClick}
      testID={testID}
      width={width}
    >
      <CardBody alignItems="flex-start" description={description} title={title} {...props} />
    </Card>
  );
});
