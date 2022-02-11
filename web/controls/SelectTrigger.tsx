import React, { RefObject, forwardRef, memo } from 'react';
import { ForwardedRef, InputVariant, SelectBaseProps } from '@cbhq/cds-common';
import { css } from 'linaria';
import {
  labelTextColor,
  selectTriggerCompactMinHeight,
  selectTriggerMinHeight,
} from '@cbhq/cds-common/tokens/select';
import { useInputVariant } from '@cbhq/cds-common/hooks/useInputVariant';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { TextBody } from '../typography/TextBody';
import { InputIcon } from './InputIcon';
import { PressableOpacity } from '../system';
import { HStack } from '../layout/HStack';
import { PopoverTrigger, PopoverTriggerProps } from '../overlays/PopoverMenu/PopoverTrigger';
import { InputLabel } from './InputLabel';
import { useA11yId } from '../hooks/useA11yId';
import { SelectStack } from './SelectStack';
import { TextInputFocusVariantContext } from './context';

export type SelectTriggerProps = {
  rotateAnimationRef: RefObject<HTMLDivElement>;
  triggerHasFocus: boolean;
} & Omit<SelectBaseProps, 'children' | 'focused' | 'width' | 'onChange'> &
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
  forwardRef(function SelectTrigger(
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
  ) {
    const accessibilityLabelId = useA11yId();
    const accessibilityDescriptionId = useA11yId();
    const focusedVariant = useInputVariant(triggerHasFocus, variant as InputVariant);
    const minHeight = useScaleConditional(
      compact ? selectTriggerCompactMinHeight : selectTriggerMinHeight,
    );

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
          <PressableOpacity width="100%" noScaleOnPress className={pressableOverrides} {...props}>
            <HStack
              minHeight={minHeight}
              width="100%"
              minWidth={0}
              spacingStart={startNode ? 0 : 2}
            >
              {!!startNode && (
                <HStack alignItems="center" justifyContent="center" minWidth={0}>
                  {startNode}
                </HStack>
              )}
              {compact ? (
                <HStack spacingEnd={1} alignItems="center" maxWidth="40%">
                  <InputLabel color={labelTextColor} overflow="truncate" id={accessibilityLabelId}>
                    {label}
                  </InputLabel>
                </HStack>
              ) : null}
              <HStack
                alignItems="center"
                borderRadius="standard"
                justifyContent="space-between"
                spacingVertical={compact ? 1 : 2}
                width="100%"
                minWidth={0}
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
                    overflow="truncate"
                    align={compact ? 'end' : 'start'}
                  >
                    {value ?? placeholder ?? (!compact && label)}
                  </TextBody>
                </HStack>
                <HStack alignItems="center">
                  <TextInputFocusVariantContext.Provider value={focusedVariant ?? undefined}>
                    <InputIcon ref={rotateAnimationRef} name="caretDown" />
                  </TextInputFocusVariantContext.Provider>
                </HStack>
              </HStack>
            </HStack>
          </PressableOpacity>
        </PopoverTrigger>
      </SelectStack>
    );
  }),
);
