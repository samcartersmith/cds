import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import {
  AccessibilityProps,
  GestureResponderEvent,
  Pressable as BasePressable,
  PressableProps as BasePressableProps,
  View,
} from 'react-native';
import { ComponentEventHandlerProps } from '@cbhq/cds-common2';
import { useEventHandler } from '@cbhq/cds-common2/hooks/useEventHandler';

import { usePressAnimation } from '../hooks/usePressAnimation';
import { type BoxBaseProps } from '../layout/Box';
import { HapticFeedbackType } from '../types';
import { debounce } from '../utils/debounce';
import { Haptics } from '../utils/haptics';

import { Interactable, type InteractableBaseProps } from './Interactable';

export type LinkableProps = Pick<
  BasePressableProps,
  'onPress' | 'accessibilityLabel' | 'accessibilityHint'
>;

export type PressableProps = {
  /**
   * Haptic feedback to trigger when being pressed.
   * @default none
   */
  feedback?: HapticFeedbackType;
  /** Is the element currenty loading. */
  loading?: boolean;
  /**
   * The amount of time to wait (in milliseconds) before invoking the debounced function.
   * This prop is used in conjunction with the `disableDebounce` prop.
   * The debounce function is configured to be invoked as soon as it's called, but subsequent calls
   * within the `debounceTime` period will be ignored.
   * @default 500
   */
  debounceTime?: number;
  /**
   * React Native is historically trash at debouncing touch events. This can cause a lot of
   * unwanted behavior such as double navigations where we push a screen onto the stack 2 times.
   * Debouncing the event 500 miliseconds, but taking the leading event prevents this effect and
   * the accidental "double-tap".
   */
  disableDebounce?: boolean;
} & Pick<
  BasePressableProps,
  'delayLongPress' | 'hitSlop' | 'onLongPress' | 'onPress' | 'pressRetentionOffset' | 'testID'
> &
  ComponentEventHandlerProps &
  AccessibilityProps;

export type PressableInternalProps = {
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
  /** Callback fired before `onPress` when button is pressed. */
  onPressIn?: (event: GestureResponderEvent) => void;
  /** Callback fired before `onPress` when button is released. */
  onPressOut?: (event: GestureResponderEvent) => void;
  /**
   * Pressable will always be the outermost component so that we can handle overflow within a child without impacting hitSlop.
   * Pass any styles that impact layout to this prop (i.e width, flex-direction, etc).
   */
  style?: BasePressableProps['style'];
} & PressableProps &
  Omit<InteractableBaseProps, 'pressed' | 'style'> &
  BoxBaseProps;

