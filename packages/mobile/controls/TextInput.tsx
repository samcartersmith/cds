import React, { ForwardedRef, forwardRef, memo, useCallback, useRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  TextInput as RNTextInput,
  TextInputFocusEventData,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { useInputVariant } from '@cbhq/cds-common/hooks/useInputVariant';
import { useMergedRef } from '@cbhq/cds-common/hooks/useMergedRef';
import { DimensionValue } from '@cbhq/cds-common/types/DimensionStyles';
import { SharedAccessibilityProps } from '@cbhq/cds-common/types/SharedAccessibilityProps';
import { TextInputBaseProps } from '@cbhq/cds-common/types/TextInputBaseProps';

import { useInputBorderStyle } from '../hooks/useInputBorderStyle';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { TextLabel1 } from '../typography/TextLabel1';

import { TextInputFocusVariantContext } from './context';
import { HelperText } from './HelperText';
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
} & TextInputBaseProps &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > &
  Omit<RNTextInputProps, 'value' | 'onChange' | 'onChangeText'>;

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
        ...editableInputProps
      }: TextInputProps,
      ref: ForwardedRef<RNTextInput>,
    ) => {
      const [focused, setFocused] = useState(false);
      const focusedVariant = useInputVariant(focused, variant);
      const internalRef = useRef<RNTextInput>(null);
      const refs = useMergedRef(ref, internalRef);
      const { borderFocusedStyle, borderUnfocusedStyle } = useInputBorderStyle(
        focused,
        variant,
        focusedVariant,
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
       * In normal circumnstances, spacing horizontal should be 2 (16px)
       */
      const startSpacing = useSpacingStyles({
        spacingStart: 0.5,
      });

      return (
        <InputStack
          width={width}
          borderRadius={borderRadius}
          disabled={disabled}
          variant={focusedVariant}
          borderStyle={borderUnfocusedStyle}
          borderFocusedStyle={borderFocusedStyle}
          focused={focused}
          enableColorSurge={enableColorSurge}
          inputNode={
            <NativeInput
              containerSpacing={start ? startSpacing : {}}
              align={align}
              ref={refs}
              accessibilityLabel={accessibilityLabel}
              accessibilityHint={accessibilityLabel}
              disabled={disabled}
              compact={compact}
              testID={testID}
              {...editableInputAddonProps}
            />
          }
          helperTextNode={
            !!helperText && (
              <HelperText testID={testIDMap?.helperText ?? ''} color={variant} align={align}>
                {helperText}
              </HelperText>
            )
          }
          labelNode={
            !compact && !!label && <InputLabel testID={testIDMap?.label ?? ''}>{label}</InputLabel>
          }
          startNode={
            (compact || !!start) && (
              <Box justifyContent="center" alignItems="center" testID={testIDMap?.start}>
                <Pressable accessibilityRole="button" disabled={disabled} onPress={handleNodePress}>
                  <HStack>
                    {compact && !!label && <InputLabel spacingStart={2}>{label}</InputLabel>}
                    {!!start && (
                      <TextInputFocusVariantContext.Provider value={focusedVariant}>
                        {start}
                      </TextInputFocusVariantContext.Provider>
                    )}
                  </HStack>
                </Pressable>
              </Box>
            )
          }
          endNode={
            (suffix !== '' || !!end) && (
              <HStack
                justifyContent="center"
                alignItems="center"
                gap={2}
                testID={testIDMap?.end ?? ''}
              >
                <Pressable accessibilityRole="button" disabled={disabled} onPress={handleNodePress}>
                  <HStack>
                    {suffix !== '' && (
                      <TextLabel1 spacingEnd={2} color="foregroundMuted">
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
        />
      );
    },
  ),
);
