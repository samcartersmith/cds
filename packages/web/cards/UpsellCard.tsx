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
import { TextHeadline, TextLabel2 } from '../typography';

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
  }: UpsellCardBaseProps) => {
    const density = useScaleDensity();
    return (
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
        dangerouslySetStyle={{ border: 'none' }}
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
          <VStack gap={3} justifyContent="space-between" spacing={2} width="70%" zIndex={2}>
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
  },
);