export const Pressable = memo(
  forwardRef(function Pressable(
    {
      // Interactable
      children,
      disabled,
      background,
      block,
      borderColor,
      borderRadius,
      borderWidth,
      elevation,
      contentStyle,
      wrapperStyles,
      blendStyles,
      transparentWhileInactive,
      transparentWhilePressed,
      pin,
      bordered,
      borderedTop,
      borderedBottom,
      borderedStart,
      borderedEnd,
      borderedHorizontal,
      borderedVertical,
      dangerouslySetBackground,
      display,
      position,
      overflow,
      zIndex,
      gap,
      columnGap,
      rowGap,
      justifyContent,
      alignContent,
      alignItems,
      alignSelf,
      flexDirection,
      flexWrap,
      color,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderTopWidth,
      borderEndWidth,
      borderBottomWidth,
      borderStartWidth,
      font,
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
      textDecorationStyle,
      textDecorationColor,
      textDecorationLine,
      textTransform,
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingStart,
      paddingEnd,
      margin,
      marginX,
      marginY,
      marginTop,
      marginBottom,
      marginStart,
      marginEnd,
      userSelect,
      width,
      height,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      aspectRatio,
      top,
      bottom,
      left,
      right,
      transform,
      flexBasis,
      flexShrink,
      flexGrow,
      opacity,
      // Pressable
      disableDebounce,
      feedback = 'none',
      loading,
      onPress,
      onPressIn,
      onPressOut,
      noScaleOnPress,
      style,
      eventConfig,
      analyticsId,
      debounceTime,
      ...props
    }: PressableInternalProps,
    forwardedRef: React.ForwardedRef<View>,
  ) {
    const [pressIn, pressOut, pressScale] = usePressAnimation();
    const [pressed, setPressed] = useState(false);

    const onEventHandler = useEventHandler('Button', 'onPress', eventConfig, analyticsId);

    const onPressHandler = useMemo(
      () => (event: GestureResponderEvent) => {
        if (feedback === 'light') void Haptics.lightImpact();
        else if (feedback === 'normal') void Haptics.normalImpact();
        else if (feedback === 'heavy') void Haptics.heavyImpact();
        onPress?.(event);
        onEventHandler();
      },
      [feedback, onEventHandler, onPress],
    );

    const debouncedOnPressHandler = useMemo(
      () => debounce(onPressHandler, debounceTime),
      [debounceTime, onPressHandler],
    );

    const handlePress = useCallback(
      (event: GestureResponderEvent) => {
        if (!disableDebounce) debouncedOnPressHandler(event);
        else onPressHandler(event);
      },
      [disableDebounce, debouncedOnPressHandler, onPressHandler],
    );

    const handlePressIn = useCallback(
      (event: GestureResponderEvent) => {
        setPressed(true);
        pressIn(event);
        onPressIn?.(event);
      },
      [pressIn, onPressIn],
    );

    const handlePressOut = useCallback(
      (event: GestureResponderEvent) => {
        setPressed(false);
        pressOut(event);
        onPressOut?.(event);
      },
      [pressOut, onPressOut],
    );

    const accessibilityState = useMemo(
      () => ({ busy: loading, disabled: !!disabled }),
      [loading, disabled],
    );

    const scaleOnPressStyle = useMemo(() => [{ transform: [{ scale: pressScale }] }], [pressScale]);

    return (
      <BasePressable
        ref={forwardedRef}
        accessibilityRole="button"
        accessibilityState={accessibilityState}
        disabled={disabled || loading}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={style}
        {...props}
      >
        <Interactable
          alignContent={alignContent}
          alignItems={alignItems}
          alignSelf={alignSelf}
          aspectRatio={aspectRatio}
          background={background}
          blendStyles={blendStyles}
          block={block}
          borderBottomLeftRadius={borderBottomLeftRadius}
          borderBottomRightRadius={borderBottomRightRadius}
          borderBottomWidth={borderBottomWidth}
          borderColor={borderColor}
          borderEndWidth={borderEndWidth}
          borderRadius={borderRadius}
          borderStartWidth={borderStartWidth}
          borderTopLeftRadius={borderTopLeftRadius}
          borderTopRightRadius={borderTopRightRadius}
          borderTopWidth={borderTopWidth}
          borderWidth={borderWidth}
          bordered={bordered}
          borderedBottom={borderedBottom}
          borderedEnd={borderedEnd}
          borderedHorizontal={borderedHorizontal}
          borderedStart={borderedStart}
          borderedTop={borderedTop}
          borderedVertical={borderedVertical}
          bottom={bottom}
          color={color}
          columnGap={columnGap}
          contentStyle={contentStyle}
          dangerouslySetBackground={dangerouslySetBackground}
          disabled={disabled}
          display={display}
          elevation={elevation}
          flexBasis={flexBasis}
          flexDirection={flexDirection}
          flexGrow={flexGrow}
          flexShrink={flexShrink}
          flexWrap={flexWrap}
          font={font}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
          gap={gap}
          height={height}
          justifyContent={justifyContent}
          left={left}
          lineHeight={lineHeight}
          margin={margin}
          marginBottom={marginBottom}
          marginEnd={marginEnd}
          marginStart={marginStart}
          marginTop={marginTop}
          marginX={marginX}
          marginY={marginY}
          maxHeight={maxHeight}
          maxWidth={maxWidth}
          minHeight={minHeight}
          minWidth={minWidth}
          opacity={opacity}
          overflow={overflow}
          padding={padding}
          paddingBottom={paddingBottom}
          paddingEnd={paddingEnd}
          paddingStart={paddingStart}
          paddingTop={paddingTop}
          paddingX={paddingX}
          paddingY={paddingY}
          pin={pin}
          position={position}
          pressed={pressed || loading} // loading shares the same styles as pressed
          right={right}
          rowGap={rowGap}
          style={!noScaleOnPress ? scaleOnPressStyle : undefined}
          textDecorationColor={textDecorationColor}
          textDecorationLine={textDecorationLine}
          textDecorationStyle={textDecorationStyle}
          textTransform={textTransform}
          top={top}
          transform={transform}
          transparentWhileInactive={transparentWhileInactive}
          transparentWhilePressed={transparentWhilePressed}
          userSelect={userSelect}
          width={width}
          wrapperStyles={wrapperStyles}
          zIndex={zIndex}
        >
          {children}
        </Interactable>
      </BasePressable>
    );
  }),
);
