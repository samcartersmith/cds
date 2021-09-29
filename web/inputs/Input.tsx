import React, { memo } from 'react';

import { InputBaseProps } from '@cbhq/cds-common/types/InputBaseProps';
import { borderRadius } from '@cbhq/cds-common/tokens/border';

import { css, cx } from 'linaria';
import { usePalette } from '../hooks/usePalette';
import { HStack, VStack } from '../layout';
import { InputLabel } from './InputLabel';

const inputBaseAreaStyles = css`
  flex-direction: row;
  border-radius: ${borderRadius.input}px;
  display: flex;
  flex: 2;
`;

export type InputProps = {
  /** Adds border styling to input  */
  borderStyle?: string;
} & InputBaseProps;

export const Input = memo(function Input({
  /** CDS custom props */
  width = '100%',
  prepend,
  endContent,
  append,
  startContent,
  input,
  helperText,
  borderStyle,
  variant = 'foregroundMuted',
  label,
  testID,
  ...props
}: InputProps) {
  const borderColor = usePalette()[variant];
  const inputBorderRadius = {
    ...(prepend
      ? {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }
      : {}),
    ...(append
      ? {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }
      : {}),
  };

  return (
    <VStack testID={testID} width={width} gap={0.5} {...props}>
      {!!label && <>{typeof label === 'string' ? <InputLabel>{label}</InputLabel> : label}</>}
      <HStack>
        {!!prepend && <>{prepend}</>}
        <div
          style={{ borderColor, ...inputBorderRadius }}
          className={cx(inputBaseAreaStyles, borderStyle)}
        >
          {!!startContent && <>{startContent}</>}
          {input}
          {!!endContent && <>{endContent}</>}
        </div>
        {!!append && <>{append}</>}
      </HStack>
      {!!helperText && <>{helperText}</>}
    </VStack>
  );
});
