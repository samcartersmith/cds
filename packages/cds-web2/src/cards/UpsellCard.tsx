import React, { isValidElement, memo } from 'react';
import { upsellCardDefaultWidth, upsellCardMinHeight } from '@cbhq/cds-common2/tokens/card';
import type { UpsellCardBaseProps } from '@cbhq/cds-common2/types';

import { Button, IconButton } from '../buttons';
import { HStack, VStack } from '../layout';
import { Pressable, type PressableDefaultElement, type PressableProps } from '../system';
import { Text } from '../typography/Text';

export type UpsellCardProps = UpsellCardBaseProps & {
  /** Callback fired when the action button is pressed */
  onActionPress?: PressableProps<PressableDefaultElement>['onClick'];
  /** Callback fired when the dismiss button is pressed */
  onDismissPress?: PressableProps<PressableDefaultElement>['onClick'];
  /** Callback fired when the card is pressed */
  onClick?: PressableProps<PressableDefaultElement>['onClick'];
};

export const UpsellCard = memo(
  ({
    title,
    description,
    action,
    onActionPress,
    onDismissPress,
    media,
    background = 'bgPrimaryWash',
    dangerouslySetBackground,
    testID = 'upsell-card',
    accessibilityLabel,
    width = upsellCardDefaultWidth,
    onClick,
  }: UpsellCardProps) => {
    const content = (
      <HStack
        alignContent="space-between"
        background={background}
        borderColor="transparent"
        borderRadius={500}
        minHeight={upsellCardMinHeight}
        testID={testID}
        width={width}
        dangerouslySetBackground={dangerouslySetBackground}
        style={{ border: 'none' }}
      >
        <HStack
          alignContent="space-between"
          alignItems="center"
          borderRadius={500}
          height="100%"
          justifyContent="space-between"
          overflow="hidden"
          position="relative"
          width="100%"
        >
          <VStack
            gap={3}
            justifyContent="space-between"
            minHeight={upsellCardMinHeight}
            padding={2}
            width="70%"
          >
            <VStack gap={1}>
              {typeof title === 'string' ? (
                <Text as="h3" font="headline">
                  {title}
                </Text>
              ) : (
                title
              )}
              {typeof description === 'string' ? (
                <Text as="p" font="label2" numberOfLines={3}>
                  {description}
                </Text>
              ) : (
                description
              )}
            </VStack>
            {!!action && (
              <HStack paddingStart={2}>
                {isValidElement(action) ? (
                  action
                ) : (
                  <Button
                    compact
                    flush="start"
                    numberOfLines={1}
                    onClick={onActionPress}
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
          {onDismissPress && (
            <HStack padding={1} position="absolute" right={0} top={0}>
              <IconButton
                accessibilityLabel={accessibilityLabel ?? `Dismiss the ${title} card`}
                name="close"
                onClick={onDismissPress}
                testID={`${testID}-dismiss-button`}
                variant="secondary"
              />
            </HStack>
          )}
        </HStack>
      </HStack>
    );

    return onClick ? (
      <Pressable background="transparent" onClick={onClick}>
        {content}
      </Pressable>
    ) : (
      content
    );
  },
);
