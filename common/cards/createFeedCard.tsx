import React, { memo } from 'react';

import type { CardBaseProps, FeedCardBaseProps } from '../types';
import type { CardHeaderProps } from './createCardHeader';
import type { CardFooterProps } from './createCardFooter';
import type { CardMediaProps } from './createCardMedia';
import type { CardBodyBaseProps } from './createCardBody';

export type FeedCardProps = FeedCardBaseProps;

type CreateFeedCardParams<CardBodyProps> = {
  Card: React.ComponentType<CardBaseProps>;
  CardBody: React.ComponentType<CardBodyBaseProps<CardBodyProps>>;
  CardHeader: React.ComponentType<CardHeaderProps>;
  CardFooter: React.ComponentType<CardFooterProps>;
  CardMedia: React.ComponentType<CardMediaProps>;
};

export function createFeedCard<CardBodyProps>({
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardMedia,
}: CreateFeedCardParams<CardBodyProps>) {
  const FeedCard = memo(function FeedCard({
    testID,
    avatarUrl,
    headerMetaData,
    headerDescription,
    headerActionNode,
    bodyTitle,
    bodyDescription,
    bodyMediaUrl,
    footerActions,
  }: FeedCardProps) {
    return (
      <Card testID={testID} gap={2}>
        <CardHeader
          avatarUrl={avatarUrl}
          metaData={headerMetaData}
          description={headerDescription}
          action={headerActionNode}
        />
        <CardBody
          title={bodyTitle}
          description={bodyDescription}
          media={<CardMedia type="image" variant="feed" src={bodyMediaUrl} />}
          spacingVertical={0}
        />
        <CardFooter>{footerActions}</CardFooter>
      </Card>
    );
  });

  FeedCard.displayName = 'FeedCard';
  return FeedCard;
}
