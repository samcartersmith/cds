import React, { useMemo } from 'react';

import { BoxBaseProps, ElevationLevels } from '@cds/common';
import { usePalette } from '@cds/theme/native';
import { Animated, View, ViewProps, ViewStyle } from 'react-native';

import { useElevationStyles } from '../hooks/useElevationStyles';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { OmitStyle, DangerouslySetStyle } from '../types';

// TODO pin? onPress?
export interface BoxProps
  extends BoxBaseProps,
    OmitStyle<ViewProps>,
    DangerouslySetStyle<ViewStyle> {
  /**
   * Determines box shadow styles. Parent should have overflow set to visible to ensure styles are not clipped.
   */
  elevation?: ElevationLevels;
  overflow?: 'visible' | 'gradient';
}

const InternalBox = ({
  animated,
  background = 'background',
  bordered,
  children,
  dangerouslySetStyle,
  elevation,
  // overflow = 'visible', TODO
  rounded,
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
  // Spacing
  spacing,
  spacingBottom,
  spacingEnd,
  spacingHorizontal,
  spacingStart,
  spacingTop,
  spacingVertical,
  ...props
}: BoxProps) => {
  const palette = usePalette();
  const elevationStyles = useElevationStyles(elevation);
  const spacingStyles = useSpacingStyles({
    all: spacing,
    bottom: spacingBottom,
    end: spacingEnd,
    horizontal: spacingHorizontal,
    start: spacingStart,
    top: spacingTop,
    vertical: spacingVertical,
  });
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
    ]
  );
  const dimensionStyles = useMemo(
    () => ({ height, maxHeight, maxWidth, minHeight, minWidth, width }),
    [height, maxHeight, maxWidth, minHeight, minWidth, width]
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
    [bottom, left, position, right, top, zIndex]
  );
  const boxStyles = useMemo(() => {
    const style: ViewStyle = {
      backgroundColor: palette[background],
    };

    if (bordered) {
      style.borderWidth = 1; // TODO
      style.borderColor = palette.stroke;
    }

    if (rounded) {
      style.borderRadius = 10;
    }

    return style;
  }, [background, bordered, rounded, palette]);
  const style = useMemo(
    () =>
      [
        elevationStyles,
        spacingStyles,
        flexStyles,
        dimensionStyles,
        positionStyles,
        boxStyles,
        dangerouslySetStyle as ViewStyle,
      ].filter(Boolean),
    [
      elevationStyles,
      spacingStyles,
      flexStyles,
      dimensionStyles,
      positionStyles,
      boxStyles,
      dangerouslySetStyle,
    ]
  );

  const ViewComponent = animated ? Animated.View : View;

  return (
    <ViewComponent style={style} {...props}>
      {children}
      {/* overflow === 'gradient' ? <OverflowGradient /> : null */}
    </ViewComponent>
  );
};

export const Box = React.memo(InternalBox);
