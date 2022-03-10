import { SharedProps } from '@cbhq/cds-common/types/SharedProps';
import { ForwardedRef } from '@cbhq/cds-common/types/ForwardedRef';
import React, { memo, forwardRef } from 'react';
import { SharedAccessibilityProps } from '@cbhq/cds-common/types/SharedAccessibilityProps';
import { borderRadius } from '@cbhq/cds-common/tokens/border';
import { TextInputBaseProps } from '@cbhq/cds-common/types/TextInputBaseProps';

import { css } from 'linaria';
import { cx } from '../utils/linaria';
import { palette } from '../tokens';

import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { body } from '../typography/textStyles';

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
      border-radius: ${borderRadius.input}px;
    }
  }
`;

export type NativeTextAreaProp = {
  /** Custom container spacing if needed. This will add to the existing spacing */
  containerSpacing?: string;
  /**
   * Callback fired when pressed/clicked
   */
  onPress?: React.MouseEventHandler;
} & SharedProps &
  Pick<TextInputBaseProps, 'compact'> &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const NativeTextArea = memo(
  forwardRef(
    (
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
    ) => {
      const defaultContainerSpacing = useSpacingStyles({
        spacing: compact ? 1 : 2,
      });

      return (
        <textarea
          aria-label={accessibilityLabel}
          aria-describedby={accessibilityHint}
          className={cx(nativeTextAreaBaseStyle, body, containerSpacing ?? defaultContainerSpacing)}
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
