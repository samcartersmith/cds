import React, { memo, useMemo } from 'react';
import { Animated, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { borderRadius as borderRadiusTokens } from '@cbhq/cds-common/tokens/border';
import { focusedInputBorderWidth, inputBorderWidth } from '@cbhq/cds-common/tokens/input';
import { opacityDisabled } from '@cbhq/cds-common/tokens/interactable';
import { InputStackBaseProps } from '@cbhq/cds-common/types/InputBaseProps';

import { useLayout } from '../hooks/useLayout';
import { usePalette } from '../hooks/usePalette';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { DangerouslySetStyle } from '../types';

export type InputStackProps = {
  /** Adds border styling to input  */
  borderStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  /** Border overlay to animate border when focused */
  borderFocusedStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
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
  borderRadius = 'input',
  borderFocusedStyle,
  focused,
  ...props
}: InputStackProps) {
  const palette = usePalette();
  const [inputAreaSize, onInputAreaLayout] = useLayout();

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
      flexDirection: 'row',
      flexGrow: 1,
      backgroundColor: palette.background,
      borderRadius: borderRadiusTokens[borderRadius],
      ...inputBorderRadius,
    };
  }, [palette, prependNode, appendNode, variant, borderRadius]);

  const inputAreaStyles = useMemo(() => {
    return [inputAreaStyle, borderStyle];
  }, [borderStyle, inputAreaStyle]);

  const borderFocusedStyles: Animated.WithAnimatedValue<StyleProp<ViewStyle>> = useMemo(() => {
    return [
      inputAreaStyle,
      borderFocusedStyle,
      {
        transform: [
          { translateX: inputAreaSize.x - inputBorderWidth },
          { translateY: inputAreaSize.y - inputBorderWidth },
        ],
        width: inputAreaSize.width + focusedInputBorderWidth,
        height: inputAreaSize.height + focusedInputBorderWidth,
        x: inputAreaSize.x,
        y: inputAreaSize.y,
        position: 'absolute',
        borderWidth: focusedInputBorderWidth,
      },
    ];
  }, [borderFocusedStyle, inputAreaSize, inputAreaStyle]);

  return (
    <VStack testID={testID} width={width} gap={0.5} {...props}>
      {!!labelNode && <>{labelNode}</>}
      <HStack opacity={disabled ? opacityDisabled : 1}>
        {!!prependNode && <>{prependNode}</>}
        <View style={styles.inputAreaContainerStyle}>
          {focused && <Animated.View style={borderFocusedStyles} />}
          <Animated.View
            onLayout={onInputAreaLayout}
            testID={testID && `${testID}-input-area`}
            style={inputAreaStyles}
          >
            {!!startNode && <>{startNode}</>}
            {inputNode}
            {!!endNode && <>{endNode}</>}
          </Animated.View>
        </View>
        {!!appendNode && <>{appendNode}</>}
      </HStack>
      {!!helperTextNode && <>{helperTextNode}</>}
    </VStack>
  );
});

// Fixes a problem found in Accordian children element.
// When `overflow: auto` is set the thickened border when focused is not accounted for
// hence you see a cutoff.
// Fix was to add this so there is always 2px outer layer space
const styles = StyleSheet.create({
  inputAreaContainerStyle: {
    padding: 1,
    flexGrow: 1,
  },
});
