import React, { isValidElement, memo } from 'react';
import { UpsellCardBaseProps } from '@cbhq/cds-common';
import { useScaleDensity } from '@cbhq/cds-common/scale/useScaleDensity';
import {
  upsellCardDefaultWidth,
  upsellCardMinHeight,
  upsellCardMinHeightDense,
} from '@cbhq/cds-common/tokens/card';

import { Button, IconButton } from '../buttons';
import { HStack, VStack } from '../layout';
import { type PressableProps, PressableOpacity } from '../system';
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
    const content = (
      <HStack
        accessibilityLabel={accessibilityLabel}
        alignContent="space-between"
        background={background}
        borderColor="transparent"
        borderRadius="roundedXLarge"
        minHeight={density === 'dense' ? upsellCardMinHeightDense : upsellCardMinHeight}
        testID={testID}
        width={width}
        // eslint-disable-next-line react/jsx-sort-props
        dangerouslySetBackground={dangerouslySetBackground}
        // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop, react/jsx-sort-props
        style={{ border: 'none' }}
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
            zIndex={2}
          >
            <VStack gap={1}>
              {typeof title === 'string' ? <TextHeadline as="h3">{title}</TextHeadline> : title}
              {typeof description === 'string' ? (
                <TextLabel2 as="p" numberOfLines={3}>
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
            <HStack position="absolute" right={0} zIndex={0}>
              {media}
            </HStack>
          )}
          {onDismissPress && (
            <HStack position="absolute" right={0} spacing={1} top={0} zIndex={1}>
              <IconButton
                accessibilityLabel={`Dismiss the ${accessibilityLabel ?? title} card`}
                name="close"
                onPress={onDismissPress}
                testID={`${testID}-dismiss-button`}
                variant="secondary"
              />
            </HStack>
          )}
        </HStack>
      </HStack>
    );
    return onPress ? <PressableOpacity onPress={onPress}>{content}</PressableOpacity> : content;
  },
);
