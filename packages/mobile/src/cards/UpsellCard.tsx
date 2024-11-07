import React, { isValidElement, memo } from 'react';
import { PressableProps } from 'react-native';
import { UpsellCardBaseProps } from '@cbhq/cds-common';
import { useScaleDensity } from '@cbhq/cds-common/scale/useScaleDensity';
import {
  upsellCardDefaultWidth,
  upsellCardMinHeight,
  upsellCardMinHeightDense,
} from '@cbhq/cds-common/tokens/card';

import { Button, IconButton } from '../buttons';
import { useLargeTextStyles } from '../hooks/useLargeTextStyles';
import { HStack, VStack } from '../layout';
import { PressableOpacity } from '../system';
import { TextHeadline, TextLabel2 } from '../typography';

export type UpsellCardProps = UpsellCardBaseProps & {
  /** Callback fired when the action button is pressed */
  onActionPress?: PressableProps['onPress'];
  /** Callback fired when the dismiss button is pressed */
  onDismissPress?: PressableProps['onPress'];
} & Pick<PressableProps, 'onPress'>;

export const UpsellCard = memo(
  ({
    title,
    description,
    action,
    onActionPress,
    onDismissPress,
    media,
    background = 'primaryWash',
    dangerouslySetBackground,
    testID = 'upsell-card',
    accessibilityLabel,
    width = upsellCardDefaultWidth,
    onPress,
  }: UpsellCardProps) => {
    const density = useScaleDensity();
    const largeTextStyle = useLargeTextStyles();

    const content = (
      <HStack
        alignContent="space-between"
        background={background}
        borderRadius="roundedXLarge"
        dangerouslySetBackground={dangerouslySetBackground}
        minHeight={density === 'dense' ? upsellCardMinHeightDense : upsellCardMinHeight}
        testID={testID}
        width={width}
      >
        <HStack
          alignContent="space-between"
          alignItems="center"
          borderRadius="roundedXLarge"
          height="100%"
          justifyContent="space-between"
          overflow="hidden"
          position="relative"
          width="100%"
        >
          <VStack
            gap={3}
            justifyContent="space-between"
            minHeight={density === 'dense' ? upsellCardMinHeightDense : upsellCardMinHeight}
            spacing={2}
            width="70%"
          >
            <VStack gap={1}>
              {typeof title === 'string' ? (
                <TextHeadline style={largeTextStyle}>{title}</TextHeadline>
              ) : (
                title
              )}
              {typeof description === 'string' ? (
                <TextLabel2 numberOfLines={3} style={largeTextStyle}>
                  {description}
                </TextLabel2>
              ) : (
                description
              )}
            </VStack>
            {!!action && (
              <HStack spacingStart={2}>
                {isValidElement(action) ? (
                  action
                ) : (
                  <Button
                    compact
                    flush="start"
                    numberOfLines={1}
                    onPress={onActionPress}
                    variant="secondary"
                  >
                    {action as string}
                  </Button>
                )}
              </HStack>
            )}
          </VStack>
          {!!media && (
            <HStack position="absolute" right={0}>
              {media}
            </HStack>
          )}
          {onDismissPress ? (
            <HStack position="absolute" right={0} spacing={1} top={0}>
              <IconButton
                accessibilityLabel={accessibilityLabel ?? `Dismiss the ${title} card`}
                name="close"
                onPress={onDismissPress}
                testID={`${testID}-dismiss-button`}
                variant="secondary"
              />
            </HStack>
          ) : null}
        </HStack>
      </HStack>
    );
    return onPress ? <PressableOpacity onPress={onPress}>{content}</PressableOpacity> : content;
  },
);
