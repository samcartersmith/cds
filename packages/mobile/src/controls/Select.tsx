import React, {
  ForwardedRef,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { animateCaretInConfig, animateCaretOutConfig } from '@cbhq/cds-common/animation/select';
import { ThemeVars } from '@cbhq/cds-common/core/theme';
import { useInputVariant } from '@cbhq/cds-common/hooks/useInputVariant';
import { useMergeRefs } from '@cbhq/cds-common/hooks/useMergeRefs';
import {
  selectTriggerCompactMinHeight,
  selectTriggerMinHeight,
} from '@cbhq/cds-common/tokens/select';
import {
  InputVariant,
  SharedAccessibilityProps,
  SharedInputProps,
  SharedProps,
} from '@cbhq/cds-common/types';

import { useRotateAnimation } from '../animation/useRotateAnimation';
import { useA11y } from '../hooks/useA11y';
import { useInputBorderStyle } from '../hooks/useInputBorderStyle';
import { HStack } from '../layout/HStack';
import { Text } from '../typography/Text';

import { TextInputFocusVariantContext } from './context';
import { HelperText } from './HelperText';
import { InputIcon } from './InputIcon';
import { InputLabel } from './InputLabel';
import { InputStack, type InputStackBaseProps } from './InputStack';
import { SelectProvider } from './SelectContext';
import { useSelect } from './useSelect';

const variantColorMap: Record<InputVariant, ThemeVars.Color> = {
  primary: 'fgPrimary',
  positive: 'fgPositive',
  negative: 'fgNegative',
  foreground: 'fg',
  foregroundMuted: 'fgMuted',
  secondary: 'bgSecondary',
};

export type SelectBaseProps = SharedProps &
  Omit<SharedInputProps, 'label'> &
  Pick<InputStackBaseProps, 'width' | 'disabled' | 'variant' | 'focused' | 'startNode'> &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > & {
    children?: React.ReactNode;
    /** Pass a value that will prepopulate the select input. This will replace the placeholder text. */
    value?: string;
    /** Optional label for selected value when using a value/label object model */
    valueLabel?: string;
    /** Event handler for when the Select Input trigger is pressed */
    onPress?: () => void;
    /** Optional string placed above the input (or within if compact is enabled) to indicate purpose of the input */
    label?: string;
    /** Callback that is fired whenever a select option is selected */
    onChange?: ((newValue: string) => void) | React.Dispatch<React.SetStateAction<string>>;
  };

export type SelectProps = SelectBaseProps;

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
      }: SelectProps,
      ref: ForwardedRef<TouchableWithoutFeedback>,
    ) => {
      const { rotateAnimation, animateRotateIn, animateRotateOut, rotateAnimationStyles } =
        useRotateAnimation(animateCaretInConfig, animateCaretOutConfig, 180);
      const [isSelectTrayOpen, toggleSelectTray] = useState(false);
      const toggleSelecTrayOff = useCallback(() => toggleSelectTray(false), [toggleSelectTray]);
      const toggleSelecTrayOn = useCallback(() => toggleSelectTray(true), [toggleSelectTray]);
      const focusedVariant = useInputVariant(!!isSelectTrayOpen, variant);
      const sanitizedValue = defaultValue === '' ? undefined : defaultValue;
      const internalRef = useRef(null);
      const refs = useMergeRefs(ref, internalRef);
      const context = useSelect({ value: sanitizedValue, onChange });
      const { value } = context;
      const { setA11yFocus, announceForA11y } = useA11y();
      const getSpacingStart = compact ? 1 : 2;
      const minHeight = compact ? selectTriggerCompactMinHeight : selectTriggerMinHeight;

      const { borderFocusedStyle, borderUnfocusedStyle } = useInputBorderStyle(
        !!isSelectTrayOpen,
        variant,
        focusedVariant,
      );

      const labelTextColor = 'fg';

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
        toggleSelecTrayOff();
      }, [
        animateRotateIn,
        animateRotateOut,
        children,
        rotateAnimation,
        toggleSelecTrayOff,
        handleA11y,
      ]);

      const handleOnSubjectPress = useCallback(() => {
        onPress?.();
        toggleSelecTrayOn();
      }, [onPress, toggleSelecTrayOn]);

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
                      name="caretDown"
                      style={rotateAnimationStyles}
                    />
                  </HStack>
                }
                focused={isSelectTrayOpen}
                helperTextNode={
                  Boolean(helperText) &&
                  (typeof helperText === 'string' ? (
                    <HelperText
                      color={variantColorMap[variant]}
                      errorIconTestID="select-error-icon"
                    >
                      {helperText}
                    </HelperText>
                  ) : (
                    helperText
                  ))
                }
                inputNode={
                  <HStack
                    alignItems="center"
                    background="bg"
                    borderRadius={200}
                    flexBasis={1}
                    flexGrow={1}
                    flexShrink={1}
                    justifyContent={compact ? 'flex-end' : 'flex-start'}
                    minHeight={minHeight}
                    paddingStart={startNode ? 0 : getSpacingStart}
                    paddingY={compact ? 1 : 2}
                  >
                    <Text
                      accessibilityState={accessibilityState}
                      align={compact ? 'end' : 'start'}
                      color="fgMuted"
                      disabled={disabled}
                      ellipsize="tail"
                      font="body"
                    >
                      {valueLabel ?? value ?? placeholder ?? (!compact && label)}
                    </Text>
                  </HStack>
                }
                labelNode={
                  !compact &&
                  Boolean(label) && <InputLabel color={labelTextColor}>{label}</InputLabel>
                }
                startNode={
                  <>
                    {compact && (
                      <HStack alignItems="center" maxWidth="40%" paddingStart={2}>
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
