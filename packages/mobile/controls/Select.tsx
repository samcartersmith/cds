import React, {
  ForwardedRef,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { animateCaretInConfig, animateCaretOutConfig } from '@cbhq/cds-common/animation/select';
import { useInputVariant } from '@cbhq/cds-common/hooks/useInputVariant';
import { useMergedRef } from '@cbhq/cds-common/hooks/useMergedRef';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import {
  selectTriggerCompactMinHeight,
  selectTriggerMinHeight,
} from '@cbhq/cds-common/tokens/select';
import { SelectBaseProps } from '@cbhq/cds-common/types';

import { useRotateAnimation } from '../animation/useRotateAnimation';
import { useA11y } from '../hooks/useA11y';
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
      const internalRef = useRef(null);
      const refs = useMergedRef(ref, internalRef);
      const context = useSelect({ value: sanitizedValue, onChange });
      const { value } = context;
      const { setA11yFocus, announceForA11y } = useA11y();
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

      const handleA11y = useCallback(() => {
        // bring a11y focus back to the trigger
        setA11yFocus(internalRef);
        // announce select value to screen reader
        announceForA11y(`${value} selected`);
      }, [value, announceForA11y, setA11yFocus]);

      useEffect(() => {
        if (children) {
          rotateAnimation.flattenOffset();
          animateRotateIn.start();
          return;
        }
        animateRotateOut.start(({ finished }) => {
          if (finished) {
            // This needs to execute after exit animation to avoid interrupting announcement.
            handleA11y();
          }
        });
        toggleSelectTray.toggleOff();
      }, [
        animateRotateIn,
        animateRotateOut,
        children,
        rotateAnimation,
        toggleSelectTray,
        handleA11y,
      ]);

      const handleOnSubjectPress = useCallback(() => {
        onPress?.();
        toggleSelectTray.toggleOn();
      }, [onPress, toggleSelectTray]);

      const accessibilityState = useMemo(() => ({ disabled: !!disabled }), [disabled]);

      const defaultAccessibilityLabel =
        (variant === 'negative' ? 'error, ' : '') +
        (label ? `${label}, ` : '') +
        (value ?? placeholder ? `${value ?? placeholder}, ` : '') +
        (typeof helperText === 'string' ? helperText : '');

      return (
        <TextInputFocusVariantContext.Provider value={focusedVariant}>
          <SelectProvider value={context}>
            <TouchableWithoutFeedback
              ref={refs}
              accessibilityHint={accessibilityHint}
              accessibilityLabel={accessibilityLabel ?? defaultAccessibilityLabel}
              accessibilityRole="menu"
              accessibilityState={accessibilityState}
              disabled={disabled}
              onPress={handleOnSubjectPress}
              testID={testID}
            >
              <InputStack
                animated
                borderFocusedStyle={borderFocusedStyle}
                borderStyle={borderUnfocusedStyle}
                disabled={disabled}
                endNode={
                  <HStack alignItems="center">
                    <InputIcon
                      animated
                      compact={compact}
                      dangerouslySetStyle={rotateAnimationStyles}
                      name="caretDown"
                    />
                  </HStack>
                }
                focused={isSelectTrayOpen}
                helperTextNode={
                  Boolean(helperText) &&
                  (typeof helperText === 'string' ? (
                    <HelperText color={variant} errorIconTestID="select-error-icon">
                      {helperText}
                    </HelperText>
                  ) : (
                    helperText
                  ))
                }
                inputNode={
                  <HStack
                    background
                    alignItems="center"
                    borderRadius="rounded"
                    flexGrow={1}
                    flexShrink={1}
                    justifyContent={compact ? 'flex-end' : 'flex-start'}
                    minHeight={minHeight}
                    spacingStart={startNode ? 0 : getSpacingStart}
                    spacingVertical={compact ? 1 : 2}
                  >
                    <TextBody
                      accessibilityState={accessibilityState}
                      align={compact ? 'end' : 'start'}
                      color="foregroundMuted"
                      disabled={disabled}
                      ellipsize="tail"
                    >
                      {valueLabel ?? value ?? placeholder ?? (!compact && label)}
                    </TextBody>
                  </HStack>
                }
                labelNode={
                  !compact &&
                  Boolean(label) && <InputLabel color={labelTextColor}>{label}</InputLabel>
                }
                startNode={
                  <>
                    {compact && (
                      <HStack alignItems="center" maxWidth="40%" spacingStart={2}>
                        <InputLabel noWrap color={labelTextColor} disabled={disabled}>
                          {label}
                        </InputLabel>
                      </HStack>
                    )}
                    {!!startNode && <HStack alignItems="center">{startNode}</HStack>}
                  </>
                }
                variant={focusedVariant}
                width={width}
              />
            </TouchableWithoutFeedback>
            {isSelectTrayOpen && children}
          </SelectProvider>
        </TextInputFocusVariantContext.Provider>
      );
    },
  ),
);
