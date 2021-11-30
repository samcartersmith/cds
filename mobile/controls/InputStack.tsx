import React, { useMemo, memo } from 'react';

import { Animated, ViewStyle, StyleProp } from 'react-native';

import { InputStackBaseProps } from '@cbhq/cds-common/types/InputBaseProps';
import { opacityDisabled } from '@cbhq/cds-common/tokens/interactable';

import { borderRadius } from '@cbhq/cds-common/tokens/border';
import { usePalette } from '../hooks/usePalette';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { DangerouslySetStyle } from '../types';

export type InputStackProps = {
  /** Adds border styling to input  */
  borderStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
} & InputStackBaseProps &
  DangerouslySetStyle<ViewStyle>;

export const InputStack = memo(function InputStack({
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
  variant,
  labelNode,
  testID = '',
  ...props
}: InputStackProps) {
  const palette = usePalette();
  const inputAreaStyle: Animated.WithAnimatedValue<StyleProp<ViewStyle>> = useMemo(() => {
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

    return {
      borderColor:
        variant === 'foregroundMuted' ? palette.lineHeavy : palette[variant ?? 'lineHeavy'],
      borderRadius: borderRadius.input,
      flexDirection: 'row',
      flex: 1,
      ...inputBorderRadius,
    };
  }, [palette, variant, appendNode, prependNode]);

  return (
    <VStack testID={testID} width={width} gap={0.5} {...props}>
      {!!labelNode && <>{labelNode}</>}
      <HStack opacity={disabled ? opacityDisabled : 1}>
        {!!prependNode && <>{prependNode}</>}
        <Animated.View
          testID={testID && `${testID}-input-area`}
          style={[inputAreaStyle, borderStyle]}
        >
          {!!startNode && <>{startNode}</>}
          {inputNode}
          {!!endNode && <>{endNode}</>}
        </Animated.View>
        {!!appendNode && <>{appendNode}</>}
      </HStack>
      {!!helperTextNode && <>{helperTextNode}</>}
    </VStack>
  );
});
