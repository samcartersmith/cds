import { useSpectrum } from '@cbhq/cds-common';
import { TextInputBaseProps } from '@cbhq/cds-common/types/TextInputBaseProps';
import React, { useState, memo } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { useInputVariant } from '@cbhq/cds-common/hooks/useInputVariant';
import { useInputLabelColor } from '@cbhq/cds-common/hooks/useInputLabelColor';
import { DefaultInput } from './DefaultInput';
import { MessageArea } from './MessageArea';

import { Input } from './Input';

import { Box } from '../layout/Box';
import { usePalette } from '../hooks/usePalette';
import { InputLabel } from './InputLabel';
import { useInputBorderStyle, useInputTextStyles } from '../hooks/useInputStyles';
import { useSpacingStyles } from '../hooks/useSpacingStyles';

export type BetaTextInputProps = TextInputBaseProps & RNTextInputProps;

export const BetaTextInput = memo(
  ({
    label,
    description = '',
    variant = 'foregroundMuted',
    testID,
    startContent,
    endContent,
    width = '100%',
    disabled = false,
    textAlignInput = 'left',
    textAlignDescription = 'left',
    ...editableInputProps
  }: BetaTextInputProps) => {
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

    const editableInput = (
      <RNTextInput
        style={[inputTextStyle, { flex: 2, textAlign: textAlignInput }]}
        editable={!disabled}
        placeholderTextColor={palette.foregroundMuted}
        keyboardAppearance={spectrum}
        {...editableInputAddonProps}
      />
    );

    /**
     * If startContent exist, the padding
     * between input area and icon should be 0.5 (4px).
     * This is not the case when there is no startContent.
     * In normal circumnstances, spacing horizontal should be 2 (16px)
     */
    const startSpacing = useSpacingStyles({
      spacingStart: 0.5,
    });

    /** Default Input Content */
    const defaultInput = (
      <DefaultInput
        editableInput={editableInput}
        containerSpacing={startContent ? startSpacing : {}}
      />
    );

    return (
      <Input
        testID={testID}
        width={width}
        disabled={disabled}
        variant={variantWithFocus}
        borderStyle={inputBorderStyle}
        input={defaultInput}
        messageArea={
          !!description && (
            <MessageArea color={variant} message={description} textAlign={textAlignDescription} />
          )
        }
        label={<InputLabel label={label} labelColor={labelColorWithFocus} />}
        startContent={
          !!startContent && (
            <Box justifyContent="center" spacingStart={1}>
              {startContent}
            </Box>
          )
        }
        endContent={
          !!endContent && (
            <Box justifyContent="center" spacingEnd={2}>
              {endContent}
            </Box>
          )
        }
      />
    );
  },
);
