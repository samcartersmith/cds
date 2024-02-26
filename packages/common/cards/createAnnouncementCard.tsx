import React, { memo, useMemo } from 'react';

import type { AnnouncementCardBaseProps, CardBaseProps, CardBodyBaseProps } from '../types';

type CreateAnnouncementCardParams<OnPressFn> = {
  Card: React.ComponentType<CardBaseProps & { onPress?: OnPressFn }>;
  CardBody: React.ComponentType<CardBodyBaseProps>;
};

/** @deprecated will be removed in v7.0.0 use NudgeCard or UpsellCard instead */
export function createAnnouncementCard<OnPressFn>({
  Card,
  CardBody,
}: CreateAnnouncementCardParams<OnPressFn>) {
  const AnnouncementCard = memo(function AnnouncementCard({
    onPress,
    width,
    title,
    description,
    testID,
    accessibilityLabel,
    accessibilityHint,
    ...props
  }: AnnouncementCardBaseProps & {
    onPress?: OnPressFn;
  }) {
    const accessibilityProps = useMemo(
      () => ({
        accessibilityLabel:
          accessibilityLabel ?? typeof title === 'string' ? (title as string) : undefined,
        accessibilityHint:
          accessibilityHint ?? typeof description === 'string'
            ? (description as string)
            : undefined,
      }),
      [accessibilityHint, accessibilityLabel, title, description],
    );

    return (
      <Card {...accessibilityProps} flexShrink={0} onPress={onPress} testID={testID} width={width}>
        <CardBody alignItems="flex-start" description={description} title={title} {...props} />
      </Card>
    );
  });

  AnnouncementCard.displayName = 'AnnouncementCard';
  return AnnouncementCard;
}
