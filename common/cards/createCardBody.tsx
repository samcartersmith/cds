import { emptyObject } from '@cbhq/cds-utils';
import React, { memo, useMemo } from 'react';
import type {
  CardVariant,
  CardBoxProps,
  IllustrationNames,
  PaletteForeground,
  SharedProps,
  StackBaseProps,
  TextBaseProps,
} from '../types';
import { gutter } from '../tokens/sizing';
import type { CardMediaProps } from './createCardMedia';
import type { CardBodyActionBaseProps } from './createCardBodyAction';

export type CardBodyBaseProps<T> = {
  /** Text to be displayed in TextHeadline. */
  title?: string;
  /** Text to be displayed in TextLabel2. */
  description?: string;
  /** Variant to use for sizing media and defaulting orientation */
  variant?: CardVariant;
  /** The name of the Illustration to use in CardMedia. */
  illustration?: IllustrationNames;
  /** The image url to use in the CardMedia. Will not be used if illustration is present. */
  image?: string;
  /**
   * Remote Image or other node with media content.
   * If illustration prop is present this will default to <CardMedia type="illustration" name={illustration} variant={variant} />.
   * If image prop is present this will default to <CardMedia type="image" src={image} variant={variant} />.
   */
  media?: React.ReactNode;
  /**
   * Call to action to display underneath title and description.
   * When present this will set action prop to be CardBodyAction with some defaults.
   */
  actionLabel?: string;
  /** Callback to trigger when the call to action is pressed. actionLabel is required for this to work.  */
  onActionPress?: T;
  /**
   * Call to action to display underneath title and description.
   * When actionLabel and onActionPress are present this will assign action to <CardBodyAction onPress={onActionPress} endIcon="forwardArrow">{actionLabel}</CardBodyAction>.
   * Internally CardBodyAction is a normal CDS Button, but with some default props designed specifically for this layout.
   */
  action?: React.ReactNode;
  /** Vertical places media above text content, Horizontal places media to the side of text content
   * @default vertical
   */
  orientation?: 'vertical' | 'horizontal';
  /**
   * Maximum number of lines shown for title and description. Text that exceeds will be truncated.
   * @default 3
   */
  numberOfLines?: number;
} & CardBoxProps;

type TextProps = TextBaseProps & {
  color?: PaletteForeground;
  /** TODO: Add numberOfLines and ellipsize functionality to web and remove this conditional */
  ellipsize?: 'head' | 'middle' | 'tail' | 'clip' | undefined;
  numberOfLines?: number;
} & SharedProps;

type CreateCardBodyParams<OnPressFn> = {
  HStack: React.ComponentType<CardBoxProps & StackBaseProps>;
  VStack: React.ComponentType<CardBoxProps & StackBaseProps>;
  TextHeadline: React.ComponentType<TextProps>;
  TextLabel2: React.ComponentType<TextProps>;
  CardBodyAction: React.ComponentType<CardBodyActionBaseProps<OnPressFn>>;
  CardMedia: React.ComponentType<CardMediaProps>;
  platform: 'mobile' | 'web';
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
  const CardBodyMedia = memo(function CardBodyMedia({
    illustration,
    image,
    variant = 'feed',
    testID,
  }: CardBodyBaseProps<OnPressFn>) {
    if (illustration) {
      return (
        <CardMedia
          type="illustration"
          variant={variant}
          name={illustration}
          testID={testID ? `${testID}-media` : undefined}
        />
      );
    }
    if (image) {
      return (
        <CardMedia
          type="image"
          variant={variant}
          src={image}
          testID={testID ? `${testID}-media` : undefined}
        />
      );
    }
    return null;
  });

  const CardBody = memo(function CardBody({
    testID,
    title,
    description,
    variant = 'feed',
    orientation = variant !== 'feed' ? 'horizontal' : 'vertical',
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
    flexShrink = orientation === 'horizontal' ? 1 : undefined,
    minHeight = orientation === 'horizontal' ? 120 : undefined,
    maxWidth = orientation === 'horizontal' ? '70%' : undefined,
    alignItems = orientation === 'horizontal' ? 'flex-start' : undefined,
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
      return (
        mediaProp ?? (
          <CardBodyMedia
            illustration={illustration}
            variant={variant}
            testID={testID}
            image={image}
          />
        )
      );
    }, [illustration, image, mediaProp, testID, variant]);

    /** TODO: Add numberOfLines and ellipsize functionality to web and remove this conditional */
    const textProps: TextProps = useMemo(
      () => (platform === 'mobile' ? { numberOfLines, ellipsize: 'tail' } : emptyObject),
      [numberOfLines],
    );

    const content = (
      <VStack
        gap={1}
        maxWidth={maxWidth}
        alignItems={alignItems}
        flexShrink={flexShrink}
        spacingStart={orientation === 'vertical' ? spacingStart : undefined}
        spacingEnd={orientation === 'vertical' ? spacingEnd : undefined}
      >
        <TextHeadline {...textProps} testID={testID ? `${testID}-title` : undefined}>
          {title}
        </TextHeadline>
        <TextLabel2
          color="foregroundMuted"
          {...textProps}
          testID={testID ? `${testID}-description` : undefined}
        >
          {description}
        </TextLabel2>
        {action}
      </VStack>
    );

    if (orientation === 'vertical') {
      return (
        <VStack
          gap={2}
          testID={testID ? `${testID}-vertical` : undefined}
          spacingTop={spacingTop}
          spacingBottom={spacingBottom}
          minHeight={minHeight}
          {...props}
        >
          {media}
          {content}
        </VStack>
      );
    }

    return (
      <HStack
        gap={1}
        justifyContent="space-between"
        alignItems="center"
        testID={testID ? `${testID}-horizontal` : undefined}
        spacingTop={spacingTop}
        spacingBottom={spacingBottom}
        spacingStart={spacingStart}
        spacingEnd={spacingEnd}
        minHeight={minHeight}
        {...props}
      >
        {content}
        {media}
      </HStack>
    );
  });

  CardBody.displayName = 'CardBody';
  CardBodyMedia.displayName = 'CardBodyMedia';
  return CardBody;
}
