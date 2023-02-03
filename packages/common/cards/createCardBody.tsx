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
      mediaContent = <CardMedia type="spotSquare" placement={mediaPlacement} name={spotSquare} />;
    }

    if (pictogram) {
      mediaContent = <CardMedia type="pictogram" placement={mediaPlacement} name={pictogram} />;
    }

    if (image) {
      mediaContent = <CardMedia type="image" placement={mediaPlacement} src={image} />;
    }

    const maxWidth = props.maxWidth ?? !!mediaContent ? '70%' : undefined;
    const minHeight = props.minHeight ?? !!mediaContent ? defaultMediaSize.height : undefined;

    const action = useMemo(() => {
      if (actionLabel && onActionPress) {
        return (
          <CardBodyAction
            onPress={onActionPress}
            endIcon="forwardArrow"
            testID={`${testID}-action`}
            accessibilityLabel={accessibilityLabel ?? actionLabel}
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
          testID={testID}
          spacingTop={spacingTop}
          spacingBottom={spacingBottom}
          {...props}
        >
          {mediaContent}
          <VStack gap={1} spacingStart={spacingStart} spacingEnd={spacingEnd}>
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
        gap={1}
        justifyContent="space-between"
        alignItems="center"
        testID={testID}
        spacingTop={spacingTop}
        spacingBottom={spacingBottom}
        spacingStart={spacingStart}
        spacingEnd={spacingEnd}
        minHeight={minHeight}
        {...props}
      >
        <VStack gap={1} maxWidth={maxWidth} flexShrink={1} alignItems="flex-start">
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
