import React, { memo, useMemo } from 'react';
import { PressableProps } from 'react-native';
import type { FeedCardBaseProps } from '@cbhq/cds-common2/types';

import { Button, IconButton } from '../buttons';
import { HStack } from '../layout/HStack';

import { Card } from './Card';
import { CardBody } from './CardBody';
import { CardFooter } from './CardFooter';
import { CardHeader } from './CardHeader';
import { LikeButton } from './LikeButton';

export type FeedCardProps = FeedCardBaseProps<PressableProps['onPress']>;

export const FeedCard = memo(function FeedCard({
  testID = 'feed-card',
  avatar,
  author,
  metadata,
  pictogram,
  spotSquare,
  image,
  mediaPlacement = 'above',
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
}: FeedCardProps) {
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
    <Card borderRadius={borderRadius} elevation={elevation} gap={2} testID={testID} {...cardProps}>
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
