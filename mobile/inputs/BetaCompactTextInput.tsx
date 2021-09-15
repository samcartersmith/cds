import { useSpectrum } from '@cbhq/cds-common';
import { TextInputBaseProps } from '@cbhq/cds-common/types/TextInputBaseProps';
import React, { useState, memo } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { useInputLabelColor } from '@cbhq/cds-common/hooks/useInputLabelColor';

import { useInputVariant } from '@cbhq/cds-common/hooks/useInputVariant';
import { InputLabel } from './InputLabel';
import { Input } from './Input';

import { usePalette } from '../hooks/usePalette';
import { CompactInput } from './CompactInput';
import { MessageArea } from './MessageArea';
import { useInputBorderStyle, useInputTextStyles } from '../hooks/useInputStyles';

export type BetaCompactTextInputProps = TextInputBaseProps & RNTextInputProps;

export const BetaCompactTextInput = memo(
  ({
    label,
    description = '',
    variant = 'foregroundMuted',
    testID,
    width = '100%',
    disabled = false,
    textAlignDescription,
    ...editableInputProps
  }: BetaCompactTextInputProps) => {
    const palette = usePalette();
    const [focused, setFocused] = useState(false);
    const inputTextStyle = useInputTextStyles('foreground');
    const variantWithFocus = useInputVariant(focused, variant);
    const labelColorWithFocus = useInputLabelColor(focused, variant);
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
        inputLabel={<InputLabel label={label} labelColor={labelColorWithFocus} />}
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
        messageArea={
          !!description && (
            <MessageArea textAlign={textAlignDescription} color={variant} message={description} />
          )
        }
      />
    );
  },
);
