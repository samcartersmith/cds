import React, { forwardRef, memo } from 'react';
import type { ThemeVars } from '@cbhq/cds-common2/core/theme';
import type { SelectBaseProps, SharedAccessibilityProps } from '@cbhq/cds-common2/types';

import { handlePreventPropagation } from '../utils/eventHandlers';

import { HelperText } from './HelperText';
import { InputLabel } from './InputLabel';
import { InputStack } from './InputStack';

export type SelectStackProps = {
  children: React.ReactElement;
  helperTextErrorIconAccessibilityLabel?: string;
} & Pick<SelectBaseProps, 'compact' | 'label' | 'disabled' | 'helperText' | 'variant' | 'focused'> &
  Pick<SharedAccessibilityProps, 'accessibilityLabelId' | 'accessibilityDescriptionId'>;

const variantToHelperTextColor: Record<
  Exclude<SelectStackProps['variant'], undefined>,
  ThemeVars.Color
> = {
  foreground: 'textForeground',
  positive: 'textPositive',
  negative: 'textNegative',
  primary: 'textPrimary',
  foregroundMuted: 'textForegroundMuted',
  // TODO replace with new textSecondary color once it is added to the theme
  secondary: 'backgroundSecondary',
};

export const SelectStack = memo(
  forwardRef<HTMLElement, SelectStackProps>(function SelectStack(
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
      helperTextErrorIconAccessibilityLabel = 'error',
    },
    ref,
  ) {
    return (
      <InputStack
        ref={ref}
        disabled={disabled}
        focused={focused}
        helperTextNode={
          Boolean(helperText) &&
          (typeof helperText === 'string' ? (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div onClick={handlePreventPropagation}>
              <HelperText
                color={variant ? variantToHelperTextColor[variant] : 'textForegroundMuted'}
                errorIconAccessibilityLabel={helperTextErrorIconAccessibilityLabel}
                errorIconTestID="select-error-icon"
                id={accessibilityDescriptionId}
                overflow="truncate"
              >
                {helperText}
              </HelperText>
            </div>
          ) : (
            helperText
          ))
        }
        inputNode={children}
        labelNode={
          !compact &&
          !!label && (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div onClick={handlePreventPropagation}>
              <InputLabel color="textForeground" id={accessibilityLabelId} overflow="truncate">
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
