import React, { memo, useMemo } from 'react';

import type {
  ButtonBaseProps,
  CardBaseProps,
  CardBodyBaseProps,
  CardBoxProps,
  CardFooterProps,
  CardHeaderProps,
  CdsPlatform,
  FeedCardBaseProps,
  IconButtonBaseProps,
  LikeButtonBaseProps,
} from '../types/alpha';

type CreateFeedCardParams<OnPressFn> = {
  Button: React.ComponentType<React.PropsWithChildren<ButtonBaseProps<OnPressFn>>>;
  Card: React.ComponentType<React.PropsWithChildren<CardBaseProps<OnPressFn>>>;
  CardBody: React.ComponentType<React.PropsWithChildren<CardBodyBaseProps<OnPressFn>>>;
  CardHeader: React.ComponentType<React.PropsWithChildren<CardHeaderProps>>;
  CardFooter: React.ComponentType<React.PropsWithChildren<CardFooterProps>>;
  HStack: React.ComponentType<React.PropsWithChildren<CardBoxProps>>;
  IconButton: React.ComponentType<React.PropsWithChildren<IconButtonBaseProps<OnPressFn>>>;
  LikeButton: React.ComponentType<React.PropsWithChildren<LikeButtonBaseProps<OnPressFn>>>;
  platform: CdsPlatform;
};

export function createFeedCard<OnPressFn>({
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  HStack,
  IconButton,
  LikeButton,
  platform,
}: CreateFeedCardParams<OnPressFn>) {
  const FeedCard = memo(function FeedCard({
    testID = 'feed-card',
    avatar,
    author,
    metadata,
    pictogram,
    spotSquare,
    image,
    mediaPlacement = platform === 'web' ? 'start' : 'above',
    title,
    description,
    headerAction,
    like,
    comment,
    share,
    cta,
    ...cardProps
  }: FeedCardBaseProps<OnPressFn>) {
    const footer = useMemo(() => {
      const hasFooterActions = Boolean(like ?? comment ?? share ?? cta);
      const hasFooter = hasFooterActions || Boolean(cta);
      if (hasFooter) {
        return (
          <CardFooter justifyContent="space-between" testID={testID}>
            {hasFooterActions && (
              <HStack gap={0.5}>
                {like && <LikeButton testID={`${testID}-like`} {...like} />}
                {comment && (
                  <IconButton
                    transparent
                    accessibilityLabel="Comment"
                    name="annotation"
                    testID={`${testID}-comment`}
                    {...comment}
                  />
                )}
                {share && (
                  <IconButton
                    transparent
                    accessibilityLabel="Share"
                    name="share"
                    testID={`${testID}-share`}
                    {...share}
                  />
                )}
              </HStack>
            )}
            {cta && <Button compact transparent flush="end" variant="secondary" {...cta} />}
          </CardFooter>
        );
      }
      return null;
    }, [comment, cta, like, share, testID]);

    return (
      <Card gap={2} testID={testID} {...cardProps}>
        <CardHeader
          action={
            headerAction && (
              <IconButton transparent accessibilityLabel="More" flush="end" {...headerAction} />
            )
          }
          author={author}
          avatar={avatar}
          metadata={metadata}
          testID={`${testID}-header`}
        />
        <CardBody
          description={description}
          image={image}
          mediaPlacement={mediaPlacement}
          pictogram={pictogram}
          spacingVertical={footer === null ? undefined : 0} // Only override default CardBody spacing if footer is present
          spotSquare={spotSquare}
          testID={`${testID}-body`}
          title={title}
        />
        {footer}
      </Card>
    );
  });

  FeedCard.displayName = 'FeedCard';

  return FeedCard;
}
