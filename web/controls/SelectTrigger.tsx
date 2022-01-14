import React, { RefObject, ForwardedRef, MouseEvent, forwardRef, memo } from 'react';
import { InputVariant, SelectBaseProps } from '@cbhq/cds-common';
import { css } from 'linaria';
import { InputStack } from './InputStack';
import { InputLabel } from './InputLabel';
import { HStack } from '../layout/HStack';
import { PressableOpacity } from '../system';
import { TextBody } from '../typography/TextBody';
import { InputIcon } from './InputIcon';
import { HelperText } from './HelperText';

export type SelectTriggerProps = {
  rotateAnimationRef: RefObject<HTMLDivElement>;
  ref: ForwardedRef<HTMLButtonElement>;
  onSelectPress: (event: MouseEvent<HTMLElement>) => void;
  triggerRef: RefObject<HTMLButtonElement>;
  hasFocus: boolean;
  /** ID used to show the relationship between the Select label (if present) and the PopoverMenu */
  accessibilityLabelId?: string;
} & Omit<SelectBaseProps, 'children' | 'onPress'>;

const pressableOverrides = css`
  /* stylelint-disable a11y/content-property-no-static-value */
  &.focus-visible {
    &::before {
      content: none;
    }
  }
  /* stylelint-enable a11y/content-property-no-static-value */
`;

export const SelectTrigger = memo(
  forwardRef(
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
        onSelectPress,
        triggerRef,
        accessibilityLabel,
        hasFocus,
        accessibilityLabelId,
      }: SelectTriggerProps,
      ref: ForwardedRef<HTMLButtonElement>,
    ) => {
      const labelTextColor: InputVariant = 'foreground';
      return (
        <InputStack
          width={width}
          disabled={disabled}
          variant={variant}
          ref={ref}
          focused={hasFocus}
          inputNode={
            <HStack width="100%">
              {compact && (
                <HStack maxWidth="40%">
                  <HStack spacingStart={2} spacingEnd={1} alignItems="center" minWidth={0}>
                    <InputLabel color={labelTextColor} disabled={disabled} overflow="truncate">
                      {label}
                    </InputLabel>
                  </HStack>
                </HStack>
              )}
              <PressableOpacity
                width="100%"
                noScaleOnPress
                ref={triggerRef}
                onPress={onSelectPress}
                testID={testID}
                accessibilityLabel={accessibilityLabel}
                className={pressableOverrides}
              >
                <HStack
                  alignItems="center"
                  borderRadius="standard"
                  justifyContent="space-between"
                  spacingStart={compact ? 0 : 2}
                  spacingVertical={compact ? 1 : 2}
                >
                  <HStack flexGrow={1} minWidth={0}>
                    <TextBody
                      as="p"
                      color={value ? 'foreground' : 'foregroundMuted'}
                      disabled={disabled}
                      overflow="truncate"
                    >
                      {value ?? placeholder ?? (!compact && label)}
                    </TextBody>
                  </HStack>
                  <HStack alignItems="center">
                    <InputIcon
                      ref={rotateAnimationRef}
                      name="caretDown"
                      color={hasFocus ? 'primary' : variant}
                    />
                  </HStack>
                </HStack>
              </PressableOpacity>
            </HStack>
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
              <InputLabel
                overflow="truncate"
                color={labelTextColor}
                disabled={disabled}
                id={accessibilityLabelId}
              >
                {label}
              </InputLabel>
            )
          }
        />
      );
    },
  ),
);
