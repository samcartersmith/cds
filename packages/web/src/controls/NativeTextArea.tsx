import React, { forwardRef, memo } from 'react';
import { css } from '@linaria/core';
import { ForwardedRef } from '@cbhq/cds-common/types/ForwardedRef';
import { SharedAccessibilityProps } from '@cbhq/cds-common/types/SharedAccessibilityProps';
import { SharedProps } from '@cbhq/cds-common/types/SharedProps';
import { TextInputBaseProps } from '@cbhq/cds-common/types/TextInputBaseProps';

import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { OnPress } from '../system';
import { borderRadius, palette } from '../tokens';
import { body } from '../typography/textStyles';
import { cx } from '../utils/linaria';

const nativeTextAreaBaseStyle = css`
  && {
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

    &:-webkit-autofill {
      border-radius: ${borderRadius.rounded};
    }
  }
`;

export type NativeTextAreaProp = {
  /** Custom container spacing if needed. This will add to the existing spacing */
  containerSpacing?: string;
  /**
   * Callback fired when pressed/clicked
   */
  onPress?: OnPress;
} & SharedProps &
  Pick<TextInputBaseProps, 'compact'> &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const NativeTextArea = memo(
  forwardRef(function NativeTextArea(
    {
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
      ...props
    }: NativeTextAreaProp,
    ref: ForwardedRef<HTMLTextAreaElement>,
  ) {
    const defaultContainerSpacing = useSpacingStyles({
      spacing: compact ? 1 : 2,
    });

    return (
      <textarea
        ref={ref}
        aria-describedby={accessibilityHint}
        className={cx(nativeTextAreaBaseStyle, body, containerSpacing ?? defaultContainerSpacing)}
        data-testid={testID}
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
