import { TextFieldBaseProps } from '@cbhq/cds-common/types/TextFieldBaseProps';
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

import { InputStack } from '../layout/InputStack';

import { Box } from '../layout/Box';
import { InputLabel } from './InputLabel';
import { useInputBorderStyle } from '../hooks/useInputStyles';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { HStack } from '../layout/HStack';
import { TextLabel1 } from '../typography/TextLabel1';

export type BetaTextFieldProps = TextFieldBaseProps & RNTextInputProps;

export const BetaTextField = memo(
  ({
    label,
    helperText = '',
    variant = 'foregroundMuted',
    testID,
    start,
    end,
    width = 100,
    disabled = false,
    align = 'start',
    compact,
    suffix = '',
    ...editableInputProps
  }: BetaTextFieldProps) => {
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
      <InputStack
        testID={testID}
        width={width}
        disabled={disabled}
        variant={variantWithFocus}
        borderStyle={inputBorderStyle}
        inputNode={
          <NativeInput
            containerSpacing={start ? startSpacing : {}}
            align={align}
            disabled={disabled}
            {...editableInputAddonProps}
          />
        }
        helperTextNode={
          !!helperText && (
            <HelperText color={variant} align={align}>
              {helperText}
            </HelperText>
          )
        }
        labelNode={
          !compact && (
            <InputLabel disabled={disabled} color={labelColor}>
              {label}
            </InputLabel>
          )
        }
        startNode={
          (compact || !!start) && (
            <Box justifyContent="center" alignItems="center" spacingStart={1}>
              {compact && (
                <InputLabel disabled={disabled} color={labelColor}>
                  {label}
                </InputLabel>
              )}
              {!!start && <>{start}</>}
            </Box>
          )
        }
        endNode={
          (suffix !== '' || !!end) && (
            <HStack justifyContent="center" alignItems="center" gap={2} spacingEnd={2}>
              {suffix !== '' && <TextLabel1 color="foregroundMuted">{suffix}</TextLabel1>}
              {!!end && <>{end}</>}
            </HStack>
          )
        }
      />
    );
  },
);
