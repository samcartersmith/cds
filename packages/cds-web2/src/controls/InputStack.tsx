/* eslint-disable react/jsx-no-useless-fragment */
import React, { forwardRef, memo, useMemo } from 'react';
import { css, cx } from '@linaria/core';
import type { ThemeVars } from '@cbhq/cds-common2/core/theme';
import { durations } from '@cbhq/cds-common2/motion/tokens';
import { inputStackGap } from '@cbhq/cds-common2/tokens/input';
import { accessibleOpacityDisabled } from '@cbhq/cds-common2/tokens/interactable';
import type { DimensionValue } from '@cbhq/cds-common2/types/DimensionStyles';
import type { ForwardedRef } from '@cbhq/cds-common2/types/ForwardedRef';
import { InputVariant } from '@cbhq/cds-common2/types/InputBaseProps';
import type { SharedProps } from '@cbhq/cds-common2/types/SharedProps';

import { type BoxProps } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { ColorSurge } from '../motion/ColorSurge';
import { Interactable } from '../system/Interactable';

import { InputLabel } from './InputLabel';

const baseStyle = css`
  flex-direction: row;
  display: flex;
  min-width: 0;
  flex-grow: 2;

  /* When input is disabled, opacity 0.38 was applied twice. One time on the root VStack, and second time in interactable. As a result, it was not a11y compliant. To resolve this issue, i had to put an opacity of 1 override in the interactable element. */
  opacity: 1;

  border-color: var(--border-color-unfocused);
  /* stylelint-disable plugin/no-low-performance-animation-properties */
  transition: box-shadow ${durations.moderate1}ms ease-in-out;
  /* stylelint-enable plugin/no-low-performance-animation-properties */
  overflow: hidden;

  &:hover {
    opacity: 1;
  }

  &:focus-within {
    border-color: var(--border-color-focused);
    box-shadow: 0 0 0 var(--border-width-focused) var(--border-color-focused);
  }
`;

// Fixes a problem found in Accordian children element.
// When `overflow: auto` is set the thickened border when focused is not accounted for
// hence you see a cutoff.
// Fix was to add this so there is always 2px outer layer space
const inputAreaContainerStyles = css`
  padding: 1px;
  width: 100%;
`;

/** this should only be used as a last resort, when focus styles need to be persisted. eg: when a Select PopoverMenu is opened */
const persistedFocusStyle = css`
  border-color: var(--border-color-focused);
  box-shadow: 0 0 0 var(--border-width-focused) var(--border-color-focused);
`;

const variantColorMap: Record<InputVariant, ThemeVars.Color> = {
  primary: 'backgroundPrimary',
  positive: 'backgroundPositive',
  negative: 'backgroundNegative',
  foreground: 'textForeground',
  foregroundMuted: 'textForegroundMuted',
  secondary: 'backgroundSecondary',
};

export type InputStackBaseProps = {
  /** Width of the border.
   * @default rounded
   */
  borderWidth?: ThemeVars.BorderWidth;
  /**
   * Determines the sentiment of the input. Because
   * we allow startContent and endContent to be custom ReactNode,
   * the content placed inside these slots will not change colors according
   * to the variant. You will have to add that yourself
   * @default textForegroundMuted
   */
  variant?: InputVariant;
  /**
   * Width of input as a percentage string.
   * @default 100%
   * */
  width?: `${number}%` | number;
  /**
   * Height of input
   * @default auto
   */
  height?: DimensionValue;
  /**
   * Toggles input interactability and opacity
   * @default false
   */
  disabled?: boolean;
  /** Prepends custom content to the start. Content is not part of input */
  prependNode?: React.ReactNode;
  /** Adds content to the start of the inner input. Refer to diagram for location of startNode in InputStack component */
  startNode?: React.ReactNode;
  /** Appends custom content to the end. Content is not part of input */
  appendNode?: React.ReactNode;
  /** Adds content to the end of the inner input. Refer to diagram for location of endNode in InputStack component */
  endNode?: React.ReactNode;
  /** Editable area of the Input */
  inputNode: React.ReactNode;
  /** Text shown below input. Used for when label is not enough to indicate what this input does */
  helperTextNode?: React.ReactNode;
  /** A message indicating the purpose of this input */
  labelNode?: React.ReactNode;
  /** This should only be used when focused styles need to be persisted */
  focused?: boolean;
  /**
   * Leverage one of the borderRadius styles we offer to round the corners of the input.
   * @default rounded
   */
  borderRadius?: ThemeVars.BorderRadius;
  /**
   * Disable default focus styles
   * @default false
   */
  disableFocusedStyle?: boolean;
  /**
   * Enable Color Surge motion
   * @default false
   */
  enableColorSurge?: boolean;
} & SharedProps;

