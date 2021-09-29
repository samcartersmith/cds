import React, { useMemo, memo } from 'react';

import { View, ViewStyle } from 'react-native';

import { InputBaseProps } from '@cbhq/cds-common/types/InputBaseProps';
import { opacityDisabled } from '@cbhq/cds-common/tokens/interactable';

import { borderRadius } from '@cbhq/cds-common/tokens/border';
import { usePalette } from '../hooks/usePalette';
import { HStack, VStack } from '../layout';
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
  helperText,
  borderStyle,
  variant,
  label,
  testID,
  ...props
}: InputProps) {
  const palette = usePalette();
  const inputAreaStyle: ViewStyle = useMemo(() => {
    const inputBorderRadius: ViewStyle = {
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

    return {
      borderColor: variant ? palette[variant] : palette.foregroundMuted,
      borderRadius: borderRadius.input,
      flexDirection: 'row',
      flex: 1,
      ...borderStyle,
      ...inputBorderRadius,
    };
  }, [borderStyle, palette, variant, append, prepend]);

  return (
    <VStack testID={testID} width={width} gap={0.5} {...props}>
      {!!label && <>{label}</>}
      <HStack opacity={disabled ? opacityDisabled : 1}>
        {!!prepend && <>{prepend}</>}
        <View style={inputAreaStyle}>
          {!!startContent && <>{startContent}</>}
          {input}
          {!!endContent && <>{endContent}</>}
        </View>
        {!!append && <>{append}</>}
      </HStack>
      {!!helperText && <>{helperText}</>}
    </VStack>
  );
});
