import React, { memo, useMemo } from 'react';

import type { AnnouncementCardBaseProps, CardBaseProps, CardBodyBaseProps } from '../types/alpha';

type CreateAnnouncementCardParams<T> = {
  Card: React.ComponentType<React.PropsWithChildren<CardBaseProps<T>>>;
  CardBody: React.ComponentType<React.PropsWithChildren<CardBodyBaseProps<T>>>;
};

export function createAnnouncementCard<OnPressFn>({
  Card,
  CardBody,
}: CreateAnnouncementCardParams<OnPressFn>) {
  const AnnouncementCard = memo(function AnnouncementCard({
    onPress,
    width,
    ...props
  }: AnnouncementCardBaseProps<OnPressFn>) {
    const accessibilityProps = useMemo(
      () => ({
        accessibilityLabel: props.accessibilityLabel ?? props.title,
        accessibilityHint: props.accessibilityHint ?? props.description,
      }),
      [props.accessibilityHint, props.accessibilityLabel, props.title, props.description],
    );

    return (
      <Card
        {...accessibilityProps}
        flexShrink={0}
        onPress={onPress}
        testID={props.testID}
        width={width}
      >
        <CardBody alignItems="flex-start" mediaPlacement="end" {...props} />
      </Card>
    );
  });

  AnnouncementCard.displayName = 'AnnouncementCard';
  return AnnouncementCard;
}
