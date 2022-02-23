import React, { memo, useMemo } from 'react';
import { emptyObject } from '@cbhq/cds-utils';
import type {
  ButtonBaseProps,
  CardBoxProps,
  CardBodyBaseProps,
  CardMediaProps,
  CdsPlatform,
} from '../types/alpha';
import type { PaletteForeground, SharedProps, TextBaseProps } from '../types';
import { gutter } from '../tokens/sizing';
import { defaultMediaSize } from '../tokens/card';

type TextProps = TextBaseProps & {
  color?: PaletteForeground;
  /** TODO: Add numberOfLines and ellipsize functionality to web and remove this conditional */
  ellipsize?: 'head' | 'middle' | 'tail' | 'clip' | undefined;
  numberOfLines?: number;
} & SharedProps;

type CreateCardBodyParams<OnPressFn> = {
  HStack: React.ComponentType<CardBoxProps>;
  VStack: React.ComponentType<CardBoxProps>;
  TextHeadline: React.ComponentType<TextProps>;
  TextLabel2: React.ComponentType<TextProps>;
  CardBodyAction: React.ComponentType<ButtonBaseProps<OnPressFn>>;
  CardMedia: React.ComponentType<CardMediaProps>;
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
    illustration,
    image,
    media: mediaProp,
    spacingVertical = gutter,
    spacingHorizontal = gutter,
    spacingTop = spacingVertical,
    spacingBottom = spacingVertical,
    spacingStart = spacingHorizontal,
    spacingEnd = spacingHorizontal,
    numberOfLines = 3,
    ...props
  }: CardBodyBaseProps<OnPressFn>) {
    const action = useMemo(() => {
      if (actionLabel && onActionPress) {
        return (
          <CardBodyAction
            onPress={onActionPress}
            endIcon="forwardArrow"
            testID={testID ? `${testID}-action` : undefined}
          >
            {actionLabel}
          </CardBodyAction>
        );
      }
      return actionProp;
    }, [actionLabel, actionProp, onActionPress, testID]);

    const media = useMemo(() => {
      if (mediaProp) return mediaProp;
      if (illustration) {
        return (
          <CardMedia
            type="illustration"
            name={illustration}
            placement={mediaPlacement}
            testID={`${testID}-media`}
          />
        );
      }
      if (image) {
        return (
          <CardMedia
            type="image"
            src={image}
            placement={mediaPlacement}
            testID={`${testID}-media`}
          />
        );
      }
      return null;
    }, [illustration, image, mediaPlacement, mediaProp, testID]);

    /** TODO: Add numberOfLines and ellipsize functionality to web and remove this conditional */
    const textProps: TextProps = useMemo(
      () => (platform === 'mobile' ? { numberOfLines, ellipsize: 'tail' } : emptyObject),
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
          {media}
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
        minHeight={defaultMediaSize.height}
        {...props}
      >
        <VStack gap={1} maxWidth="70%" flexShrink={1} alignItems="flex-start">
          <TextHeadline {...textProps} testID={`${testID}-title`}>
            {title}
          </TextHeadline>
          <TextLabel2 color="foregroundMuted" {...textProps} testID={`${testID}-description`}>
            {description}
          </TextLabel2>
          {action}
        </VStack>
        {media}
      </HStack>
    );
  });

  CardBody.displayName = 'CardBody';
  return CardBody;
}
