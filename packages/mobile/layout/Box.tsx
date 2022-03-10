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
   * Aspect ratio controls the size of the undefined dimension of a node. Aspect ratio is a non-standard property only available in React Native and not CSS.
   *
   * On a node with a set width/height, aspect ratio controls the size of the unset dimension.
   * On a node with a set flex basis, aspect ratio controls the size of the node in the cross axis if unset.
   * On a node with a measure function, aspect ratio works as though the measure function measures the flex basis.
   * On a node with flex grow/shrink, aspect ratio controls the size of the node in the cross axis if unset.
   * Aspect ratio takes min/max dimensions into account.
   */
  aspectRatio?: number;
} & BoxBaseProps &
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
      dangerouslySetStyle,
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
      () => ({ height, maxHeight, maxWidth, minHeight, minWidth, width }),
      [height, maxHeight, maxWidth, minHeight, minWidth, width],
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
      const style: ViewStyle = {};

      if (dangerouslySetBackground) {
        style.backgroundColor = dangerouslySetBackground;
      } else if (background) {
        style.backgroundColor = palette[background === true ? 'background' : background];
      } else if (elevation) {
        // Shadows will not render without a background color
        style.backgroundColor = palette.background;
      }

      if (opacity) {
        style.opacity = opacity as number;
      }

      if (overflow !== 'gradient') {
        style.overflow = overflow;
      }

      return style;
    }, [background, dangerouslySetBackground, elevation, opacity, overflow, palette]);
    const style = useMemo(
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
          dangerouslySetStyle as ViewStyle,
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
        dangerouslySetStyle,
      ],
    );

    const ViewComponent = animated ? Animated.View : View;

    return (
      <ViewComponent style={style} {...props} ref={forwardedRef}>
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
