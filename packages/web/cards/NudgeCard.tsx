import React, { isValidElement, memo } from 'react';
import { defaultNudgeCardWidth } from '@cbhq/cds-common/tokens/card';
import { NudgeCardBaseProps } from '@cbhq/cds-common/types';

import { IconButton } from '../buttons';
import { Pictogram } from '../illustrations/Pictogram';
import { Box, HStack } from '../layout';
import { PressableOpacity, PressableProps } from '../system';
import { TextHeadline } from '../typography';

import { CardBody } from './CardBody';

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
    action,
    onActionPress,
    // defaults to 3 in CardBody
    numberOfLines,
    onDismissPress,
    width = defaultNudgeCardWidth,
    // fixes bug when used in a Carousel
    minWidth = defaultNudgeCardWidth,
    testID = 'nudge-card',
    accessibilityLabel,
    maxHeight,
    maxWidth,
    onPress,
    ...props
  }: NudgeCardProps) => {
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
    const content = (
      <Box
        accessibilityLabel={accessibilityLabel}
        background="backgroundAlternate"
        borderColor="transparent"
        borderRadius="roundedXLarge"
        maxHeight={maxHeight}
        maxWidth={maxWidth}
        minWidth={minWidth}
        position="relative"
        width={width}
      >
        {onDismissPress ? (
          <Box alignSelf="flex-end" position="absolute" right={0} spacing={0.5} top={0}>
            <IconButton
              transparent
              accessibilityLabel={`Dismiss the ${
                accessibilityLabel ?? typeof title === 'string' ? title : ''
              } card`}
              name="close"
              onPress={onDismissPress}
              testID={`${testID}-dismiss-button`}
              variant="secondary"
            />
          </Box>
        ) : null}
        <CardBody
          compact
          action={action ? renderAction : null}
          description={description}
          media={<Pictogram dimension="64x64" name={pictogram} testID={`${testID}-spot-square`} />}
          numberOfLines={numberOfLines}
          title={title}
          {...props}
        />
      </Box>
    );
    return onPress ? <PressableOpacity onPress={onPress}>{content}</PressableOpacity> : content;
  },
);
