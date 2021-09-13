import { PaletteForeground, SharedProps, useSpectrum } from '@cbhq/cds-common';
import React, { useState, memo } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { TextBody } from '../typography';

import { Input } from './Input';

import { usePalette } from '../hooks/usePalette';
import { CompactInput } from './CompactInput';
import { useInputBorderStyle, useInputTextStyles, useInputVariant } from '../hooks/useInputStyles';

export type BetaCompactTextInputProps = {
  /** A message indicating the purpose of this input */
  label: string;
  /**
   * Additional information about input
   */
  description?: string;
  /**
   * Denotes the color of the label, and border.
   * The startContent and endContent will not change colors according
   * to the variant.
   * @default foregroundMuted
   */
  variant?: PaletteForeground;
  /**
   * Width of text input
   * @default 100%
   */
  width?: string | number;
  /**
   * Disable user interaction
   * @default false
   */
  disabled?: boolean;
} & RNTextInputProps &
  SharedProps;

export const BetaCompactTextInput = memo(
  ({
    label,
    description = '',
    variant = 'foregroundMuted',
    testID,
    width = '100%',
    disabled = false,
    ...editableInputProps
  }: BetaCompactTextInputProps) => {
    const palette = usePalette();
    const [focused, setFocused] = useState(false);
    const inputTextStyle = useInputTextStyles('foreground');
    const variantWithFocus = useInputVariant(focused, variant);
    const inputBorderStyle = useInputBorderStyle(focused);
    const spectrum = useSpectrum();

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

    /** Compact Input Content */
    const compactInput = (
      <CompactInput
        inputLabel={<TextBody color={variantWithFocus}>{label}</TextBody>}
        editableInput={
          <RNTextInput
            style={[
              inputTextStyle,
              {
                textAlign: 'right',
              },
            ]}
            editable={!disabled}
            keyboardAppearance={spectrum}
            placeholderTextColor={palette.foregroundMuted}
            {...editableInputAddonProps}
          />
        }
      />
    );

    return (
      <Input
        testID={testID}
        width={width}
        disabled={disabled}
        variant={variantWithFocus}
        borderStyle={inputBorderStyle}
        input={compactInput}
        messageArea={!!description && <TextBody color={variantWithFocus}>{description}</TextBody>}
      />
    );
  },
);
