import React, { useCallback, memo, useEffect, forwardRef, ForwardedRef } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

import { SelectInputBaseProps } from '@cbhq/cds-common/types';
import { useInputVariant } from '@cbhq/cds-common/hooks/useInputVariant';
import {
  animateCaretInConfig,
  animateCaretOutConfig,
} from '@cbhq/cds-common/animation/selectInput';
import { useRotateAnimation } from '@cbhq/cds-mobile/animation/useRotateAnimation';
import { InputIcon } from '@cbhq/cds-mobile/controls/InputIcon';
import { useToggler } from '@cbhq/cds-common';
import { useInputBorderStyle } from '../hooks/useInputBorderStyle';
import { InputLabel } from './InputLabel';
import { HelperText } from './HelperText';
import { HStack } from '../layout/HStack';
import { TextBody } from '../typography/TextBody';
import { InputStack } from './InputStack';

export const SelectInput = memo(
  forwardRef(
    (
      {
        children,
        placeholder,
        label,
        helperText,
        variant = 'foregroundMuted',
        value,
        disabled = false,
        testID,
        width = '100%',
        accessibilityLabel,
        accessibilityHint,
        compact,
        onPress,
      }: SelectInputBaseProps,
      ref: ForwardedRef<TouchableWithoutFeedback>,
    ) => {
      const { rotateAnimation, animateRotateIn, animateRotateOut, rotateAnimationStyles } =
        useRotateAnimation(animateCaretInConfig, animateCaretOutConfig, 180);
      const [isSelectTrayOpen, toggleSelectTray] = useToggler(false);
      const focusedVariant = useInputVariant(!!isSelectTrayOpen, variant);
      const { borderColor, borderWidth, margin } = useInputBorderStyle(
        !!isSelectTrayOpen,
        variant,
        focusedVariant,
      );

      const labelTextColor = 'foreground';

      useEffect(() => {
        if (children) {
          rotateAnimation.flattenOffset();
          animateRotateIn.start();
          return;
        }
        animateRotateOut.start();
        toggleSelectTray.toggleOff();
      }, [animateRotateIn, animateRotateOut, children, rotateAnimation, toggleSelectTray]);

      const onSelectInputTriggerPress = useCallback(() => {
        onPress?.();
        toggleSelectTray.toggleOn();
      }, [onPress, toggleSelectTray]);

      return (
        <View>
          <TouchableWithoutFeedback
            onPress={onSelectInputTriggerPress}
            testID={testID}
            accessibilityLabel={accessibilityLabel ?? label}
            accessibilityHint={accessibilityHint ?? label}
            disabled={disabled}
            ref={ref}
          >
            <InputStack
              width={width}
              disabled={disabled}
              variant={focusedVariant}
              borderStyle={{
                borderColor,
                borderWidth,
                margin,
              }}
              animated
              startNode={
                compact && (
                  <HStack spacingStart={compact ? 1 : 2} alignItems="center">
                    <InputLabel color={labelTextColor} disabled={disabled}>
                      {label}
                    </InputLabel>
                  </HStack>
                )
              }
              inputNode={
                <HStack
                  alignItems="center"
                  background
                  borderRadius="standard"
                  justifyContent="space-between"
                  spacingStart={compact ? 1 : 2}
                  spacingVertical={compact ? 1 : 2}
                  flexGrow={1}
                  flexShrink={1}
                >
                  <TextBody color="foregroundMuted" ellipsize="tail" disabled={disabled}>
                    {value ?? placeholder ?? (!compact && label)}
                  </TextBody>
                </HStack>
              }
              endNode={
                <HStack alignItems="center">
                  <InputIcon
                    animated
                    compact={compact}
                    name="caretDown"
                    dangerouslySetStyle={rotateAnimationStyles}
                  />
                </HStack>
              }
              helperTextNode={
                Boolean(helperText) && <HelperText color={variant}>{helperText}</HelperText>
              }
              labelNode={
                !compact &&
                Boolean(label) && <InputLabel color={labelTextColor}>{label}</InputLabel>
              }
            />
          </TouchableWithoutFeedback>
          {isSelectTrayOpen && children}
        </View>
      );
    },
  ),
);
