import React, { useMemo, memo } from 'react';

import { View, ViewStyle } from 'react-native';

import { InputBaseProps } from '@cbhq/cds-common/types/InputBaseProps';
import { opacityDisabled } from '@cbhq/cds-common/tokens/interactable';

import { borderRadius } from '@cbhq/cds-common/tokens/border';
import { usePalette } from '../hooks/usePalette';
import { HStack, VStack } from '.';
import { DangerouslySetStyle } from '../types';

export type InputStackProps = {
  /** Adds border styling to input  */
  borderStyle?: ViewStyle;
} & InputBaseProps &
  DangerouslySetStyle<ViewStyle>;

export const InputStack = memo(function InputStack({
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
  variant,
  labelNode,
  testID,
  ...props
}: InputStackProps) {
  const palette = usePalette();
  const inputAreaStyle: ViewStyle = useMemo(() => {
    const inputBorderRadius: ViewStyle = {
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

    return {
      borderColor:
        variant === 'foregroundMuted' ? palette.lineHeavy : palette[variant ?? 'lineHeavy'],
      borderRadius: borderRadius.input,
      flexDirection: 'row',
      flex: 1,
      ...borderStyle,
      ...inputBorderRadius,
    };
  }, [borderStyle, palette, variant, appendNode, prependNode]);

  return (
    <VStack testID={testID} width={`${width}%`} gap={0.5} {...props}>
      {!!labelNode && <>{labelNode}</>}
      <HStack opacity={disabled ? opacityDisabled : 1}>
        {!!prependNode && <>{prependNode}</>}
        <View style={inputAreaStyle}>
          {!!startNode && <>{startNode}</>}
          {inputNode}
          {!!endNode && <>{endNode}</>}
        </View>
        {!!appendNode && <>{appendNode}</>}
      </HStack>
      {!!helperTextNode && <>{helperTextNode}</>}
    </VStack>
  );
});
