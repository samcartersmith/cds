import React, { forwardRef, memo } from 'react';
import { css } from '@linaria/core';
import { useInputVariant } from '@cbhq/cds-common2/hooks/useInputVariant';
import { usePrefixedId } from '@cbhq/cds-common2/hooks/usePrefixedId';
import type { InputVariant, SelectBaseProps } from '@cbhq/cds-common2/types';

import { HStack } from '../layout/HStack';
import { AnimatedCaret } from '../motion/AnimatedCaret';
import { Pressable } from '../system/Pressable';
import { Text } from '../typography/Text';

import { TextInputFocusVariantContext } from './context';
import { InputLabel } from './InputLabel';
import { SelectStack } from './SelectStack';

const selectTriggerMinHeight = 56;
const selectTriggerCompactMinHeight = 40;

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
  forwardRef<HTMLElement, SelectTriggerProps>(function SelectTrigger(
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
    },
    ref,
  ) {
    const [accessibilityLabelId, accessibilityDescriptionId] = usePrefixedId([
      'label',
      'description',
    ]);
    const focusedVariant = useInputVariant(triggerHasFocus, variant as InputVariant);
    const minHeight = compact ? selectTriggerCompactMinHeight : selectTriggerMinHeight;
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
        <Pressable
          noScaleOnPress
          background="transparent"
          className={pressableOverrides}
          onPress={onPress}
          tabIndex={0}
          width="100%"
          {...props}
        >
          <HStack minHeight={minHeight} minWidth={0} paddingStart={startNode ? 0 : 2} width="100%">
            {!!startNode && (
              <HStack alignItems="center" justifyContent="center" minWidth={0}>
                {startNode}
              </HStack>
            )}
            {shouldShowCompactLabel ? (
              <HStack alignItems="center" maxWidth="40%" paddingEnd={1}>
                <InputLabel color="fg" id={accessibilityLabelId} overflow="truncate">
                  {label}
                </InputLabel>
              </HStack>
            ) : null}
            <HStack
              alignItems="center"
              borderRadius={200}
              justifyContent="space-between"
              minWidth={0}
              paddingY={compact ? 1 : 2}
              width="100%"
            >
              <HStack
                flexGrow={1}
                flexShrink={1}
                justifyContent={shouldShowCompactLabel ? 'flex-end' : 'flex-start'}
                minWidth={0}
              >
                <Text
                  as="p"
                  color={sanitizedValue ? 'fg' : 'fgMuted'}
                  font="body"
                  overflow="truncate"
                  textAlign={shouldShowCompactLabel ? 'end' : 'start'}
                >
                  {sanitizedValue ?? placeholder ?? (!compact ? label : null)}
                </Text>
              </HStack>
              <HStack alignItems="center">
                <TextInputFocusVariantContext.Provider value={focusedVariant ?? undefined}>
                  <AnimatedCaret paddingX={2} rotate={visible ? 0 : 180} />
                </TextInputFocusVariantContext.Provider>
              </HStack>
            </HStack>
          </HStack>
        </Pressable>
      </SelectStack>
    );
  }),
);
