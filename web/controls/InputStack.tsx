import React, { useMemo, memo, forwardRef } from 'react';

import { InputStackBaseProps } from '@cbhq/cds-common/types/InputBaseProps';
import { borderWidth } from '@cbhq/cds-common/tokens/border';
import { opacityDisabled } from '@cbhq/cds-common/tokens/interactable';
import { ForwardedRef } from '@cbhq/cds-common';

import { css, cx } from 'linaria';
import { durations } from '@cbhq/cds-common/tokens/motion';
import { usePalette } from '../hooks/usePalette';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { InputLabel } from './InputLabel';
import { Interactable } from '../system/Interactable';

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

    const defaultBorderStyles = useMemo(() => {
      return {
        '--border-color-unfocused':
          variant === 'foregroundMuted' ? palette.lineHeavy : palette[variant],
        '--border-color-focused':
          variant !== 'positive' && variant !== 'negative' ? palette.primary : palette[variant],
        ...inputBorderRadius,
      };
    }, [variant, palette, inputBorderRadius]);

    return (
      <VStack testID={testID} width={width} gap={0.5} {...props}>
        {!!labelNode && (
          <>{typeof labelNode === 'string' ? <InputLabel>{labelNode}</InputLabel> : labelNode}</>
        )}
        <HStack opacity={disabled ? opacityDisabled : 1}>
          {!!prependNode && <>{prependNode}</>}
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
          {!!appendNode && <>{appendNode}</>}
        </HStack>
        {!!helperTextNode && <>{helperTextNode}</>}
      </VStack>
    );
  }),
);
