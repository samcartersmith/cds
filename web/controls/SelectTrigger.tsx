import React, { RefObject, forwardRef, memo } from 'react';
import { ForwardedRef, SelectBaseProps } from '@cbhq/cds-common';
import { css } from 'linaria';
import { labelTextColor } from '@cbhq/cds-common/tokens/select';
import { TextBody } from '../typography/TextBody';
import { InputIcon } from './InputIcon';
import { PressableOpacity } from '../system';
import { HStack } from '../layout/HStack';
import { PopoverTrigger, PopoverTriggerProps } from '../overlays/PopoverMenu/PopoverTrigger';
import { InputLabel } from './InputLabel';
import { useA11yId } from '../hooks/useA11yId';
import { SelectStack } from './SelectStack';

export type SelectTriggerProps = {
  rotateAnimationRef: RefObject<HTMLDivElement>;
  triggerHasFocus: boolean;
} & Omit<SelectBaseProps, 'children' | 'focused' | 'width'> &
  Omit<PopoverTriggerProps, 'children' | 'focused'>;

const pressableOverrides = css`
  padding: 0;
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
        rotateAnimationRef,
        value,
        variant,
        triggerHasFocus,
        helperText,
        onPress,
        startNode,
        ...props
      }: SelectTriggerProps,
      ref: ForwardedRef<HTMLElement>,
    ) => {
      const accessibilityLabelId = useA11yId();
      const accessibilityDescriptionId = useA11yId();
      return (
        <SelectStack
          compact={compact}
          label={label}
          helperText={helperText}
          disabled={disabled}
          variant={variant}
          focused={triggerHasFocus}
          ref={ref}
          accessibilityLabelId={accessibilityLabelId}
          accessibilityDescriptionId={accessibilityDescriptionId}
        >
          <PopoverTrigger onPress={onPress}>
            <PressableOpacity
              width="100%"
              noScaleOnPress
              className={pressableOverrides}
              ref={ref}
              {...props}
            >
              <HStack width="100%">
                {!!startNode && (
                  <HStack spacingStart={2} alignItems="center" justifyContent="center" minWidth={0}>
                    {startNode}
                  </HStack>
                )}
                {compact ? (
                  <HStack maxWidth="40%">
                    <HStack spacingStart={2} spacingEnd={1} alignItems="center" minWidth={0}>
                      <InputLabel
                        color={labelTextColor}
                        disabled={disabled}
                        overflow="truncate"
                        id={accessibilityLabelId}
                      >
                        {label}
                      </InputLabel>
                    </HStack>
                  </HStack>
                ) : null}
                <HStack
                  alignItems="center"
                  borderRadius="standard"
                  justifyContent="space-between"
                  spacingStart={compact ? 0 : 2}
                  spacingVertical={compact ? 1 : 2}
                  width="100%"
                >
                  <HStack
                    flexGrow={1}
                    flexShrink={1}
                    minWidth={0}
                    justifyContent={compact ? 'flex-end' : 'flex-start'}
                  >
                    <TextBody
                      as="p"
                      color={value ? 'foreground' : 'foregroundMuted'}
                      disabled={disabled}
                      overflow="truncate"
                      align={compact ? 'end' : 'start'}
                    >
                      {value ?? placeholder ?? (!compact && label)}
                    </TextBody>
                  </HStack>
                  <HStack alignItems="center">
                    <InputIcon
                      ref={rotateAnimationRef}
                      name="caretDown"
                      color={triggerHasFocus ? 'primary' : variant}
                    />
                  </HStack>
                </HStack>
              </HStack>
            </PressableOpacity>
          </PopoverTrigger>
        </SelectStack>
      );
    },
  ),
);
