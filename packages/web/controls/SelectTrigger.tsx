import React, { forwardRef, memo, RefObject } from 'react';
import { css } from 'linaria';
import { ForwardedRef, InputVariant, SelectBaseProps } from '@cbhq/cds-common';
import { useInputVariant } from '@cbhq/cds-common/hooks/useInputVariant';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import {
  labelTextColor,
  selectTriggerCompactMinHeight,
  selectTriggerMinHeight,
} from '@cbhq/cds-common/tokens/select';

import { useA11yId } from '../hooks/useA11yId';
import { HStack } from '../layout/HStack';
import { PressableOpacity } from '../system';
import { TextBody } from '../typography/TextBody';

import { TextInputFocusVariantContext } from './context';
import { InputIcon } from './InputIcon';
import { InputLabel } from './InputLabel';
import { SelectStack } from './SelectStack';

export type SelectTriggerProps = {
  rotateAnimationRef: RefObject<HTMLDivElement>;
  triggerHasFocus: boolean;
} & Omit<SelectBaseProps, 'children' | 'focused' | 'width' | 'onChange'>;

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
    const shouldShowCompactLabel = compact && label;
    // this corrects for when value is initialized with an empty string, coerce it to undefined
    const sanitizedValue = value === '' ? undefined : value;

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
        <PressableOpacity
          onPress={onPress}
          width="100%"
          noScaleOnPress
          className={pressableOverrides}
          tabIndex={0}
          {...props}
        >
          <HStack minHeight={minHeight} width="100%" minWidth={0} spacingStart={startNode ? 0 : 2}>
            {!!startNode && (
              <HStack alignItems="center" justifyContent="center" minWidth={0}>
                {startNode}
              </HStack>
            )}
            {shouldShowCompactLabel ? (
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
                justifyContent={shouldShowCompactLabel ? 'flex-end' : 'flex-start'}
              >
                <TextBody
                  as="p"
                  color={sanitizedValue ? 'foreground' : 'foregroundMuted'}
                  overflow="truncate"
                  align={shouldShowCompactLabel ? 'end' : 'start'}
                >
                  {sanitizedValue ?? placeholder ?? (!compact ? label : null)}
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
      </SelectStack>
    );
  }),
);
