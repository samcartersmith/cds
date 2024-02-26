import React, { forwardRef, memo, useMemo } from 'react';
import { css } from 'linaria';
import { useSpectrum } from '@cbhq/cds-common';
import { ForwardedRef } from '@cbhq/cds-common/types/ForwardedRef';
import { SharedAccessibilityProps } from '@cbhq/cds-common/types/SharedAccessibilityProps';
import { SharedProps } from '@cbhq/cds-common/types/SharedProps';
import { TextBaseProps } from '@cbhq/cds-common/types/TextBaseProps';
import { TextInputBaseProps } from '@cbhq/cds-common/types/TextInputBaseProps';

import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { OnPress } from '../system';
import { borderRadius, palette } from '../tokens';
import { body } from '../typography/textStyles';
import { cx } from '../utils/linaria';

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
  onPress?: OnPress;
} & SharedProps &
  Pick<TextInputBaseProps, 'compact'> &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > &
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

  /* stylelint-disable a11y/no-display-none */
  /* clears the "X" from Internet Explorer */
  &[type='search']::-ms-clear {
    display: none;
    width: 0;
    height: 0;
  }
  &[type='search']::-ms-reveal {
    display: none;
    width: 0;
    height: 0;
  }
  /* clears the "X" from Chrome */
  &[type='search']::-webkit-search-decoration,
  &[type='search']::-webkit-search-cancel-button,
  &[type='search']::-webkit-search-results-button,
  &[type='search']::-webkit-search-results-decoration {
    display: none;
  }
  /* stylelint-enable a11y/no-display-none */

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    border-radius: ${borderRadius.rounded};
    -webkit-text-fill-color: ${palette.foreground};
    transition: background-color 0s ease-in-out 5000s;
  }
`;

export const NativeInput = memo(
  forwardRef(function NativeInput(
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
      accessibilityHint,
      compact,
      ...props
    }: NativeInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) {
    const defaultContainerSpacing = useSpacingStyles({
      spacing: compact ? 1 : 2,
    });

    const spectrum = useSpectrum();

    const dynamicStyles = useMemo(() => {
      return {
        textAlign: align,
        colorScheme: spectrum,
      };
    }, [align, spectrum]);

    return (
      <input
        ref={ref}
        aria-describedby={accessibilityHint}
        aria-label={accessibilityLabel}
        className={cx(nativeInputBaseStyle, body, containerSpacing ?? defaultContainerSpacing)}
        data-testid={testID}
        onBlur={onBlur}
        onChange={onChange}
        onClick={onPress}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        style={dynamicStyles}
        tabIndex={0}
        {...props}
      />
    );
  }),
);
