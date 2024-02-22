import React, { isValidElement, memo } from 'react';
import { defaultNudgeCardWidth } from '@cbhq/cds-common/tokens/card';
import { NudgeCardBaseProps } from '@cbhq/cds-common/types';

import { IconButton } from '../buttons';
import { Pictogram } from '../illustrations/Pictogram';
import { Box, HStack } from '../layout';
import { OnPress, PressableOpacity } from '../system';
import { TextHeadline } from '../typography';

import { CardBody } from './CardBody';

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
  }: NudgeCardBaseProps<OnPress>) => {
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
          description={description}
          media={<Pictogram dimension="64x64" name={pictogram} testID={`${testID}-spot-square`} />}
          numberOfLines={numberOfLines}
          orientation="horizontal"
          title={title}
          {...props}
        >
          {action ? renderAction : null}
        </CardBody>
      </Box>
    );
    return onPress ? <PressableOpacity onPress={onPress}>{content}</PressableOpacity> : content;
  },
);
