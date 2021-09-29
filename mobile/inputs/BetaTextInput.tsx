import { TextInputBaseProps } from '@cbhq/cds-common/types/TextInputBaseProps';
import React, { useState, memo } from 'react';
import {
  TextInputProps as RNTextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { useInputVariant } from '@cbhq/cds-common/hooks/useInputVariant';
import { useInputLabelColor } from '@cbhq/cds-common/hooks/useInputLabelColor';
import { NativeInput } from './NativeInput';
import { HelperText } from './HelperText';

import { Input } from './Input';

import { Box } from '../layout/Box';
import { InputLabel } from './InputLabel';
import { useInputBorderStyle } from '../hooks/useInputStyles';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { HStack } from '../layout/HStack';
import { TextLabel1 } from '../typography/TextLabel1';

export type BetaTextInputProps = TextInputBaseProps & RNTextInputProps;

export const BetaTextInput = memo(
  ({
    label,
    helperText = '',
    variant = 'foregroundMuted',
    testID,
    startContent,
    endContent,
    width = '100%',
    disabled = false,
    textAlignInput = 'start',
    textAlignHelperText = 'start',
    compact,
    suffix = '',
    ...editableInputProps
  }: BetaTextInputProps) => {
    const [focused, setFocused] = useState(false);
    const variantWithFocus = useInputVariant(focused, variant);
    const labelColor = useInputLabelColor(variant);
    const inputBorderStyle = useInputBorderStyle(focused);

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
      <Input
        testID={testID}
        width={width}
        disabled={disabled}
        variant={variantWithFocus}
        borderStyle={inputBorderStyle}
        input={
          <NativeInput
            containerSpacing={startContent ? startSpacing : {}}
            align={textAlignInput}
            disabled={disabled}
            {...editableInputAddonProps}
          />
        }
        helperText={
          !!helperText && (
            <HelperText color={variant} align={textAlignHelperText}>
              {helperText}
            </HelperText>
          )
        }
        label={!compact && <InputLabel color={labelColor}>{label}</InputLabel>}
        startContent={
          (compact || !!startContent) && (
            <Box justifyContent="center" alignItems="center" spacingStart={1}>
              {compact && <InputLabel color={labelColor}>{label}</InputLabel>}
              {!!startContent && <>{startContent}</>}
            </Box>
          )
        }
        endContent={
          (suffix !== '' || !!endContent) && (
            <HStack justifyContent="center" alignItems="center" gap={2} spacingEnd={2}>
              {suffix !== '' && <TextLabel1 color="foregroundMuted">{suffix}</TextLabel1>}
              {!!endContent && <>{endContent}</>}
            </HStack>
          )
        }
      />
    );
  },
);
