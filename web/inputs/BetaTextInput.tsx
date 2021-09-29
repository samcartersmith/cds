import { TextInputBaseProps } from '@cbhq/cds-common/types/TextInputBaseProps';
import React, { useCallback, useState, memo } from 'react';

import { useInputVariant } from '@cbhq/cds-common/hooks/useInputVariant';
import { useInputLabelColor } from '@cbhq/cds-common/hooks/useInputLabelColor';

import { TextLabel1 } from '../typography';
import { NativeInput } from './NativeInput';
import { HelperText } from './HelperText';

import { Input } from './Input';

import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { InputLabel } from './InputLabel';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { useInputBorderStyle } from '../hooks/useInputBorderStyle';

export type BetaTextInputProps = TextInputBaseProps & React.InputHTMLAttributes<HTMLInputElement>;

export const BetaTextInput = memo(function BetaTextInput({
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
  compact = false,
  suffix = '',
  onFocus,
  onBlur,
  ...htmlInputElmProps
}: BetaTextInputProps) {
  const [focused, setFocused] = useState(false);
  const variantWithFocus = useInputVariant(focused, variant);
  const labelColor = useInputLabelColor(variant);
  const inputBorderStyle = useInputBorderStyle(focused);

  const handleOnFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      onFocus?.(e);
      setFocused(true);
    },
    [setFocused, onFocus],
  );

  const handleOnBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
      setFocused(false);
    },
    [setFocused, onBlur],
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

  return (
    <Input
      testID={testID}
      width={width}
      disabled={disabled}
      borderStyle={inputBorderStyle}
      variant={variantWithFocus}
      input={
        <NativeInput
          align={textAlignInput}
          containerSpacing={startContent ? startSpacing : ''}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          disabled={disabled}
          {...htmlInputElmProps}
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
          <Box justifyContent="center" alignItems="center" spacingStart={2}>
            {compact && <InputLabel color={labelColor}>{label}</InputLabel>}
            {!!startContent && <>{startContent}</>}
          </Box>
        )
      }
      endContent={
        (suffix !== '' || !!endContent) && (
          <HStack justifyContent="center" alignItems="center" gap={2} spacingEnd={2}>
            {suffix !== '' && (
              <TextLabel1 as="p" color="foregroundMuted">
                {suffix}
              </TextLabel1>
            )}
            {!!endContent && <>{endContent}</>}
          </HStack>
        )
      }
    />
  );
});
