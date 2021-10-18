import { SharedProps } from '@cbhq/cds-common/types/SharedProps';
import { ForwardedRef } from '@cbhq/cds-common/types/ForwardedRef';
import { TextBaseProps } from '@cbhq/cds-common/types/TextBaseProps';
import React, { memo, forwardRef } from 'react';
import { css, cx } from 'linaria';
import { SharedAccessibilityProps } from '@cbhq/cds-common/types/SharedAccessibilityProps';
import { palette } from '../tokens';

import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { body } from '../typography/textStyles';

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
  SharedAccessibilityProps &
  React.InputHTMLAttributes<HTMLInputElement>;

const nativeInputBaseStyle = css`
  min-width: 0;
  flex-grow: 2;
  background-color: transparent;
  color: ${palette.foreground};

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
    color: ${palette.foregroundMuted};
    opacity: 1;
  }

  &[type='number'] {
    -moz-appearance: textfield;
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
        accessibilityLabel,
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
          aria-label={accessibilityLabel}
          className={cx(nativeInputBaseStyle, body, containerSpacing ?? defaultContainerSpacing)}
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
