import { SharedProps, ForwardedRef, TextBaseProps } from '@cbhq/cds-common';
import React, { memo, forwardRef } from 'react';
import { css, cx } from 'linaria';

import { useSpacingStyles } from '../hooks/useSpacingStyles';
import * as textStyles from '../typography/textStyles';

export type NativeInputProps = {
  /** Custom container spacing if needed. This will add to the existing spacing */
  containerSpacing?: string;
  /**
   * Text Align Input
   * @default start
   * */
  align?: TextBaseProps['align'];
  /**
   * Callback fired when pressed/clicked
   */
  onPress?: React.MouseEventHandler;
} & SharedProps &
  React.InputHTMLAttributes<HTMLInputElement>;

const containerStyle = css`
  min-width: 0;
  flex-grow: 2;
  background-color: transparent;

  &:focus {
    outline-style: none;
    box-shadow: none;
    border-color: transparent;
  }
`;

export const NativeInput = memo(
  forwardRef(
    (
      {
        containerSpacing,
        testID,
        align = 'start',
        onFocus,
        onPress,
        onBlur,
        onKeyDown,
        onChange,
        ...props
      }: NativeInputProps,
      ref: ForwardedRef<HTMLInputElement>,
    ) => {
      const defaultContainerSpacing = useSpacingStyles({
        spacingHorizontal: 2,
        spacingVertical: 2,
      });

      return (
        <input
          style={{ textAlign: align }}
          className={cx(
            textStyles.body,
            containerSpacing ?? defaultContainerSpacing,
            containerStyle,
          )}
          data-testid={testID}
          tabIndex={0}
          onClick={onPress}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onChange={onChange}
          ref={ref}
          {...props}
        />
      );
    },
  ),
);
