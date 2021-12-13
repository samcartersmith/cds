import React, { RefObject, ForwardedRef, MouseEvent, forwardRef } from 'react';
import { InputVariant, SelectInputBaseProps } from '@cbhq/cds-common';
import { InputStack } from './InputStack';
import { InputLabel } from './InputLabel';
import { HStack } from '../layout/HStack';
import { PressableOpacity } from '../system';
import { TextBody } from '../typography/TextBody';
import { InputIcon } from './InputIcon';
import { HelperText } from './HelperText';

export type SelectInputTriggerProps = {
  rotateAnimationRef: RefObject<HTMLDivElement>;
  ref: ForwardedRef<HTMLButtonElement>;
  onSelectInputPress: (event: MouseEvent<HTMLElement>) => void;
  triggerRef: RefObject<HTMLButtonElement>;
  labelTextColor: InputVariant;
} & Omit<SelectInputBaseProps, 'children' | 'onPress'>;

export const SelectInputTrigger = forwardRef(
  (
    {
      compact,
      placeholder,
      disabled,
      label,
      helperText,
      rotateAnimationRef,
      value,
      testID,
      variant,
      width,
      onSelectInputPress,
      triggerRef,
      accessibilityLabel,
      labelTextColor,
    }: SelectInputTriggerProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <InputStack
        width={width}
        disabled={disabled}
        variant={variant}
        ref={ref}
        startNode={
          compact && (
            <HStack spacingStart={compact ? 1 : 2} alignItems="center">
              <InputLabel color={labelTextColor} disabled={disabled}>
                {label}
              </InputLabel>
            </HStack>
          )
        }
        inputNode={
          <PressableOpacity
            width="100%"
            noScaleOnPress
            ref={triggerRef}
            onPress={onSelectInputPress}
            testID={testID}
            accessibilityLabel={accessibilityLabel}
          >
            <HStack
              alignItems="center"
              borderRadius="standard"
              justifyContent="space-between"
              spacingStart={compact ? 1 : 2}
              spacingVertical={compact ? 1 : 2}
            >
              <HStack flexGrow={1}>
                <TextBody as="p" color="foregroundMuted" disabled={disabled} overflow="truncate">
                  {value ?? placeholder ?? (!compact && label)}
                </TextBody>
              </HStack>
              <HStack alignItems="center">
                <InputIcon ref={rotateAnimationRef} name="caretDown" />
              </HStack>
            </HStack>
          </PressableOpacity>
        }
        helperTextNode={
          Boolean(helperText) && (
            <HelperText overflow="truncate" color={variant ?? 'foregroundMuted'}>
              {helperText}
            </HelperText>
          )
        }
        labelNode={
          !compact &&
          Boolean(label) && (
            <InputLabel overflow="truncate" color={labelTextColor} disabled={disabled}>
              {label}
            </InputLabel>
          )
        }
      />
    );
  },
);