export type InputStackProps = InputStackBaseProps & BoxProps<'div'>;

export const InputStack = memo(
  forwardRef(
    (
      {
        width = '100%',
        prependNode,
        endNode,
        appendNode,
        startNode,
        disabled = false,
        inputNode,
        helperTextNode,
        borderWidth = 100,
        variant = 'foregroundMuted',
        labelNode,
        testID = '',
        focused = false,
        borderRadius = 200,
        height,
        disableFocusedStyle = false,
        enableColorSurge,
        ...props
      }: InputStackProps,
      ref: ForwardedRef<HTMLElement>,
    ) => {
      const focusedVariant = useMemo(
        () => (focused && variant !== 'positive' && variant !== 'negative' ? 'primary' : variant),
        [focused, variant],
      );

      const inputBorderRadius = useMemo(() => {
        return {
          ...(prependNode
            ? {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }
            : {}),
          ...(appendNode
            ? {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }
            : {}),
        };
      }, [prependNode, appendNode]);

      const borderColorFocused = useMemo(() => {
        if (disableFocusedStyle) {
          return 'transparent';
        }

        if (variant !== 'positive' && variant !== 'negative') {
          return 'var(--color-textPrimary)';
        }

        return `var(--color-${variant})`;
      }, [disableFocusedStyle, variant]);

      const defaultBorderStyle = useMemo(() => {
        return {
          '--border-color-unfocused':
            variant === 'secondary'
              ? 'transparent'
              : variant === 'foregroundMuted' || !variant
              ? 'var(--color-lineHeavy)'
              : `var(--color-${variant})`,
          '--border-color-focused': borderColorFocused,
          '--border-width-focused': `var(--borderWidth-${borderWidth})`,
          ...inputBorderRadius,
        };
      }, [variant, borderColorFocused, borderWidth, inputBorderRadius]);

      return (
        <VStack
          gap={inputStackGap}
          opacity={disabled ? accessibleOpacityDisabled : 1}
          testID={testID}
          width={width}
          {...props}
        >
          {!!labelNode && (
            <>{typeof labelNode === 'string' ? <InputLabel>{labelNode}</InputLabel> : labelNode}</>
          )}
          <HStack>
            {!!prependNode && <>{prependNode}</>}
            <div className={inputAreaContainerStyles}>
              <Interactable
                ref={ref}
                as="span"
                background={variant === 'secondary' ? 'backgroundSecondary' : 'background'}
                borderRadius={borderRadius}
                borderWidth={borderWidth}
                className={cx(baseStyle, focused && persistedFocusStyle)}
                disabled={disabled}
                height={height}
                style={defaultBorderStyle}
                testID="input-interactable-area"
              >
                {!!focused && !!enableColorSurge && (
                  <ColorSurge background={variantColorMap[focusedVariant]} />
                )}
                {!!startNode && <>{startNode}</>}
                {inputNode}
                {!!endNode && <>{endNode}</>}
              </Interactable>
            </div>
            {!!appendNode && <>{appendNode}</>}
          </HStack>
          {!!helperTextNode && <>{helperTextNode}</>}
        </VStack>
      );
    },
  ),
);
