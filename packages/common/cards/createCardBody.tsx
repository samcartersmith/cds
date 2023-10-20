import React, { memo, useMemo } from 'react';

import { defaultMediaSize } from '../tokens/card';
import { gutter } from '../tokens/sizing';
import type { PaletteForeground, SharedProps, TextBaseProps } from '../types';
import type {
  ButtonBaseProps,
  CardBodyBaseProps,
  CardBoxProps,
  CardMediaProps,
  CdsPlatform,
} from '../types/alpha';

type TextProps = TextBaseProps & {
  color?: PaletteForeground;
  /** TODO: Add ellipsize functionality to web and remove this conditional */
  ellipsize?: 'head' | 'middle' | 'tail' | 'clip' | undefined;
} & SharedProps;

type CreateCardBodyParams<OnPressFn> = {
  HStack: React.ComponentType<React.PropsWithChildren<CardBoxProps>>;
  VStack: React.ComponentType<React.PropsWithChildren<CardBoxProps>>;
  TextHeadline: React.ComponentType<React.PropsWithChildren<TextProps>>;
  TextLabel2: React.ComponentType<React.PropsWithChildren<TextProps>>;
  CardBodyAction: React.ComponentType<React.PropsWithChildren<ButtonBaseProps<OnPressFn>>>;
  CardMedia: React.ComponentType<React.PropsWithChildren<CardMediaProps>>;
  platform: CdsPlatform;
};

export function createCardBody<OnPressFn>({
  CardBodyAction,
  CardMedia,
  HStack,
  TextHeadline,
  TextLabel2,
  VStack,
  platform,
}: CreateCardBodyParams<OnPressFn>) {
  const CardBody = memo(function CardBody({
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
    spacing = gutter,
    spacingVertical = spacing,
    spacingHorizontal = spacing,
    spacingTop = spacingVertical,
    spacingBottom = spacingVertical,
    spacingStart = spacingHorizontal,
    spacingEnd = spacingHorizontal,
    numberOfLines = 3,
    accessibilityLabel,
    ...props
  }: CardBodyBaseProps<OnPressFn>) {
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

    /** TODO: Add ellipsize functionality to web and remove this conditional */
    const textProps: TextProps = useMemo(
      () =>
        platform === 'mobile'
          ? { numberOfLines, ellipsize: 'tail', transform: 'none' }
          : { numberOfLines, transform: 'none' },
      [numberOfLines],
    );

    if (mediaPlacement === 'above') {
      return (
        <VStack
          gap={2}
          spacingBottom={spacingBottom}
          spacingTop={spacingTop}
          testID={testID}
          {...props}
        >
          {mediaContent}
          <VStack gap={1} spacingEnd={spacingEnd} spacingStart={spacingStart}>
            <TextHeadline {...textProps} testID={`${testID}-title`}>
              {title}
            </TextHeadline>
            <TextLabel2 color="foregroundMuted" {...textProps} testID={`${testID}-description`}>
              {description}
            </TextLabel2>
            {action}
          </VStack>
        </VStack>
      );
    }

    return (
      <HStack
        alignItems="center"
        gap={1}
        justifyContent="space-between"
        minHeight={minHeight}
        spacingBottom={spacingBottom}
        spacingEnd={spacingEnd}
        spacingStart={spacingStart}
        spacingTop={spacingTop}
        testID={testID}
        {...props}
      >
        <VStack alignItems="flex-start" flexShrink={1} gap={1} maxWidth={maxWidth}>
          <TextHeadline {...textProps} testID={`${testID}-title`}>
            {title}
          </TextHeadline>
          <TextLabel2 color="foregroundMuted" {...textProps} testID={`${testID}-description`}>
            {description}
          </TextLabel2>
          {action}
        </VStack>
        {mediaContent}
      </HStack>
    );
  });

  CardBody.displayName = 'CardBody';
  return CardBody;
}
