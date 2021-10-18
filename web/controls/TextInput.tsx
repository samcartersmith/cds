import { TextInputBaseProps } from '@cbhq/cds-common/types/TextInputBaseProps';
import React, { useCallback, useState, memo } from 'react';

import { useInputVariant } from '@cbhq/cds-common/hooks/useInputVariant';

import { TextLabel1 } from '../typography';
import { NativeInput } from './NativeInput';
import { HelperText } from './HelperText';

import { InputStack } from './InputStack';

import { HStack } from '../layout/HStack';
import { InputLabel } from './InputLabel';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { useInputBorderStyle } from '../hooks/useInputBorderStyle';

export type TextInputProps = TextInputBaseProps & React.InputHTMLAttributes<HTMLInputElement>;

export const TextInput = memo(function TextInput({
  label,
  accessibilityLabel,
  helperText = '',
  variant = 'foregroundMuted',
  testID,
  start,
  end,
  width = 100,
  disabled = false,
  align = 'start',
  compact = false,
  suffix = '',
  onFocus,
  onBlur,
  ...htmlInputElmProps
}: TextInputProps) {
  const [focused, setFocused] = useState(false);
  const variantWithFocus = useInputVariant(focused, variant);
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
   * If start exist, the padding
   * between input area and icon should be 0.5 (4px).
   * This is not the case when there is no start.
   * In normal circumnstances, spacing horizontal should be 2 (16px)
   */
  const startSpacing = useSpacingStyles({
    spacingVertical: 2,
    spacingStart: 0.5,
    spacingEnd: 2,
  });

  return (
    <InputStack
      testID={testID}
      width={width}
      disabled={disabled}
      borderStyle={inputBorderStyle}
      variant={variantWithFocus}
      inputNode={
        <NativeInput
          align={align}
          accessibilityLabel={accessibilityLabel ?? label}
          containerSpacing={start ? startSpacing : undefined}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          disabled={disabled}
          {...htmlInputElmProps}
        />
      }
      helperTextNode={
        !!helperText && (
          <HelperText color={variant} align={align}>
            {helperText}
          </HelperText>
        )
      }
      labelNode={!compact && <InputLabel disabled={disabled}>{label}</InputLabel>}
      startNode={
        (compact || !!start) && (
          <HStack justifyContent="center" alignItems="center" gap={2} spacingStart={2}>
            {compact && <InputLabel>{label}</InputLabel>}
            {!!start && <>{start}</>}
          </HStack>
        )
      }
      endNode={
        (suffix !== '' || !!end) && (
          <HStack justifyContent="center" alignItems="center" gap={2} spacingEnd={2}>
            {suffix !== '' && (
              <TextLabel1 as="p" color="foregroundMuted">
                {suffix}
              </TextLabel1>
            )}
            {!!end && <>{end}</>}
          </HStack>
        )
      }
    />
  );
});
