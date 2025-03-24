import React, { memo, useMemo } from 'react';
import { PressableProps } from 'react-native';
import { getCardBodySpacingProps } from '@cbhq/cds-common2/cards/getCardBodySpacingProps';
import { defaultMediaSize } from '@cbhq/cds-common2/tokens/card';
import type { CardBodyBaseProps } from '@cbhq/cds-common2/types';

import { Button, type ButtonProps } from '../buttons/Button';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Text } from '../typography/Text';

import { CardMedia } from './CardMedia';

export type CardBodyProps = CardBodyBaseProps & {
  onActionPress?: PressableProps['onPress'];
};

type CardBodyActionProps = ButtonProps & {
  onPress?: PressableProps['onPress'];
};

const CardBodyAction = memo(function CardBodyAction({
  children,
  compact = true,
  flush = 'start',
  transparent = true,
  variant = 'primary',
  numberOfLines = 3,
  ...props
}: CardBodyActionProps) {
  return (
    <Button
      noScaleOnPress
      compact={compact}
      flush={flush}
      numberOfLines={numberOfLines}
      transparent={transparent}
      variant={variant}
      {...props}
    >
      {children}
    </Button>
  );
});

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
    paddingEnd,
    paddingBottom,
    paddingStart,
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
        <CardBodyAction
          accessibilityLabel={accessibilityLabel ?? actionLabel}
          endIcon="forwardArrow"
          onPress={onActionPress}
          testID={`${testID}-action`}
        >
          {actionLabel}
        </CardBodyAction>
      );
    }
    return actionProp;
  }, [accessibilityLabel, actionLabel, actionProp, onActionPress, testID]);

  const textProps = useMemo(
    () => ({ numberOfLines, ellipsize: 'tail' as const, transform: 'none' as const }),
    [numberOfLines],
  );

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
          <Text font="headline" {...textProps} testID={`${testID}-title`}>
            {title}
          </Text>
          <Text color="fgMuted" font="label2" {...textProps} testID={`${testID}-description`}>
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
          <Text font="headline" {...textProps} testID={`${testID}-title`}>
            {title}
          </Text>
          <Text color="fgMuted" font="label2" {...textProps} testID={`${testID}-description`}>
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
