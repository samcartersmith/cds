import { TextInputBaseProps } from '@cbhq/cds-common/types/TextInputBaseProps';
import { ForwardedRef } from '@cbhq/cds-common/types/ForwardedRef';
import React, { useCallback, useState, memo, forwardRef, useRef } from 'react';

import { useInputVariant } from '@cbhq/cds-common/hooks/useInputVariant';

import { useMergedRef } from '@cbhq/cds-common/hooks/useMergedRef';
import { TextLabel1 } from '../typography';
import { NativeInput } from './NativeInput';
import { HelperText } from './HelperText';

import { InputStack } from './InputStack';

import { HStack } from '../layout/HStack';
import { InputLabel } from './InputLabel';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { TextInputFocusVariantContext } from './context';
import { useA11yId } from '../hooks/useA11yId';

export type TextInputProps = {
  /**
   * Callback fired when pressed/clicked
   */
  onPress?: React.MouseEventHandler;
} & TextInputBaseProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'width'>;

export const TextInput = memo(
  forwardRef(function TextInput(
    {
      label,
      accessibilityLabel,
      helperText = '',
      variant = 'foregroundMuted',
      testID,
      start,
      end,
      width = '100%',
      disabled = false,
      align = 'start',
      compact = false,
      suffix = '',
      onFocus,
      onBlur,
      borderRadius = 'input',
      height,
      ...htmlInputElmProps
    }: TextInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) {
    const [focused, setFocused] = useState(false);
    const focusedVariant = useInputVariant(focused, variant);
    const internalRef = useRef<HTMLInputElement>();
    const refs = useMergedRef(ref, internalRef);
    const helperTextId = useA11yId('cds-textinput-description-');

    const handleOnFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        onFocus?.(e);
      },
      [onFocus],
    );

    const handleOnBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.(e);
        setFocused(false);
      },
      [onBlur],
    );

    const handleNodePress = useCallback(() => {
      setFocused(true);
      internalRef.current?.focus();
    }, [setFocused, internalRef]);

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
      <TextInputFocusVariantContext.Provider value={focused ? focusedVariant : undefined}>
        <InputStack
          testID={testID}
          width={width}
          disabled={disabled}
          variant={variant}
          borderRadius={borderRadius}
          height={height}
          inputNode={
            <NativeInput
              align={align}
              accessibilityLabel={accessibilityLabel ?? label}
              accessibilityHint={helperTextId}
              containerSpacing={start ? startSpacing : undefined}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              disabled={disabled}
              compact={compact}
              ref={refs}
              {...htmlInputElmProps}
            />
          }
          helperTextNode={
            !!helperText && (
              <HelperText
                color={variant}
                align={align}
                accessibilityLabel={helperText}
                id={helperTextId}
              >
                {helperText}
              </HelperText>
            )
          }
          labelNode={!compact && !!label && <InputLabel>{label}</InputLabel>}
          startNode={
            (compact || !!start) && (
              <HStack onClick={handleNodePress} alignItems="center" justifyContent="center" gap={2}>
                {compact && !!label && <InputLabel spacingStart={2}>{label}</InputLabel>}
                {!!start && <>{start}</>}
              </HStack>
            )
          }
          endNode={
            (suffix !== '' || !!end) && (
              <HStack onClick={handleNodePress} alignItems="center" justifyContent="center" gap={2}>
                {suffix !== '' && (
                  <TextLabel1 spacingEnd={2} as="p" color="foregroundMuted">
                    {suffix}
                  </TextLabel1>
                )}
                {!!end && <>{end}</>}
              </HStack>
            )
          }
        />
      </TextInputFocusVariantContext.Provider>
    );
  }),
);
