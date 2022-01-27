import React, { ReactElement, forwardRef, memo } from 'react';
import { ForwardedRef, SelectBaseProps } from '@cbhq/cds-common/types';
import { labelTextColor } from '@cbhq/cds-common/tokens/select';
import { SharedAccessibilityProps } from '@cbhq/cds-common/types/SharedAccessibilityProps';
import { InputLabel } from './InputLabel';
import { HelperText } from './HelperText';
import { InputStack } from './InputStack';

export type SelectStackProps = {
  children: ReactElement;
} & Pick<SelectBaseProps, 'compact' | 'label' | 'disabled' | 'helperText' | 'variant' | 'focused'> &
  Pick<SharedAccessibilityProps, 'accessibilityLabelId' | 'accessibilityDescriptionId'>;

export const SelectStack = memo(
  forwardRef(
    (
      {
        children,
        compact,
        label,
        disabled,
        helperText,
        variant,
        focused,
        accessibilityLabelId,
        accessibilityDescriptionId,
      }: SelectStackProps,
      ref: ForwardedRef<HTMLElement>,
    ) => {
      return (
        <InputStack
          width="100%"
          disabled={disabled}
          variant={variant}
          ref={ref}
          focused={focused}
          helperTextNode={
            Boolean(helperText) && (
              <HelperText
                overflow="truncate"
                color={variant ?? 'foregroundMuted'}
                id={accessibilityDescriptionId}
              >
                {helperText}
              </HelperText>
            )
          }
          labelNode={
            !compact &&
            !!label && (
              <InputLabel overflow="truncate" color={labelTextColor} id={accessibilityLabelId}>
                {label}
              </InputLabel>
            )
          }
          inputNode={children}
        />
      );
    },
  ),
);
