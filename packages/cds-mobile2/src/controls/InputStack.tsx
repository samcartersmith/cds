/* eslint-disable react/jsx-no-useless-fragment */
import React, { memo, useMemo } from 'react';
import { Animated, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';
import { focusedInputBorderWidth, inputBorderWidth } from '@cbhq/cds-common2/tokens/input';
import { accessibleOpacityDisabled } from '@cbhq/cds-common2/tokens/interactable';
import { InputStackBaseProps, InputVariant } from '@cbhq/cds-common2/types/InputBaseProps';

import { useLayout } from '../hooks/useLayout';
import { useTheme } from '../hooks/useTheme';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { ColorSurge } from '../motion/ColorSurge';

export type InputStackProps = {
  /** Adds border styling to input  */
  borderStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  /** Border overlay to animate border when focused */
  borderFocusedStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  animated?: boolean;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
} & InputStackBaseProps;

const variantColorMap: Record<InputVariant, ThemeVars.Color> = {
  primary: 'fgPrimary',
  positive: 'fgPositive',
  negative: 'fgNegative',
  foreground: 'fg',
  foregroundMuted: 'fgMuted',
  secondary: 'bgSecondary',
};

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
  borderRadius = 200,
  borderFocusedStyle,
  focused,
  enableColorSurge,
  ...props
}: InputStackProps) {
  const theme = useTheme();
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
        variant === 'secondary'
          ? 'transparent'
          : theme.color[
              variant === 'foregroundMuted' || !variant ? 'bgLineHeavy' : variantColorMap[variant]
            ],
      flexDirection: 'row',
      flexGrow: 1,
      backgroundColor: variant === 'secondary' ? theme.color.bgSecondary : theme.color.bg,
      borderRadius: theme.borderRadius[borderRadius],
      overflow: 'hidden',
      ...inputBorderRadius,
    };
  }, [prependNode, appendNode, variant, theme.color, theme.borderRadius, borderRadius]);

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
    <VStack
      gap={0.5}
      opacity={disabled ? accessibleOpacityDisabled : 1}
      testID={testID}
      width={width}
      {...props}
    >
      {!!labelNode && <>{labelNode}</>}
      <HStack>
        {!!prependNode && <>{prependNode}</>}
        <View style={styles.inputAreaContainerStyle}>
          {focused && <Animated.View style={borderFocusedStyles} />}
          <Animated.View
            onLayout={onInputAreaLayout}
            style={inputAreaStyles}
            testID={testID && `${testID}-input-area`}
          >
            {focused && enableColorSurge && (
              <ColorSurge background={variant ? variantColorMap[variant] : undefined} />
            )}
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
