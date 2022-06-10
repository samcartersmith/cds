/* eslint-disable react/jsx-no-useless-fragment */
import React, { forwardRef, memo, useMemo } from 'react';
import { css } from 'linaria';
import { BorderWidth, ForwardedRef } from '@cbhq/cds-common';
import { durations } from '@cbhq/cds-common/motion/tokens';
import { inputStackGap } from '@cbhq/cds-common/tokens/input';
import { opacityDisabled } from '@cbhq/cds-common/tokens/interactable';
import { InputStackBaseProps } from '@cbhq/cds-common/types/InputBaseProps';

import { usePalette } from '../hooks/usePalette';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Interactable } from '../system/Interactable';
import { borderWidth as borderWidths } from '../tokens';
import { cx } from '../utils/linaria';

import { InputLabel } from './InputLabel';

const inputBaseAreaStyles = css`
  && {
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

    &:focus-within {
      border-color: var(--border-color-focused);
      box-shadow: 0 0 0 var(--border-width-focused) var(--border-color-focused);
    }
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
const persistedFocusStyles = css`
  &&&& {
    border-color: var(--border-color-focused);
    box-shadow: 0 0 0 var(--border-width-focused) var(--border-color-focused);
  }
`;

export type InputStackProps = {
  /** Width of the border.
   * @default input
   */
  borderWidth?: BorderWidth;
} & InputStackBaseProps;

export const InputStack = memo(
  forwardRef(function InputStack(
    {
      /** CDS custom props */
      width = '100%',
      prependNode,
      endNode,
      appendNode,
      startNode,
      disabled = false,
      inputNode,
      helperTextNode,
      borderWidth = 'input',
      variant = 'foregroundMuted',
      labelNode,
      testID = '',
      focused = false,
      borderRadius = 'input',
      height,
      disableFocusedStyle = false,
      ...props
    }: InputStackProps,
    ref: ForwardedRef<HTMLElement>,
  ) {
    const palette = usePalette();

    // Styling
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
        return palette.primary;
      }

      return palette[variant];
    }, [disableFocusedStyle, palette, variant]);

    const defaultBorderStyles = useMemo(() => {
      return {
        '--border-color-unfocused':
          variant === 'foregroundMuted' ? palette.lineHeavy : palette[variant],
        '--border-color-focused': borderColorFocused,
        '--border-width-focused': borderWidths[borderWidth],
        ...inputBorderRadius,
      };
    }, [variant, palette, borderColorFocused, borderWidth, inputBorderRadius]);

    return (
      <VStack
        testID={testID}
        width={width}
        gap={inputStackGap}
        opacity={disabled ? opacityDisabled : 1}
        {...props}
      >
        {!!labelNode && (
          <>{typeof labelNode === 'string' ? <InputLabel>{labelNode}</InputLabel> : labelNode}</>
        )}
        <HStack>
          {!!prependNode && <>{prependNode}</>}
          <div className={inputAreaContainerStyles}>
            <Interactable
              as="span"
              backgroundColor="background"
              borderWidth={borderWidth}
              ref={ref}
              height={height}
              disabled={disabled}
              testID="input-interactable-area"
              borderRadius={borderRadius}
              style={defaultBorderStyles}
              className={cx(inputBaseAreaStyles, focused && persistedFocusStyles)}
            >
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
  }),
);
