import React, {
  useMemo,
  memo,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  forwardRef,
} from 'react';

import { BoxBaseProps, ElevationLevels, ForwardedRef, SharedProps } from '@cbhq/cds-common';
import {
  ElevationProvider,
  ElevationChildrenProvider,
} from '@cbhq/cds-common/context/ElevationProvider';
import { Animated, View, ViewProps, ViewStyle } from 'react-native';

import { useBorderStyles } from '../hooks/useBorderStyles';
import { useElevationStyles } from '../hooks/useElevationStyles';
import { useOffsetStyles } from '../hooks/useOffsetStyles';
import { usePalette } from '../hooks/usePalette';
import { usePinStyles } from '../hooks/usePinStyles';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { OmitStyle, DangerouslySetStyle } from '../types';
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
  forwardRef(({ children, ...props }: BoxProps, forwardedRef: ForwardedRef<View>) => {
    const boxInner = (
      <BoxInner {...props} ref={forwardedRef}>
        {children}
      </BoxInner>
    );

    if (props.elevation) {
      return <ElevationProvider elevation={props?.elevation}>{boxInner}</ElevationProvider>;
    }

    return boxInner;
  }),
);

type ElevationStylesContainerProps = {
  elevation: ElevationLevels;
  setElevationStyles: Dispatch<SetStateAction<ViewStyle | undefined>>;
};

const ElevationStylesContainer = ({
  elevation,
  setElevationStyles,
}: ElevationStylesContainerProps) => {
  const elevationStyles = useElevationStyles(elevation);

  useEffect(() => {
    if (elevationStyles) {
      setElevationStyles(elevationStyles);
    }
  }, [setElevationStyles, elevationStyles]);

  return null;
};

export const BoxInner = memo(
  forwardRef(
    (
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
    ) => {
      const [elevationStyles, setElevationStyles] = useState<ViewStyle | undefined>(undefined);

      const palette = usePalette();
      const borderStyles = useBorderStyles({
        bordered,
        borderedTop,
        borderedBottom,
        borderedStart,
        borderedEnd,
        borderedHorizontal,
        borderedVertical,
        borderRadius,
        borderColor,
        elevation,
      });
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
            borderStyles,
            elevationStyles,
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
          borderStyles,
          elevationStyles,
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

      const childNodes = elevation ? (
        <>
          <ElevationStylesContainer elevation={elevation} setElevationStyles={setElevationStyles} />
          <ElevationChildrenProvider>{children}</ElevationChildrenProvider>
        </>
      ) : (
        children
      );

      return (
        <ViewComponent style={style} {...props} ref={forwardedRef}>
          {childNodes}
          {overflow === 'gradient' && <OverflowGradient />}
        </ViewComponent>
      );
    },
  ),
);

Box.displayName = 'Box';
