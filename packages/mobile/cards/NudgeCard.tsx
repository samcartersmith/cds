import React, { isValidElement, memo } from 'react';
import { PressableProps } from 'react-native';
import { getCardBodySpacingProps } from '@cbhq/cds-common/cards/getCardBodySpacingProps';
import { NudgeCardBaseProps } from '@cbhq/cds-common/types';

import { IconButton } from '../buttons';
import { Pictogram } from '../illustrations/Pictogram';
import { Box, HStack, VStack } from '../layout';
import { PressableOpacity } from '../system';
import { TextHeadline, TextLabel2 } from '../typography';

export type NudgeCardProps = NudgeCardBaseProps & {
  onDismissPress?: PressableProps['onPress'];
  onActionPress?: PressableProps['onPress'];
} & Pick<PressableProps, 'onPress'>;

export const NudgeCard = memo(
  ({
    title,
    description,
    pictogram,
    media,
    action,
    onActionPress,
    numberOfLines = 3,
    onDismissPress,
    width = '100%',
    testID = 'nudge-card',
    accessibilityLabel,
    background = 'backgroundAlternate',
    onPress,
    maxWidth,
    ...props
  }: NudgeCardProps) => {
    const hasMedia = pictogram || media;
    const spacingBottom = action ? 1 : 2;
    const spacingProps = getCardBodySpacingProps({ spacingBottom, compact: true });

    const renderAction = isValidElement(action) ? (
      action
    ) : (
      <PressableOpacity onPress={onActionPress}>
        <TextHeadline color="primary" numberOfLines={1} spacingVertical={1}>
          {action}
        </TextHeadline>
      </PressableOpacity>
    );

    const renderMedia = (
      <Box spacingEnd={onDismissPress ? 3 : 0}>
        {pictogram ? (
          <Pictogram
            dimension={action ? '64x64' : '48x48'}
            name={pictogram}
            testID={`${testID}-pictogram`}
          />
        ) : (
          media
        )}
      </Box>
    );

    const content = (
      <Box
        accessibilityLabel={accessibilityLabel}
        background={background}
        borderColor="transparent"
        borderRadius="roundedXLarge"
        maxWidth={maxWidth}
        position="relative"
        testID={testID}
        width={width}
      >
        {onDismissPress ? (
          // zIndex is required otherwise CardBody sits on top of it
          <Box position="absolute" right={0} spacing={0.5} top={0} zIndex={2}>
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
        {/* ported over from CardBody */}
        <HStack
          alignItems="center"
          flexGrow={1}
          gap={2}
          justifyContent="space-between"
          {...spacingProps}
          {...props}
        >
          <VStack alignItems="flex-start" flexShrink={1} gap={2} maxWidth={maxWidth}>
            <VStack gap={1} maxWidth="100%" spacingTop={hasMedia ? 0 : 2}>
              <TextHeadline
                ellipsize="tail"
                numberOfLines={numberOfLines}
                testID={`${testID}-title`}
                transform="none"
              >
                {title}
              </TextHeadline>
              <TextLabel2
                color="foregroundMuted"
                ellipsize="tail"
                numberOfLines={numberOfLines}
                testID={`${testID}-description`}
                transform="none"
              >
                {description}
              </TextLabel2>
            </VStack>
            {action ? renderAction : null}
          </VStack>
          {hasMedia ? renderMedia : null}
        </HStack>
      </Box>
    );
    return onPress ? <PressableOpacity onPress={onPress}>{content}</PressableOpacity> : content;
  },
);
