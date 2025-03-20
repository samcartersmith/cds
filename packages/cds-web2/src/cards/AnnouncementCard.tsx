import React, { memo, useMemo } from 'react';
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
      onClick={onClick}
      testID={testID}
      width={width}
    >
      <CardBody alignItems="flex-start" description={description} title={title} {...props} />
    </Card>
  );
});
