import React, { forwardRef, memo, useMemo } from 'react';
import { css } from 'linaria';
import { ForwardedRef } from '@cbhq/cds-common';
import { borderWidth } from '@cbhq/cds-common/tokens/border';
import { opacityDisabled } from '@cbhq/cds-common/tokens/interactable';
import { durations } from '@cbhq/cds-common/tokens/motion';
import { InputStackBaseProps } from '@cbhq/cds-common/types/InputBaseProps';

import { usePalette } from '../hooks/usePalette';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Interactable } from '../system/Interactable';
import { cx } from '../utils/linaria';

import { InputLabel } from './InputLabel';

const inputBaseAreaStyles = css`
  && {
    flex-direction: row;
    display: flex;
    min-width: 0;
    flex-grow: 2;
    border-color: var(--border-color-unfocused);
    /* stylelint-disable plugin/no-low-performance-animation-properties */
    transition: box-shadow ${durations.moderate1}ms ease-in-out;
    /* stylelint-enable plugin/no-low-performance-animation-properties */

    &:focus-within {
      border-color: var(--border-color-focused);
      box-shadow: 0 0 0 ${borderWidth.input}px var(--border-color-focused);
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
    box-shadow: 0 0 0 ${borderWidth.input}px var(--border-color-focused);
  }
`;

export type InputStackProps = {
  /** Adds border styling to input  */
  borderStyle?: string;
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
      borderStyle,
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
        ...inputBorderRadius,
      };
    }, [variant, palette, borderColorFocused, inputBorderRadius]);

    return (
      <VStack testID={testID} width={width} gap={0.5} {...props}>
        {!!labelNode && (
          <>{typeof labelNode === 'string' ? <InputLabel>{labelNode}</InputLabel> : labelNode}</>
        )}
        <HStack opacity={disabled ? opacityDisabled : 1}>
          {!!prependNode && <>{prependNode}</>}
          <div className={inputAreaContainerStyles}>
            <Interactable
              as="span"
              backgroundColor="background"
              borderWidth="input"
              ref={ref}
              height={height}
              testID="input-interactable-area"
              borderRadius={borderRadius}
              disabled={disabled}
              style={defaultBorderStyles}
              className={cx(inputBaseAreaStyles, borderStyle, focused && persistedFocusStyles)}
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
