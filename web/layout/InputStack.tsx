import React, { memo } from 'react';

import { InputBaseProps } from '@cbhq/cds-common/types/InputBaseProps';
import { borderRadius } from '@cbhq/cds-common/tokens/border';

import { css, cx } from 'linaria';
import { usePalette } from '../hooks/usePalette';
import { HStack } from './HStack';
import { VStack } from './VStack';
import { InputLabel } from '../inputs/InputLabel';

const inputBaseAreaStyles = css`
  flex-direction: row;
  border-radius: ${borderRadius.input}px;
  display: flex;
  flex: 2;
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
  inputNode,
  helperTextNode,
  borderStyle,
  variant = 'foregroundMuted',
  labelNode,
  testID,
  ...props
}: InputStackProps) {
  const borderColor = usePalette()[variant];
  const inputBorderRadius = {
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

  return (
    <VStack testID={testID} width={`${width}%`} gap={0.5} {...props}>
      {!!labelNode && (
        <>{typeof labelNode === 'string' ? <InputLabel>{labelNode}</InputLabel> : labelNode}</>
      )}
      <HStack>
        {!!prependNode && <>{prependNode}</>}
        <div
          style={{ borderColor, ...inputBorderRadius }}
          className={cx(inputBaseAreaStyles, borderStyle)}
        >
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
