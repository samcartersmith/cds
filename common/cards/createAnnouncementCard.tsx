import React, { memo } from 'react';

import type { CardBaseProps } from '../types';
import { announcementCardMinHeight } from '../tokens/card';
import type { CardBodyBaseProps } from './createCardBody';

type CreateAnnouncementCardParams<OnPressFn> = {
  Card: React.ComponentType<CardBaseProps & { onPress?: OnPressFn }>;
  CardBody: React.ComponentType<CardBodyBaseProps<OnPressFn>>;
};

export type AnnouncementCardBaseProps<T> = Omit<CardBodyBaseProps<T>, 'orientation' | 'variant'> & {
  onPress?: T;
};

export function createAnnouncementCard<OnPressFn>({
  Card,
  CardBody,
}: CreateAnnouncementCardParams<OnPressFn>) {
  const AnnouncementCard = memo(function AnnouncementCard({
    onPress,
    width,
    minHeight = announcementCardMinHeight,
    ...props
  }: AnnouncementCardBaseProps<OnPressFn>) {
    return (
      <Card onPress={onPress} width={width} testID={props.testID} flexShrink={0}>
        <CardBody variant="announcement" minHeight={minHeight} {...props} />
      </Card>
    );
  });

  AnnouncementCard.displayName = 'AnnouncementCard';
  return AnnouncementCard;
}
