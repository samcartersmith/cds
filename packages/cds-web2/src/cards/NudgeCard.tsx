import React from 'react';
import { css } from '@linaria/core';
import { type IllustrationPictogramNames } from '@cbhq/cds-common2/types/IllustrationNames';

import { IconButton } from '../buttons/IconButton';
import { Pictogram } from '../illustrations/Pictogram';
import { type BoxProps, Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { type StyleProps } from '../styles/styleProps';
import { Text } from '../typography/Text';

const actionButtonStyle = css`
  transform: scale(1);
  appearance: none;
  cursor: pointer;
  user-select: none;
  text-decoration: none;

  &:active {
    transform: scale(0.98);
    opacity: 0.82;
  }
  &:hover {
    opacity: 0.88;
  }
`;

const getCardBodyPaddingProps = ({
  paddingStart,
  paddingEnd,
  paddingTop,
  paddingBottom,
  padding,
  paddingX,
  paddingY,
  compact,
}: {
  compact?: boolean;
} & any) => {
  if (compact)
    return {
      paddingBottom: paddingBottom ?? paddingY ?? padding ?? 1,
      paddingTop: paddingTop ?? paddingY ?? padding ?? 2,
      paddingStart: paddingStart ?? paddingX ?? padding ?? 2,
      paddingEnd: paddingEnd ?? paddingX ?? padding ?? 2,
    };
  return {
    paddingBottom: paddingBottom ?? paddingY ?? padding ?? 3,
    paddingTop: paddingTop ?? paddingY ?? padding ?? 3,
    paddingStart: paddingStart ?? paddingX ?? padding ?? 3,
    paddingEnd: paddingEnd ?? paddingX ?? padding ?? 3,
  };
};

export type NudgeCardBaseProps = {
  /** Text or React.ReactNode to be displayed above the description in a TextHeadline */
  title?: React.ReactNode;
  /** Text or React.ReactNode to be displayed below the title in a TextBody */
  description?: React.ReactNode;
  /** If you pass a Pictogram name it will render a Pictogram to the right of the text content */
  pictogram?: IllustrationPictogramNames;
  /** Pass any node to be rendered to the right of the text content */
  media?: React.ReactNode;
  /** Text or React.ReactNode to display as the call to action */
  action?: React.ReactNode;
  /**
   * Maximum number of lines shown for the title and description text. Text that exceeds will be truncated.
   * @default 3
   */
  numberOfLines?: number;
  /**
   * @default 327
   */
  width?: StyleProps['width'];
  /**
   * @default 160
   */
  minHeight?: StyleProps['minHeight'];
  /**
   * Background color for the card.
   * @default bgAlternate
   */
  background?: StyleProps['background'];
  /**
   * Set the media position for the pictogram or media.
   * @default right
   */
  mediaPosition?: 'left' | 'right';
  /**
   * Callback fired when the action button is pressed
   * Cannot be used when `action` is a React Element, only when `action` is a string
   */
  onActionPress?: React.MouseEventHandler;
  /** Callback fired when the dismiss button is pressed */
  onDismissPress?: React.MouseEventHandler;
};

export type NudgeCardProps = NudgeCardBaseProps & Omit<BoxProps<'div'>, 'title'>;

export const NudgeCard = ({
  title,
  description,
  pictogram,
  media,
  mediaPosition = 'right',
  action,
  onActionPress,
  numberOfLines = 3,
  onDismissPress,
  width = 327,
  minWidth = 327,
  testID = 'nudge-card',
  accessibilityLabel,
  maxHeight,
  maxWidth,
  background = 'bgAlternate',
  minHeight,
  height,
  aspectRatio,
  ...props
}: NudgeCardProps) => {
  const hasMedia = pictogram || media;
  const paddingBottom = action ? 1 : 2;
  const paddingProps = getCardBodyPaddingProps({
    paddingBottom,
    compact: true,
  });

  const renderMedia = pictogram ? (
    <Pictogram
      dimension={action ? '64x64' : '48x48'}
      name={pictogram}
      testID={`${testID}-pictogram`}
    />
  ) : (
    media
  );

  return (
    <Box
      background={background}
      borderColor="transparent"
      borderRadius={500}
      maxHeight={maxHeight}
      maxWidth={maxWidth}
      minWidth={minWidth}
      paddingEnd={onDismissPress ? 3 : 0}
      position="relative"
      width={width}
      {...props}
    >
      {onDismissPress ? (
        <Box alignSelf="flex-end" padding={0.5} position="absolute" right={0} top={0}>
          <IconButton
            transparent
            accessibilityLabel={
              accessibilityLabel ?? `Dismiss the ${typeof title === 'string' ? title : ''} card`
            }
            name="close"
            onClick={onDismissPress}
            testID={`${testID}-dismiss-button`}
            variant="secondary"
          />
        </Box>
      ) : null}
      <HStack
        alignItems="center"
        aspectRatio={aspectRatio}
        flexGrow={1}
        gap={2}
        height={height}
        justifyContent={mediaPosition === 'right' ? 'space-between' : 'flex-start'}
        minHeight={minHeight}
        {...paddingProps}
      >
        {hasMedia && mediaPosition === 'left' && renderMedia}
        <VStack alignItems="flex-start" flexShrink={1} gap={2} maxWidth={maxWidth}>
          <VStack gap={0.5} maxWidth="100%" paddingTop={hasMedia ? 0 : 2}>
            <Text
              as="p"
              font="headline"
              numberOfLines={numberOfLines}
              testID={`${testID}-title`}
              transform="none"
            >
              {title}
            </Text>
            <Text
              as="p"
              font="label2"
              numberOfLines={numberOfLines}
              testID={`${testID}-description`}
              transform="none"
            >
              {description}
            </Text>
          </VStack>
          {typeof action === 'string' ? (
            <HStack as="button" className={actionButtonStyle} onClick={onActionPress} paddingY={1}>
              <Text as="span" color="fgPrimary" font="headline" numberOfLines={1}>
                {action}
              </Text>
            </HStack>
          ) : (
            action
          )}
        </VStack>
        {hasMedia && mediaPosition === 'right' && renderMedia}
      </HStack>
    </Box>
  );
};
