import React, { forwardRef, memo } from 'react';
import { css, cx } from '@linaria/core';
import { ForwardedRef } from '@cbhq/cds-common2/types/ForwardedRef';
import { SharedProps } from '@cbhq/cds-common2/types/SharedProps';
import { TextInputBaseProps } from '@cbhq/cds-common2/types/TextInputBaseProps';

import { Box, BoxProps } from '../layout/Box';

const baseStyle = css`
  min-width: 0;
  flex-grow: 2;
  background-color: transparent;
  color: var(--color-textForeground);

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    outline-style: none;
    box-shadow: none;
    border-color: transparent;
  }

  &::placeholder {
    color: var(--color-textForegroundMuted);
    opacity: 1;
  }

  &:-webkit-autofill {
    border-radius: var(--borderRadius-200);
  }
`;

const defaultContainerPaddingStyle = css`
  padding: var(--space-2);

  &[data-compact='true'] {
    padding: var(--space-1);
  }
`;

export type NativeTextAreaBaseProp = {
  /** Custom container spacing if needed. This will add to the existing spacing */
  containerSpacing?: string;
  /**
   * Callback fired when pressed/clicked
   */
  onPress?: React.MouseEventHandler;
} & SharedProps &
  Pick<TextInputBaseProps, 'compact'>;

export type NativeTextAreaProp = NativeTextAreaBaseProp & BoxProps<'textarea'>;

export const NativeTextArea = memo(
  forwardRef(function NativeTextArea(
    {
      font = 'body',
      testID,
      onFocus,
      onPress,
      onBlur,
      onKeyDown,
      onChange,
      accessibilityLabel,
      accessibilityHint,
      compact,
      containerSpacing,
      className,
      ...props
    }: NativeTextAreaProp,
    ref: ForwardedRef<HTMLTextAreaElement>,
  ) {
    return (
      <Box
        ref={ref}
        aria-describedby={accessibilityHint}
        as="textarea"
        className={cx(baseStyle, containerSpacing ?? defaultContainerPaddingStyle, className)}
        data-compact={compact}
        data-testid={testID}
        font={font}
        onBlur={onBlur}
        onChange={onChange}
        onClick={onPress}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        tabIndex={0}
        {...props}
      />
    );
  }),
);
