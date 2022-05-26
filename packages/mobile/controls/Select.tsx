import React, { ForwardedRef, forwardRef, memo, useCallback, useEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { animateCaretInConfig, animateCaretOutConfig } from '@cbhq/cds-common/animation/select';
import { useInputVariant } from '@cbhq/cds-common/hooks/useInputVariant';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import {
  selectTriggerCompactMinHeight,
  selectTriggerMinHeight,
} from '@cbhq/cds-common/tokens/select';
import { SelectBaseProps } from '@cbhq/cds-common/types';

import { useRotateAnimation } from '../animation/useRotateAnimation';
import { useInputBorderStyle } from '../hooks/useInputBorderStyle';
import { HStack } from '../layout/HStack';
import { TextBody } from '../typography/TextBody';

import { TextInputFocusVariantContext } from './context';
import { HelperText } from './HelperText';
import { InputIcon } from './InputIcon';
import { InputLabel } from './InputLabel';
import { InputStack } from './InputStack';
import { SelectProvider } from './SelectContext';
import { useSelect } from './useSelect';

export const Select = memo(
  forwardRef(
    (
      {
        children,
        placeholder,
        label,
        helperText,
        variant = 'foregroundMuted',
        value: defaultValue,
        valueLabel,
        disabled = false,
        testID,
        width = '100%',
        accessibilityLabel,
        accessibilityHint,
        compact,
        onPress,
        startNode,
        onChange,
      }: SelectBaseProps,
      ref: ForwardedRef<TouchableWithoutFeedback>,
    ) => {
      const { rotateAnimation, animateRotateIn, animateRotateOut, rotateAnimationStyles } =
        useRotateAnimation(animateCaretInConfig, animateCaretOutConfig, 180);
      const [isSelectTrayOpen, toggleSelectTray] = useToggler(false);
      const focusedVariant = useInputVariant(!!isSelectTrayOpen, variant);
      const sanitizedValue = defaultValue === '' ? undefined : defaultValue;
      const context = useSelect({ value: sanitizedValue, onChange });
      const { value } = context;

      const getSpacingStart = compact ? 1 : 2;
      const minHeight = useScaleConditional(
        compact ? selectTriggerCompactMinHeight : selectTriggerMinHeight,
      );

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

      const handleOnSubjectPress = useCallback(() => {
        onPress?.();
        toggleSelectTray.toggleOn();
      }, [onPress, toggleSelectTray]);

      return (
        <TextInputFocusVariantContext.Provider value={focusedVariant}>
          <SelectProvider value={context}>
            <TouchableWithoutFeedback
              onPress={handleOnSubjectPress}
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
                  <>
                    {compact && (
                      <HStack spacingStart={2} alignItems="center" maxWidth="40%">
                        <InputLabel color={labelTextColor} disabled={disabled} noWrap>
                          {label}
                        </InputLabel>
                      </HStack>
                    )}
                    {!!startNode && <HStack alignItems="center">{startNode}</HStack>}
                  </>
                }
                inputNode={
                  <HStack
                    alignItems="center"
                    background
                    borderRadius="standard"
                    justifyContent={compact ? 'flex-end' : 'flex-start'}
                    spacingStart={startNode ? 0 : getSpacingStart}
                    spacingVertical={compact ? 1 : 2}
                    flexGrow={1}
                    flexShrink={1}
                    minHeight={minHeight}
                  >
                    <TextBody
                      color="foregroundMuted"
                      ellipsize="tail"
                      disabled={disabled}
                      align={compact ? 'end' : 'start'}
                    >
                      {valueLabel ?? value ?? placeholder ?? (!compact && label)}
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
          </SelectProvider>
        </TextInputFocusVariantContext.Provider>
      );
    },
  ),
);
