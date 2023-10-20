import React, { forwardRef, memo, ReactElement } from 'react';
import { labelTextColor } from '@cbhq/cds-common/tokens/select';
import { ForwardedRef, SelectBaseProps } from '@cbhq/cds-common/types';
import { SharedAccessibilityProps } from '@cbhq/cds-common/types/SharedAccessibilityProps';

import { handlePreventPropagation } from '../utils/eventHandlers';

import { HelperText } from './HelperText';
import { InputLabel } from './InputLabel';
import { InputStack } from './InputStack';

export type SelectStackProps = {
  children: ReactElement;
} & Pick<SelectBaseProps, 'compact' | 'label' | 'disabled' | 'helperText' | 'variant' | 'focused'> &
  Pick<SharedAccessibilityProps, 'accessibilityLabelId' | 'accessibilityDescriptionId'>;

export const SelectStack = memo(
  forwardRef(function SelectStack(
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
  ) {
    return (
      <InputStack
        ref={ref}
        disabled={disabled}
        focused={focused}
        helperTextNode={
          Boolean(helperText) && (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div onClick={handlePreventPropagation}>
              <HelperText
                color={variant ?? 'foregroundMuted'}
                id={accessibilityDescriptionId}
                overflow="truncate"
              >
                {helperText}
              </HelperText>
            </div>
          )
        }
        inputNode={children}
        labelNode={
          !compact &&
          !!label && (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div onClick={handlePreventPropagation}>
              <InputLabel color={labelTextColor} id={accessibilityLabelId} overflow="truncate">
                {label}
              </InputLabel>
            </div>
          )
        }
        variant={variant}
        width="100%"
      />
    );
  }),
);
