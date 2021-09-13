import { PaletteForeground, SharedProps, useSpectrum } from '@cbhq/cds-common';
import React, { useState, memo } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { DefaultInput } from './DefaultInput';
import { TextBody } from '../typography';

import { Input } from './Input';

import { Box } from '../layout/Box';
import { usePalette } from '../hooks/usePalette';
import { InputLabel } from './InputLabel';
import { useInputBorderStyle, useInputTextStyles, useInputVariant } from '../hooks/useInputStyles';

export type BetaTextInputProps = {
  /** Short description indicating purpose of input */
  label: string;
  /**
   * For cases where label is not enough information
   * to describe what the text input is for. Can also be used for
   * showing positive/negative messages
   */
  description?: string;
  /**
   * Unchangeable text added to the start of editable input area.
   * Typography will be a TextBody and the text color will be foregroundMuted
   * @beta
   */
  prefix?: string;
  /**
   * Unchangeable text added to the end of editable input area.
   * Typography will be a TextBody and the text color will be foregroundMuted
   * @beta
   */
  suffix?: string;
  /**
   * Denotes the color of the label text, and the border. Because
   * we allow startContent and endContent to be custom ReactNode,
   * the content placed inside these slots will not change colors according
   * to the variant. You will have to add that yourself
   * @default foregroundMuted
   */
  variant?: PaletteForeground;
  /**
   * React element to be added at the start of Editable Input area.
   * This content will live inside the borders of the Text Input.
   */
  startContent?: React.ReactNode;
  /**
   * React element to be added at the end of the Editable Input area.
   * This content will live inside the borders of the Text Input.
   */
  endContent?: React.ReactNode;
  /**
   * Width of text input. Can be a percentage or a pixel value
   * @default 100%
   */
  width?: string | number;
  /**
   * Toggles whether the Text Input is interactable or not
   * @default false
   */
  disabled?: boolean;
} & RNTextInputProps &
  SharedProps;

export const BetaTextInput = memo(
  ({
    label,
    description = '',
    prefix = '',
    suffix = '',
    variant = 'foregroundMuted',
    testID,
    startContent,
    endContent,
    width = '100%',
    disabled = false,
    ...editableInputProps
  }: BetaTextInputProps) => {
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

    const editableInput = (
      <RNTextInput
        style={[inputTextStyle, { flex: 2 }]}
        editable={!disabled}
        placeholderTextColor={palette.foregroundMuted}
        keyboardAppearance={spectrum}
        {...editableInputAddonProps}
      />
    );

    /** Default Input Content */
    const defaultInput = (
      <DefaultInput
        editableInput={editableInput}
        suffix={
          !!suffix && (
            <RNTextInput
              style={[inputTextStyle, { color: palette.foregroundMuted }]}
              value={suffix}
              editable={false}
            />
          )
        }
        prefix={
          !!prefix && (
            <RNTextInput
              style={[inputTextStyle, { color: palette.foregroundMuted }]}
              value={prefix}
              editable={false}
            />
          )
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
        input={defaultInput}
        messageArea={!!description && <TextBody color={variantWithFocus}>{description}</TextBody>}
        label={<InputLabel label={label} labelColor={variantWithFocus} />}
        startContent={
          !!startContent && (
            <Box justifyContent="center" spacingStart={1}>
              {startContent}
            </Box>
          )
        }
        endContent={
          !!endContent && (
            <Box justifyContent="center" spacingEnd={1}>
              {endContent}
            </Box>
          )
        }
      />
    );
  },
);
