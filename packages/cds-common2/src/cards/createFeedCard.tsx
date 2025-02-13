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
} from '../types';

type CreateFeedCardParams<OnPressFn> = {
  Button: React.ComponentType<React.PropsWithChildren<ButtonBaseProps & { onPress?: OnPressFn }>>;
  Card: React.ComponentType<CardBaseProps & { onPress?: OnPressFn }>;
  CardBody: React.ComponentType<CardBodyBaseProps & { onPress?: OnPressFn }>;
  CardHeader: React.ComponentType<CardHeaderProps>;
  CardFooter: React.ComponentType<CardFooterProps>;
  HStack: React.ComponentType<React.PropsWithChildren<CardBoxProps>>;
  IconButton: React.ComponentType<IconButtonBaseProps>;
  LikeButton: React.ComponentType<LikeButtonBaseProps & { onPress?: OnPressFn }>;
  platform: CdsPlatform;
};

/** @deprecated do not use creator pattern in v8 * */
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
  const FeedCard = memo(function FeedCard<OnPressFn>({
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
    borderRadius = 0,
    elevation = 0,
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
      <Card
        borderRadius={borderRadius}
        elevation={elevation}
        gap={2}
        testID={testID}
        {...cardProps}
      >
        <CardHeader
          action={
            headerAction && (
              <IconButton transparent accessibilityLabel="More" flush="end" {...headerAction} />
            )
          }
          avatar={avatar}
          description={author}
          metaData={metadata}
          testID={`${testID}-header`}
        />
        <CardBody
          description={description}
          image={image}
          mediaPlacement={mediaPlacement}
          paddingY={footer === null ? undefined : 0} // Only override default CardBody spacing if footer is present
          pictogram={pictogram}
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
