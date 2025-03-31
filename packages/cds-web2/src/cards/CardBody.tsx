import React, { memo, useMemo } from 'react';
import { getCardBodySpacingProps } from '@cbhq/cds-common2/cards/getCardBodySpacingProps';
import { defaultMediaSize } from '@cbhq/cds-common2/tokens/card';
import type { CardBodyBaseProps } from '@cbhq/cds-common2/types';

import { Button } from '../buttons/Button';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Text } from '../typography/Text';

import { CardMedia } from './CardMedia';

export type CardBodyProps = CardBodyBaseProps & {
  onActionPress?: React.MouseEventHandler;
};

/**
 * Provides an opinionated layout for the typical content of a Card: a title, description, media, and action
 */
export const CardBody = memo(function CardBody({
  testID = 'card-body',
  title,
  description,
  mediaPlacement = 'end',
  onActionPress,
  actionLabel,
  action: actionProp,
  pictogram,
  spotSquare,
  image,
  media: mediaProp,
  padding,
  paddingX,
  paddingY,
  paddingTop,
  paddingEnd,
  paddingBottom,
  paddingStart,
  numberOfLines = 3,
  accessibilityLabel,
  children,
  compact,
  ...props
}: CardBodyProps) {
  const spacingProps = getCardBodySpacingProps({
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingStart,
    paddingBottom,
    paddingEnd,
    compact,
  });

  let mediaContent: React.ReactNode = mediaProp;

  if (spotSquare) {
    mediaContent = <CardMedia name={spotSquare} placement={mediaPlacement} type="spotSquare" />;
  }

  if (pictogram) {
    mediaContent = <CardMedia name={pictogram} placement={mediaPlacement} type="pictogram" />;
  }

  if (image) {
    mediaContent = <CardMedia placement={mediaPlacement} src={image} type="image" />;
  }

  const maxWidth = props.maxWidth ?? !!mediaContent ? '70%' : undefined;
  const minHeight = props.minHeight ?? !!mediaContent ? defaultMediaSize.height : undefined;

  const action = useMemo(() => {
    if (actionLabel && onActionPress) {
      return (
        <Button
          compact
          noScaleOnPress
          transparent
          accessibilityLabel={accessibilityLabel ?? actionLabel}
          endIcon="forwardArrow"
          flush="start"
          numberOfLines={3}
          onClick={onActionPress}
          testID={`${testID}-action`}
          variant="primary"
        >
          {actionLabel}
        </Button>
      );
    }

    return actionProp;
  }, [accessibilityLabel, actionLabel, actionProp, onActionPress, testID]);

  if (mediaPlacement === 'above') {
    return (
      <VStack
        gap={2}
        paddingBottom={spacingProps.paddingBottom}
        paddingTop={spacingProps.paddingTop}
        testID={testID}
        {...props}
      >
        {mediaContent}
        <VStack
          gap={1}
          paddingEnd={spacingProps.paddingEnd}
          paddingStart={spacingProps.paddingStart}
        >
          <Text
            font="headline"
            as="h3"
            numberOfLines={numberOfLines}
            testID={`${testID}-title`}
            transform="none"
          >
            {title}
          </Text>
          <Text
            color="fgMuted"
            font="label2"
            numberOfLines={numberOfLines}
            testID={`${testID}-description`}
            transform="none"
          >
            {description}
          </Text>
          {action}
        </VStack>
      </VStack>
    );
  }

  return (
    <HStack
      alignItems="center"
      flexGrow={1}
      gap={1}
      justifyContent="space-between"
      minHeight={minHeight}
      {...spacingProps}
      testID={testID}
      {...props}
    >
      <VStack alignItems="flex-start" flexShrink={1} gap={2} maxWidth={maxWidth}>
        <VStack gap={1} maxWidth="100%" paddingTop={mediaContent ? 0 : 2}>
          <Text
            font="headline"
            as="h3"
            numberOfLines={numberOfLines}
            testID={`${testID}-title`}
            transform="none"
          >
            {title}
          </Text>
          <Text
            color="fgMuted"
            font="label2"
            numberOfLines={numberOfLines}
            testID={`${testID}-description`}
            transform="none"
          >
            {description}
          </Text>
        </VStack>
        {children}
        {action}
      </VStack>
      {mediaContent}
    </HStack>
  );
});
