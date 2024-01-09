import React, { forwardRef, memo } from 'react';
import { css } from 'linaria';
import { ForwardedRef, InputVariant, SelectBaseProps } from '@cbhq/cds-common';
import { useInputVariant } from '@cbhq/cds-common/hooks/useInputVariant';
import { usePrefixedId } from '@cbhq/cds-common/hooks/usePrefixedId';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import {
  labelTextColor,
  selectTriggerCompactMinHeight,
  selectTriggerMinHeight,
} from '@cbhq/cds-common/tokens/select';
import { TextInputFocusVariantContext } from '@cbhq/cds-web/controls/context';
import { InputLabel } from '@cbhq/cds-web/controls/InputLabel';
import { HStack } from '@cbhq/cds-web/layout/HStack';
import { AnimatedCaret } from '@cbhq/cds-web/motion/AnimatedCaret';
import { PressableOpacity } from '@cbhq/cds-web/system';
import { TextBody } from '@cbhq/cds-web/typography/TextBody';

import { SelectStack } from './SelectStack';

export type SelectTriggerProps = {
  triggerHasFocus: boolean;
  /** Select Dropdown menu is opened */
  visible?: boolean;
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
      value,
      variant,
      triggerHasFocus,
      helperText,
      onPress,
      startNode,
      visible,
      ...props
    }: SelectTriggerProps,
    ref: ForwardedRef<HTMLElement>,
  ) {
    const [accessibilityLabelId, accessibilityDescriptionId] = usePrefixedId([
      'label',
      'description',
    ]);
    const focusedVariant = useInputVariant(triggerHasFocus, variant as InputVariant);
    const minHeight = useScaleConditional(
      compact ? selectTriggerCompactMinHeight : selectTriggerMinHeight,
    );
    const shouldShowCompactLabel = compact && label;
    // this corrects for when value is initialized with an empty string, coerce it to undefined
    const sanitizedValue = value === '' ? undefined : value;

    return (
      <SelectStack
        ref={ref}
        accessibilityDescriptionId={accessibilityDescriptionId}
        accessibilityLabelId={accessibilityLabelId}
        compact={compact}
        disabled={disabled}
        focused={triggerHasFocus}
        helperText={helperText}
        label={label}
        variant={variant}
      >
        <PressableOpacity
          noScaleOnPress
          className={pressableOverrides}
          onPress={onPress}
          tabIndex={0}
          width="100%"
          {...props}
        >
          <HStack minHeight={minHeight} minWidth={0} spacingStart={startNode ? 0 : 2} width="100%">
            {!!startNode && (
              <HStack alignItems="center" justifyContent="center" minWidth={0}>
                {startNode}
              </HStack>
            )}
            {shouldShowCompactLabel ? (
              <HStack alignItems="center" maxWidth="40%" spacingEnd={1}>
                <InputLabel color={labelTextColor} id={accessibilityLabelId} overflow="truncate">
                  {label}
                </InputLabel>
              </HStack>
            ) : null}
            <HStack
              alignItems="center"
              borderRadius="rounded"
              justifyContent="space-between"
              minWidth={0}
              spacingVertical={compact ? 1 : 2}
              width="100%"
            >
              <HStack
                flexGrow={1}
                flexShrink={1}
                justifyContent={shouldShowCompactLabel ? 'flex-end' : 'flex-start'}
                minWidth={0}
              >
                <TextBody
                  align={shouldShowCompactLabel ? 'end' : 'start'}
                  as="p"
                  color={sanitizedValue ? 'foreground' : 'foregroundMuted'}
                  overflow="truncate"
                >
                  {sanitizedValue ?? placeholder ?? (!compact ? label : null)}
                </TextBody>
              </HStack>
              <HStack alignItems="center">
                <TextInputFocusVariantContext.Provider value={focusedVariant ?? undefined}>
                  <AnimatedCaret rotate={visible ? 0 : 180} spacingHorizontal={2} />
                </TextInputFocusVariantContext.Provider>
              </HStack>
            </HStack>
          </HStack>
        </PressableOpacity>
      </SelectStack>
    );
  }),
);
