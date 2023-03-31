/* eslint-disable react/jsx-no-useless-fragment */
import React, {
  cloneElement,
  forwardRef,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useInputVariant } from '@cbhq/cds-common/hooks/useInputVariant';
import { useMergedRef } from '@cbhq/cds-common/hooks/useMergedRef';
import { ForwardedRef } from '@cbhq/cds-common/types/ForwardedRef';
import { TextInputBaseProps } from '@cbhq/cds-common/types/TextInputBaseProps';

import { useA11yId } from '../hooks/useA11yId';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { HStack } from '../layout/HStack';
import { TextLabel1 } from '../typography';

import { TextInputFocusVariantContext } from './context';
import { HelperText } from './HelperText';
import { InputLabel } from './InputLabel';
import { InputStack } from './InputStack';
import { NativeInput } from './NativeInput';

export type TextInputProps = {
  /**
   * Callback fired when pressed/clicked
   */
  onPress?: React.MouseEventHandler;
  /**
   * Customize the element which the input area will be rendered as. Adds ability to render the input area
   * as a `<textarea />`, `<input />` etc...
   * By default, the input area will be rendered as an `<input />`.
   * @danger Use this at your own risk, and don't use unless ABSOLUTELY NECESSARY. You may see weird UI when focusing etc..
   * Our default input handles all of the UI/Accessibility needs for your out of the box, but inputNode will not include
   * those.
   * */
  inputNode?: React.ReactElement;
  /**
   * Adds border to input
   * @default true
   */
  bordered?: boolean;
  value?: React.InputHTMLAttributes<HTMLInputElement>['value'];
  onChange?: React.InputHTMLAttributes<HTMLInputElement>['onChange'];
} & TextInputBaseProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'width' | 'value' | 'onChange'>;

export const TextInput = memo(
  forwardRef(function TextInput(
    {
      label,
      accessibilityLabel,
      helperText = '',
      variant = 'foregroundMuted',
      testID,
      testIDMap,
      start,
      end,
      width = '100%',
      disabled = false,
      align = 'start',
      compact = false,
      suffix = '',
      onFocus,
      onBlur,
      borderRadius = 'rounded',
      height,
      inputNode,
      bordered = true,
      enableColorSurge = false,
      ...htmlInputElmProps
    }: TextInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) {
    const [focused, setFocused] = useState(false);
    const focusedVariant = useInputVariant(focused, variant);
    const internalRef = useRef<HTMLInputElement>();
    const refs = useMergedRef(ref, internalRef);

    // Only generate a helperTextId if helperText is defined, otherwise
    // set it to undefined
    const helperTextId = useA11yId({
      prefix: 'cds-textinput-description-',
      shouldNotGenerate: helperText === '',
    });

    const labelId = useA11yId({
      prefix: 'cds-textinput-label-',
      shouldNotGenerate: label === undefined,
    });

    // TODO surface this as a prop
    const hasError = variant === 'negative';

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
      spacingVertical: compact ? 1 : 2,
      spacingStart: 0.5,
      spacingEnd: compact ? 1 : 2,
    });

    const inputNodeCloned = useMemo(() => {
      /** Ensures that the renderedInput has the blurring, focusing, disabled features */
      if (inputNode) {
        const clonedElm = cloneElement(inputNode, {
          onFocus: handleOnFocus,
          onBlur: handleOnBlur,
          ref: refs,
          'aria-describedby': helperTextId,
          'aria-invalid': hasError,
          id: labelId,
          disabled,
        });

        return clonedElm;
      }

      // By default, it will use the NativeInput
      return (
        <NativeInput
          align={align}
          accessibilityLabel={accessibilityLabel ?? label}
          accessibilityHint={helperTextId}
          containerSpacing={start ? startSpacing : undefined}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          disabled={disabled}
          compact={compact}
          testID={testID}
          ref={refs}
          id={label}
          aria-invalid={hasError}
          {...htmlInputElmProps}
        />
      );
    }, [
      inputNode,
      align,
      accessibilityLabel,
      label,
      helperTextId,
      start,
      startSpacing,
      handleOnFocus,
      handleOnBlur,
      disabled,
      compact,
      testID,
      refs,
      hasError,
      htmlInputElmProps,
      labelId,
    ]);

    return (
      <TextInputFocusVariantContext.Provider value={focused ? focusedVariant : undefined}>
        <InputStack
          width={width}
          disabled={disabled}
          variant={variant}
          borderRadius={borderRadius}
          height={height}
          borderWidth={bordered ? 'input' : 'none'}
          focused={focused}
          // If bordered is true, we want disableFocusedStyle = false
          // If bordered is false, we want disableFocusedStyle = true
          disableFocusedStyle={!bordered}
          enableColorSurge={enableColorSurge}
          labelNode={
            !compact &&
            !!label && (
              <InputLabel testID={testIDMap?.label ?? ''} htmlFor={labelId}>
                {label}
              </InputLabel>
            )
          }
          inputNode={inputNodeCloned}
          helperTextNode={
            !!helperText && (
              <HelperText
                testID={testIDMap?.helperText ?? ''}
                color={variant}
                align={align}
                accessibilityLabel={helperText}
                id={helperTextId}
              >
                {helperText}
              </HelperText>
            )
          }
          startNode={
            (compact || !!start) && (
              <HStack
                testID={testIDMap?.start ?? ''}
                onClick={handleNodePress}
                alignItems="center"
                justifyContent="center"
                gap={2}
              >
                {compact && !!label && (
                  <InputLabel htmlFor={labelId} spacingStart={2}>
                    {label}
                  </InputLabel>
                )}
                {!!start && <>{start}</>}
              </HStack>
            )
          }
          endNode={
            (suffix !== '' || !!end) && (
              <HStack
                testID={testIDMap?.end ?? ''}
                onClick={handleNodePress}
                alignItems="center"
                justifyContent="center"
                gap={2}
              >
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
