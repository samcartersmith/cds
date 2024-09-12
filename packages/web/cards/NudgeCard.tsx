import React, { isValidElement, memo } from 'react';
import { getCardBodySpacingProps } from '@cbhq/cds-common/cards/getCardBodySpacingProps';
import { defaultNudgeCardWidth } from '@cbhq/cds-common/tokens/card';
import { NudgeCardBaseProps } from '@cbhq/cds-common/types';

import { IconButton } from '../buttons';
import { Pictogram } from '../illustrations/Pictogram';
import { Box, HStack, VStack } from '../layout';
import { PressableOpacity, PressableProps } from '../system';
import { TextHeadline, TextLabel2 } from '../typography';

export type NudgeCardProps = {
  /**
   * Callback fired when the action button is pressed
   * Cannot be used when `action` is a React Element, only when `action` is a string
   */
  onActionPress?: PressableProps['onPress'];
  /** Callback fired when the dismiss button is pressed */
  onDismissPress?: PressableProps['onPress'];
} & NudgeCardBaseProps &
  Pick<PressableProps, 'onPress'>;

export const NudgeCard = memo(
  ({
    title,
    description,
    pictogram,
    media,
    mediaPosition = 'right',
    action,
    onActionPress,
    numberOfLines = 3,
    onDismissPress,
    width = defaultNudgeCardWidth,
    // fixes bug when used in a Carousel
    minWidth = defaultNudgeCardWidth,
    testID = 'nudge-card',
    accessibilityLabel,
    maxHeight,
    maxWidth,
    background = 'backgroundAlternate',
    onPress,
    ...props
  }: NudgeCardProps) => {
    const hasMedia = pictogram || media;
    const spacingBottom = action ? 1 : 2;
    const spacingProps = getCardBodySpacingProps({ spacingBottom, compact: true });

    const renderAction = isValidElement(action) ? (
      action
    ) : (
      <PressableOpacity onPress={onActionPress}>
        <HStack spacingVertical={1}>
          <TextHeadline as="span" color="primary" numberOfLines={1}>
            {action}
          </TextHeadline>
        </HStack>
      </PressableOpacity>
    );

    const renderMedia = pictogram ? (
      <Pictogram
        dimension={action ? '64x64' : '48x48'}
        name={pictogram}
        testID={`${testID}-pictogram`}
      />
    ) : (
      media
    );

    const content = (
      <Box
        background={background}
        borderColor="transparent"
        borderRadius="roundedXLarge"
        maxHeight={maxHeight}
        maxWidth={maxWidth}
        minWidth={minWidth}
        position="relative"
        spacingEnd={onDismissPress ? 3 : 0}
        width={width}
      >
        {onDismissPress ? (
          <Box alignSelf="flex-end" position="absolute" right={0} spacing={0.5} top={0}>
            <IconButton
              transparent
              accessibilityLabel={
                accessibilityLabel ?? `Dismiss the ${typeof title === 'string' ? title : ''} card`
              }
              name="close"
              onPress={onDismissPress}
              testID={`${testID}-dismiss-button`}
              variant="secondary"
            />
          </Box>
        ) : null}
        {/* ported over from CardBody */}
        <HStack
          alignItems="center"
          flexGrow={1}
          gap={2}
          justifyContent={mediaPosition === 'right' ? 'space-between' : 'flex-start'}
          {...spacingProps}
          {...props}
        >
          {hasMedia && mediaPosition === 'left' ? renderMedia : null}
          <VStack alignItems="flex-start" flexShrink={1} gap={2} maxWidth={maxWidth}>
            <VStack gap={0.5} maxWidth="100%" spacingTop={hasMedia ? 0 : 2}>
              <TextHeadline
                as="p"
                numberOfLines={numberOfLines}
                testID={`${testID}-title`}
                transform="none"
              >
                {title}
              </TextHeadline>
              <TextLabel2
                as="p"
                numberOfLines={numberOfLines}
                testID={`${testID}-description`}
                transform="none"
              >
                {description}
              </TextLabel2>
            </VStack>
            {action ? renderAction : null}
          </VStack>
          {hasMedia && mediaPosition === 'right' ? renderMedia : null}
        </HStack>
      </Box>
    );
    return onPress ? <PressableOpacity onPress={onPress}>{content}</PressableOpacity> : content;
  },
);
