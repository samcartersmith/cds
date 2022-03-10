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
  Button: React.ComponentType<ButtonBaseProps<OnPressFn>>;
  Card: React.ComponentType<CardBaseProps<OnPressFn>>;
  CardBody: React.ComponentType<CardBodyBaseProps<OnPressFn>>;
  CardHeader: React.ComponentType<CardHeaderProps>;
  CardFooter: React.ComponentType<CardFooterProps>;
  HStack: React.ComponentType<CardBoxProps>;
  IconButton: React.ComponentType<IconButtonBaseProps<OnPressFn>>;
  LikeButton: React.ComponentType<LikeButtonBaseProps<OnPressFn>>;
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
    illustration,
    image,
    mediaPlacement = platform === 'web' ? 'start' : 'above',
    title,
    description,
    headerAction,
    like,
    comment,
    share,
    cta,
  }: FeedCardBaseProps<OnPressFn>) {
    const footer = useMemo(() => {
      const hasFooterActions = Boolean(like ?? comment ?? share ?? cta);
      const hasFooter = hasFooterActions || Boolean(cta);
      if (hasFooter) {
        return (
          <CardFooter testID={testID} justifyContent="space-between">
            {hasFooterActions && (
              <HStack gap={0.5}>
                {like && <LikeButton testID={`${testID}-like`} {...like} />}
                {comment && (
                  <IconButton
                    transparent
                    name="annotation"
                    testID={`${testID}-comment`}
                    {...comment}
                  />
                )}
                {share && (
                  <IconButton transparent name="share" testID={`${testID}-share`} {...share} />
                )}
              </HStack>
            )}
            {cta && <Button compact transparent variant="secondary" flush="end" {...cta} />}
          </CardFooter>
        );
      }
      return null;
    }, [comment, cta, like, share, testID]);

    return (
      <Card testID={testID} gap={2}>
        <CardHeader
          testID={`${testID}-header`}
          avatar={avatar}
          metadata={metadata}
          author={author}
          action={headerAction && <IconButton transparent flush="end" {...headerAction} />}
        />
        <CardBody
          title={title}
          description={description}
          illustration={illustration}
          image={image}
          mediaPlacement={mediaPlacement}
          /** Only override default CardBody spacing if footer is present */
          spacingVertical={footer === null ? undefined : 0}
        />
        {footer}
      </Card>
    );
  });

  FeedCard.displayName = 'FeedCard';

  return FeedCard;
}
