import React, { useMemo, memo } from 'react';

import { InputBaseProps } from '@cbhq/cds-common/types/InputBaseProps';
import { borderRadius } from '@cbhq/cds-common/tokens/border';
import { opacityDisabled } from '@cbhq/cds-common/tokens/interactable';
import { defaultPalette } from '@cbhq/cds-common';

import { css, cx } from 'linaria';
import { usePalette } from '../hooks/usePalette';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { InputLabel } from './InputLabel';

/**
 * TODO: The hover state needs to be a token at some point. Need to sync
 * with Jake cause I know his table uses this too.
 */
const inputBaseAreaStyles = css`
  flex-direction: row;
  border-radius: ${borderRadius.input}px;
  display: flex;
  min-width: 0;
  flex-grow: 2;

  &:hover {
    background-color: rgb(var(--${defaultPalette.backgroundAlternate}), 0.3);
  }
`;

export type InputStackProps = {
  /** Adds border styling to input  */
  borderStyle?: string;
} & InputBaseProps;

export const InputStack = memo(function Input({
  /** CDS custom props */
  width = 100,
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
  ...props
}: InputStackProps) {
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
      borderColor: variant === 'foregroundMuted' ? palette.lineHeavy : palette[variant],
      ...inputBorderRadius,
    };
  }, [variant, palette, inputBorderRadius]);

  return (
    <VStack testID={testID} width={`${width}%`} gap={0.5} {...props}>
      {!!labelNode && (
        <>{typeof labelNode === 'string' ? <InputLabel>{labelNode}</InputLabel> : labelNode}</>
      )}
      <HStack opacity={disabled ? opacityDisabled : 1}>
        {!!prependNode && <>{prependNode}</>}
        <div style={defaultBorderStyles} className={cx(inputBaseAreaStyles, borderStyle)}>
          {!!startNode && <>{startNode}</>}
          {inputNode}
          {!!endNode && <>{endNode}</>}
        </div>
        {!!appendNode && <>{appendNode}</>}
      </HStack>
      {!!helperTextNode && <>{helperTextNode}</>}
    </VStack>
  );
});
