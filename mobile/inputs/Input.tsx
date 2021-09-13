import React, { useMemo, memo } from 'react';

import { View, ViewStyle } from 'react-native';

import { InputBaseProps } from '@cbhq/cds-common/types/InputBaseProps';
import { opacityDisabled } from '@cbhq/cds-common/tokens/interactable';

import { borderRadius } from '@cbhq/cds-common/tokens/border';
import { usePalette } from '../hooks/usePalette';
import { Box, HStack, VStack } from '../layout';
import { DangerouslySetStyle } from '../types';

export type InputProps = {
  /** Adds border styling to input  */
  borderStyle?: ViewStyle;
} & InputBaseProps &
  DangerouslySetStyle<ViewStyle>;

export const Input = memo(function Input({
  /** CDS custom props */
  width = '100%',
  prepend,
  endContent,
  append,
  startContent,
  disabled = false,
  input,
  messageArea,
  borderStyle,
  variant,
  label,
  testID,
  ...props
}: InputProps) {
  const palette = usePalette();

  const inputAreaStyle: ViewStyle = useMemo(() => {
    return {
      borderColor: variant ? palette[variant] : palette.foregroundMuted,
      borderRadius: borderRadius.input,
      flexDirection: 'row',
      flex: 1,
      ...borderStyle,
    };
  }, [borderStyle, palette, variant]);

  return (
    <VStack testID={testID} width={width} {...props}>
      {!!label && <Box spacingBottom={0.5}>{label}</Box>}
      <HStack opacity={disabled ? opacityDisabled : 1}>
        {!!prepend && <>{prepend}</>}
        <View style={inputAreaStyle}>
          {!!startContent && <>{startContent}</>}
          {input}
          {!!endContent && <>{endContent}</>}
        </View>
        {!!append && <>{append}</>}
      </HStack>
      {!!messageArea && <>{messageArea}</>}
    </VStack>
  );
});
