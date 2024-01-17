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

/** @deprecated will be removed in v6.0.0 */
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

/** @deprecated will be removed in v7.0.0 Please use NudgeCard or UpsellCard instead. */
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
            action={
              <IconButton
                transparent
                accessibilityLabel="More"
                name={headerAction}
                onPress={onHeaderActionPress}
              />
            }
            avatarUrl={headerAvatarUrl}
            description={headerDescription}
            metaData={headerMetaData}
          />
          <CardBody
            description={description}
            media={pictogram && <Pictogram dimension="64x64" name={pictogram} />}
            orientation="horizontal"
            title={title}
          >
            <Button
              compact
              transparent
              endIcon="forwardArrow"
              flush="start"
              onPress={onFooterActionPress}
              variant="primary"
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
