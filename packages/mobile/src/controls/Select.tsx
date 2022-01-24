import React, { useCallback, memo, useEffect, forwardRef, ForwardedRef } from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { SelectBaseProps } from '@cbhq/cds-common/types';
import { useInputVariant } from '@cbhq/cds-common/hooks/useInputVariant';
import { animateCaretInConfig, animateCaretOutConfig } from '@cbhq/cds-common/animation/select';

import { useRotateAnimation } from '../animation/useRotateAnimation';
import { useInputBorderStyle } from '../hooks/useInputBorderStyle';
import { HStack } from '../layout/HStack';
import { TextBody } from '../typography/TextBody';

import { InputIcon } from './InputIcon';
import { InputLabel } from './InputLabel';
import { InputStack } from './InputStack';
import { HelperText } from './HelperText';

export const Select = memo(
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
      }: SelectBaseProps,
      ref: ForwardedRef<TouchableWithoutFeedback>,
    ) => {
      const { rotateAnimation, animateRotateIn, animateRotateOut, rotateAnimationStyles } =
        useRotateAnimation(animateCaretInConfig, animateCaretOutConfig, 180);
      const [isSelectTrayOpen, toggleSelectTray] = useToggler(false);
      const focusedVariant = useInputVariant(!!isSelectTrayOpen, variant);

      const { borderFocusedStyle, borderUnfocusedStyle } = useInputBorderStyle(
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

      const onSelectTriggerPress = useCallback(() => {
        onPress?.();
        toggleSelectTray.toggleOn();
      }, [onPress, toggleSelectTray]);

      return (
        <>
          <TouchableWithoutFeedback
            onPress={onSelectTriggerPress}
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
              borderStyle={borderUnfocusedStyle}
              borderFocusedStyle={borderFocusedStyle}
              focused={isSelectTrayOpen}
              animated
              startNode={
                compact && (
                  <HStack spacingStart={2} alignItems="center" maxWidth="40%">
                    <InputLabel color={labelTextColor} disabled={disabled} noWrap>
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
        </>
      );
    },
  ),
);
