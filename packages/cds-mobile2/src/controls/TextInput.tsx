import React, {
  cloneElement,
  ForwardedRef,
  forwardRef,
  isValidElement,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  TextInput as RNTextInput,
  TextInputFocusEventData,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';
import { useInputVariant } from '@cbhq/cds-common2/hooks/useInputVariant';
import { useMergeRefs } from '@cbhq/cds-common2/hooks/useMergeRefs';
import { DimensionValue } from '@cbhq/cds-common2/types/DimensionStyles';
import { InputVariant } from '@cbhq/cds-common2/types/InputBaseProps';
import { TextInputBaseProps } from '@cbhq/cds-common2/types/TextInputBaseProps';

import { useInputBorderStyle } from '../hooks/useInputBorderStyle';
import { useTheme } from '../hooks/useTheme';
import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { TextLabel1 } from '../typography/TextLabel1';

import { TextInputFocusVariantContext } from './context';
import { HelperText } from './HelperText';
import { InputIconButton, InputIconButtonProps } from './InputIconButton';
import { InputLabel } from './InputLabel';
import { InputStack } from './InputStack';
import { NativeInput } from './NativeInput';

export type TextInputProps = {
  value?: RNTextInputProps['value'];
  onChange?: RNTextInputProps['onChange'];
  onChangeText?: RNTextInputProps['onChangeText'];
  /**
   * minimum height of input
   * @default auto
   */
  minHeight?: DimensionValue;
  /**
   * Native TextInput textAlign with the extra unset option to remove the textAlign style.
   * Use this to workaround the issue where long text does not ellipsis in TextInput
   */
  textAlign?: RNTextInputProps['textAlign'] | 'unset';
  /**
   * Determines if the input should have a border
   * @default true
   */
  bordered?: boolean;
} & TextInputBaseProps &
  Omit<RNTextInputProps, 'value' | 'onChange' | 'onChangeText' | 'textAlign'>;

const variantColorMap: Record<InputVariant, ThemeVars.Color> = {
  primary: 'textPrimary',
  positive: 'textPositive',
  negative: 'textNegative',
  foreground: 'textForeground',
  foregroundMuted: 'textForegroundMuted',
  secondary: 'backgroundSecondary',
};

/**
 * For all Text and TextInputs we set allowFontScaling={true} and maxFontSizeMultiplier={1}.
 * CDS handles everything above 1 and anything below 1 will use React Native's font scaling.
 * This is temporary until we run a scale project to sort out how we want CDS scale to work with dense device scales.
 */
const fontScaleProps = {
  allowFontScaling: true,
  maxFontSizeMultiplier: 1,
} as const;

export const TextInput = memo(
  forwardRef(
    (
      {
        label,
        helperText = '',
        variant = 'foregroundMuted',
        testID,
        testIDMap,
        start,
        end,
        width = '100%',
        disabled = false,
        align = 'start',
        compact,
        suffix = '',
        accessibilityLabel,
        borderRadius,
        enableColorSurge = false,
        helperTextErrorIconAccessibilityLabel = 'error',
        bordered,
        ...editableInputProps
      }: TextInputProps,
      ref: ForwardedRef<RNTextInput>,
    ) => {
      const theme = useTheme();
      const [focused, setFocused] = useState(false);
      const focusedVariant = useInputVariant(focused, variant);
      const internalRef = useRef<RNTextInput>(null);
      const refs = useMergeRefs(ref, internalRef);
      const { borderFocusedStyle, borderUnfocusedStyle } = useInputBorderStyle(
        focused,
        variant,
        focusedVariant,
        bordered,
      );

      const editableInputAddonProps = {
        ...editableInputProps,
        onFocus: (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
          editableInputProps?.onFocus?.(e);
          setFocused(true);
        },
        onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
          editableInputProps?.onBlur?.(e);
          setFocused(false);
        },
      };

      const handleNodePress = useCallback(() => {
        setFocused(true);
        internalRef.current?.focus();
      }, [setFocused, internalRef]);

      /**
       * If startContent exist, the padding
       * between input area and icon should be 0.5 (4px).
       * This is not the case when there is no startContent.
       * In normal circumstances, spacing horizontal should be 2 (16px)
       */
      const startSpacing = { paddingLeft: theme.space[0.5] };

      // Get the accessability label from the start node child
      const startIconA11yLabel = useMemo(() => {
        if (isValidElement(start) && start.type === InputIconButton) {
          return (start.props as InputIconButtonProps).accessibilityLabel;
        }

        return undefined;
      }, [start]);

      // The Pressable element steals the accessability props 🥷
      const inaccessibleStart = useMemo(() => {
        if (isValidElement(start) && start.type === InputIconButton) {
          return cloneElement(start, {
            ...start.props,
            accessibilityLabel: undefined,
            accessibilityHint: undefined,
            accessibilityElementsHidden: true,
            importantForAccessibility: 'no',
          } as InputIconButtonProps);
        }

        return start;
      }, [start]);

      const startEndBackground = useMemo(() => {
        if (!disabled && editableInputAddonProps.readOnly) {
          return 'backgroundSecondary';
        }
        return undefined;
      }, [disabled, editableInputAddonProps.readOnly]);

      return (
        <InputStack
          borderFocusedStyle={borderFocusedStyle}
          borderRadius={borderRadius}
          borderStyle={borderUnfocusedStyle}
          disabled={disabled}
          enableColorSurge={enableColorSurge}
          endNode={
            (suffix !== '' || !!end) && (
              <HStack
                alignItems="center"
                background={startEndBackground}
                gap={2}
                justifyContent="center"
                testID={testIDMap?.end ?? ''}
              >
                <Pressable accessibilityRole="button" disabled={disabled} onPress={handleNodePress}>
                  <HStack>
                    {suffix !== '' && (
                      <TextLabel1 color="textForegroundMuted" paddingRight={2}>
                        {suffix}
                      </TextLabel1>
                    )}
                    {!!end && (
                      <TextInputFocusVariantContext.Provider value={focusedVariant}>
                        {end}
                      </TextInputFocusVariantContext.Provider>
                    )}
                  </HStack>
                </Pressable>
              </HStack>
            )
          }
          focused={focused}
          helperTextNode={
            !!helperText &&
            (typeof helperText === 'string' ? (
              <HelperText
                align={align}
                color={variantColorMap[variant]}
                errorIconAccessibilityLabel={helperTextErrorIconAccessibilityLabel}
                errorIconTestID={`${testIDMap?.helperText}-error-icon`}
                testID={testIDMap?.helperText ?? ''}
              >
                {helperText}
              </HelperText>
            ) : (
              helperText
            ))
          }
          inputNode={
            <NativeInput
              ref={refs}
              accessibilityHint={accessibilityLabel}
              accessibilityLabel={accessibilityLabel}
              align={align}
              compact={compact}
              containerSpacing={start ? startSpacing : {}}
              disabled={disabled}
              testID={testID}
              {...editableInputAddonProps}
              {...fontScaleProps}
            />
          }
          labelNode={
            !compact && !!label && <InputLabel testID={testIDMap?.label ?? ''}>{label}</InputLabel>
          }
          startNode={
            ((compact && !!label) || !!start) && (
              <Box
                alignItems="center"
                background={startEndBackground}
                justifyContent="center"
                testID={testIDMap?.start}
              >
                <Pressable
                  accessibilityElementsHidden={!startIconA11yLabel}
                  accessibilityHint={startIconA11yLabel}
                  accessibilityLabel={startIconA11yLabel}
                  accessibilityRole="button"
                  disabled={disabled}
                  importantForAccessibility={startIconA11yLabel ? 'auto' : 'no'}
                  onPress={handleNodePress}
                >
                  <HStack>
                    {compact && !!label && <InputLabel paddingLeft={2}>{label}</InputLabel>}
                    {!!start && (
                      <TextInputFocusVariantContext.Provider value={focusedVariant}>
                        {inaccessibleStart}
                      </TextInputFocusVariantContext.Provider>
                    )}
                  </HStack>
                </Pressable>
              </Box>
            )
          }
          variant={variant}
          width={width}
        />
      );
    },
  ),
);
