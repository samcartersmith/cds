import React, { memo } from 'react';

import {
  ButtonBaseProps,
  CardBaseProps,
  CardBodyBaseProps,
  CardHeaderBaseProps,
  IconButtonBaseProps,
  IconName,
  IllustrationPictogramNames,
  PictogramProps,
} from '../types';

type CreateAnnouncementCardParams<T> = {
  Button: React.ComponentType<React.PropsWithChildren<ButtonBaseProps & { onPress?: T }>>;
  CardHeader: React.ComponentType<React.PropsWithChildren<CardHeaderBaseProps>>;
  Card: React.ComponentType<React.PropsWithChildren<CardBaseProps>>;
  CardBody: React.ComponentType<React.PropsWithChildren<CardBodyBaseProps>>;
  IconButton: React.ComponentType<React.PropsWithChildren<IconButtonBaseProps & { onPress?: T }>>;
  Pictogram: React.ComponentType<React.PropsWithChildren<PictogramProps>>;
};

/** @deprecated */
export type AnnouncementCardProps<T> = {
  title: CardBodyBaseProps['title'];
  description: CardBodyBaseProps['description'];
  pictogram?: IllustrationPictogramNames;
  headerDescription?: CardHeaderBaseProps['description'];
  headerMetaData?: CardHeaderBaseProps['metaData'];
  headerAvatarUrl: CardHeaderBaseProps['avatarUrl'];
  headerAction?: IconName;
  footerAction: string;
  onHeaderActionPress: T;
  onFooterActionPress: T;
};

/** @deprecated Please use createAnnouncementCard instead. This version uses pre-frontier styling */
export function createAnnouncementCardDeprecated<T>({
  Button,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Pictogram,
}: CreateAnnouncementCardParams<T>) {
  const AnnouncementCard = memo(
    ({
      title,
      description,
      pictogram,
      headerAvatarUrl,
      headerDescription,
      headerMetaData,
      headerAction = 'more',
      footerAction,
      onHeaderActionPress,
      onFooterActionPress,
    }: AnnouncementCardProps<T>) => {
      return (
        <Card>
          <CardHeader
            avatarUrl={headerAvatarUrl}
            description={headerDescription}
            metaData={headerMetaData}
            action={
              <IconButton
                name={headerAction}
                onPress={onHeaderActionPress}
                accessibilityLabel="More"
                transparent
              />
            }
          />
          <CardBody
            title={title}
            description={description}
            orientation="horizontal"
            media={pictogram && <Pictogram name={pictogram} dimension="64x64" />}
          >
            <Button
              compact
              flush="start"
              transparent
              variant="primary"
              onPress={onFooterActionPress}
              endIcon="forwardArrow"
            >
              {footerAction}
            </Button>
          </CardBody>
        </Card>
      );
    },
  );
  AnnouncementCard.displayName = 'AnnouncementCard';
  return AnnouncementCard;
}
