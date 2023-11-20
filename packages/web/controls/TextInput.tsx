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
import { usePrefixedId } from '@cbhq/cds-common/hooks/usePrefixedId';
import { ForwardedRef } from '@cbhq/cds-common/types/ForwardedRef';
import { TextInputBaseProps } from '@cbhq/cds-common/types/TextInputBaseProps';

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
    const shouldSetHelperTextId = useMemo(() => helperText !== '', [helperText]);
    const shouldSetLabelId = label !== undefined;
    const [helperTextId, labelId] = usePrefixedId([
      'cds-textinput-description',
      'cds-textinput-label',
    ]);

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
     * In normal circumstances, spacing horizontal should be 2 (16px)
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
          'aria-describedby': shouldSetHelperTextId && helperTextId,
          'aria-invalid': hasError,
          id: shouldSetLabelId ? labelId : undefined,
          disabled,
        });

        return clonedElm;
      }

      // By default, it will use the NativeInput
      return (
        <NativeInput
          ref={refs}
          accessibilityHint={shouldSetHelperTextId ? helperTextId : undefined}
          accessibilityLabel={accessibilityLabel ?? label}
          align={align}
          aria-invalid={hasError}
          compact={compact}
          containerSpacing={start ? startSpacing : undefined}
          disabled={disabled}
          id={shouldSetLabelId ? labelId : undefined}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          testID={testID}
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
      shouldSetHelperTextId,
      shouldSetLabelId,
      labelId,
    ]);

    return (
      <TextInputFocusVariantContext.Provider value={focused ? focusedVariant : undefined}>
        <InputStack
          borderRadius={borderRadius}
          borderWidth={bordered ? 'input' : 'none'}
          disableFocusedStyle={!bordered}
          disabled={disabled}
          enableColorSurge={enableColorSurge}
          endNode={
            (suffix !== '' || !!end) && (
              <HStack
                alignItems="center"
                gap={2}
                justifyContent="center"
                onClick={handleNodePress}
                testID={testIDMap?.end ?? ''}
              >
                {suffix !== '' && (
                  <TextLabel1 as="p" color="foregroundMuted" spacingEnd={2}>
                    {suffix}
                  </TextLabel1>
                )}
                {!!end && <>{end}</>}
              </HStack>
            )
          }
          focused={focused}
          // If bordered is true, we want disableFocusedStyle = false
          // If bordered is false, we want disableFocusedStyle = true
          height={height}
          helperTextNode={
            !!helperText && (
              <HelperText
                accessibilityLabel={helperText}
                align={align}
                color={variant}
                id={shouldSetHelperTextId ? helperTextId : undefined}
                testID={testIDMap?.helperText ?? ''}
              >
                {helperText}
              </HelperText>
            )
          }
          inputNode={inputNodeCloned}
          labelNode={
            !compact &&
            !!label && (
              <InputLabel
                htmlFor={shouldSetLabelId ? labelId : undefined}
                testID={testIDMap?.label ?? ''}
              >
                {label}
              </InputLabel>
            )
          }
          startNode={
            (compact || !!start) && (
              <HStack
                alignItems="center"
                gap={2}
                justifyContent="center"
                onClick={handleNodePress}
                testID={testIDMap?.start ?? ''}
              >
                {compact && !!label && (
                  <InputLabel htmlFor={shouldSetLabelId ? labelId : undefined} spacingStart={2}>
                    {label}
                  </InputLabel>
                )}
                {!!start && <>{start}</>}
              </HStack>
            )
          }
          variant={variant}
          width={width}
        />
      </TextInputFocusVariantContext.Provider>
    );
  }),
);
