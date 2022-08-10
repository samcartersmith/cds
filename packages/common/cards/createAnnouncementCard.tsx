import React, { memo } from 'react';

import { useAccessibilityProps } from '../accessibility/useAccessibilityProps';
import type { AnnouncementCardBaseProps, CardBaseProps, CardBodyBaseProps } from '../types/alpha';

type CreateAnnouncementCardParams<T> = {
  Card: React.ComponentType<CardBaseProps<T>>;
  CardBody: React.ComponentType<CardBodyBaseProps<T>>;
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
    const accessibilityProps = useAccessibilityProps(props, {
      accessibilityLabel: props.title,
      accessibilityHint: props.description,
    });

    return (
      <Card
        {...accessibilityProps}
        onPress={onPress}
        width={width}
        testID={props.testID}
        flexShrink={0}
      >
        <CardBody mediaPlacement="end" {...props} />
      </Card>
    );
  });

  AnnouncementCard.displayName = 'AnnouncementCard';
  return AnnouncementCard;
}
