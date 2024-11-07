import React, { forwardRef, memo, useMemo } from 'react';
import { Animated, View, ViewProps, ViewStyle } from 'react-native';
import { BoxBaseProps, ForwardedRef, SharedProps } from '@cbhq/cds-common';

import { useOffsetStyles } from '../hooks/useOffsetStyles';
import { usePinStyles } from '../hooks/usePinStyles';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { getBorderStyles } from '../styles/getBorderStyles';
import { useElevationConfig } from '../system/useElevationConfig';
import { useThemeConfig } from '../system/useThemeConfig';
import { DangerouslySetStyle, OmitStyle } from '../types';

import { OverflowGradient } from './OverflowGradient';

export type BoxProps = {
  /**
   * How to handle overflow content. When `gradient`, will fade the content out
   * using a linear gradient.
   * @default visible
   */
  overflow?: 'visible' | 'gradient' | 'hidden';
  /**
   * The aspect-ratio CSS property allows you to define the desired width-to-height ratio of an element's box
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio
   */
  aspectRatio?: React.CSSProperties['aspectRatio'] | number;
} & Omit<BoxBaseProps, 'aspectRatio'> &
  SharedProps &
  OmitStyle<ViewProps> &
  DangerouslySetStyle<ViewStyle>;

export const Box = memo(
  forwardRef(function Box(
    {
      animated,
      background,
      children,
      dangerouslySetBackground,
      style,
      elevation,
      overflow = 'visible',
      opacity,
      // Flex
      alignContent,
      alignItems = 'stretch',
      alignSelf = 'auto',
      flexBasis,
      flexDirection = 'column',
      flexGrow,
      flexShrink,
      flexWrap = 'nowrap',
      justifyContent = 'flex-start',
      // Border
      bordered,
      borderedTop,
      borderedBottom,
      borderedStart,
      borderedEnd,
      borderedHorizontal,
      borderedVertical,
      borderRadius,
      borderColor,
      // Dimension
      height,
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
      width,
      // Position
      bottom,
      left,
      position,
      right,
      top,
      zIndex,
      pin,
      // Spacing
      spacing,
      spacingBottom,
      spacingEnd,
      spacingHorizontal,
      spacingStart,
      spacingTop,
      spacingVertical,
      // Offset
      offset,
      offsetBottom,
      offsetEnd,
      offsetHorizontal,
      offsetStart,
      offsetTop,
      offsetVertical,
      aspectRatio,
      ...props
    }: BoxProps,
    forwardedRef: ForwardedRef<View>,
  ) {
    const themeConfig = useThemeConfig();
    const elevationConfig = useElevationConfig(elevation);
    const ElevationWrapperForChildren = elevationConfig?.WrapperForChildren;
    const { activeConfig } = elevationConfig?.themeConfig ?? themeConfig;
    const palette = activeConfig.rgbaStrings;
    const spacingStyles = useSpacingStyles({
      spacing,
      spacingBottom,
      spacingEnd,
      spacingHorizontal,
      spacingStart,
      spacingTop,
      spacingVertical,
    });
    const offsetStyles = useOffsetStyles({
      offset,
      offsetBottom,
      offsetEnd,
      offsetHorizontal,
      offsetStart,
      offsetTop,
      offsetVertical,
    });
    const pinStyles = usePinStyles(pin);
    const flexStyles = useMemo(
      () => ({
        alignContent,
        alignItems,
        alignSelf,
        flexBasis,
        flexDirection,
        flexGrow,
        flexShrink,
        flexWrap,
        justifyContent,
      }),
      [
        alignContent,
        alignItems,
        alignSelf,
        flexBasis,
        flexDirection,
        flexGrow,
        flexShrink,
        flexWrap,
        justifyContent,
      ],
    );
    const dimensionStyles = useMemo(
      () => ({ height, maxHeight, maxWidth, minHeight, minWidth, width, aspectRatio }),
      [height, maxHeight, maxWidth, minHeight, minWidth, width, aspectRatio],
    );
    const positionStyles = useMemo(
      () => ({
        bottom,
        left,
        position,
        right,
        top,
        zIndex,
      }),
      [bottom, left, position, right, top, zIndex],
    );
    const boxStyles = useMemo(() => {
      const styles: ViewStyle = {};

      if (dangerouslySetBackground) {
        styles.backgroundColor = dangerouslySetBackground;
      } else if (background) {
        styles.backgroundColor = palette[background === true ? 'background' : background];
      } else if (elevation) {
        // Shadows will not render without a background color
        styles.backgroundColor = palette.background;
      }

      if (opacity) {
        styles.opacity = opacity as number;
      }

      if (overflow !== 'gradient') {
        styles.overflow = overflow;
      }

      return styles;
    }, [background, dangerouslySetBackground, elevation, opacity, overflow, palette]);
    const styles = useMemo(
      () =>
        [
          getBorderStyles({
            bordered,
            borderedTop,
            borderedBottom,
            borderedStart,
            borderedEnd,
            borderedHorizontal,
            borderedVertical,
            borderRadius,
            borderColor,
            themeConfig: activeConfig,
            elevationConfig,
          }),
          elevationConfig?.styles,
          spacingStyles,
          offsetStyles,
          flexStyles,
          dimensionStyles,
          positionStyles,
          pinStyles,
          boxStyles,
          style as ViewStyle,
        ].filter(Boolean),
      [
        activeConfig,
        bordered,
        borderedTop,
        borderedBottom,
        borderedStart,
        borderedEnd,
        borderedHorizontal,
        borderedVertical,
        borderRadius,
        borderColor,
        elevationConfig,
        spacingStyles,
        offsetStyles,
        flexStyles,
        dimensionStyles,
        positionStyles,
        pinStyles,
        boxStyles,
        style,
      ],
    );

    const ViewComponent = animated ? Animated.View : View;

    return (
      <ViewComponent style={styles as ViewStyle} {...props} ref={forwardedRef}>
        {ElevationWrapperForChildren ? (
          <ElevationWrapperForChildren>{children}</ElevationWrapperForChildren>
        ) : (
          children
        )}
        {overflow === 'gradient' && <OverflowGradient />}
      </ViewComponent>
    );
  }),
);

Box.displayName = 'Box';
