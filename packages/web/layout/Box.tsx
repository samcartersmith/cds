import React, {
  createElement,
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { MotionStyle } from 'framer-motion';
import {
  ElevationChildrenProvider,
  ElevationProvider,
} from '@cbhq/cds-common/context/ElevationProvider';
import { usePinBorderRadiusStyles } from '@cbhq/cds-common/hooks/usePinBorderRadiusStyles';
import {
  BoxBaseProps,
  Display,
  ElevationLevels,
  ForwardedRef,
  ResponsiveProps,
  SharedProps,
} from '@cbhq/cds-common/types';
import { emptyObject } from '@cbhq/cds-utils';

import { useElevationStyles } from '../hooks/useElevationStyles';
import { useOffsetStyles } from '../hooks/useOffsetStyles';
import { usePinStyles } from '../hooks/usePinStyles';
import { useResponsiveConfig } from '../hooks/useResponsiveConfig';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import * as backgroundColorStyles from '../styles/backgroundColor';
import { getBorderStyles } from '../styles/border';
import * as borderColorStyles from '../styles/borderColor';
import * as borderRadii from '../styles/borderRadius';
import { overflow as overflowStyles } from '../styles/overflow';
import { responsiveClassName } from '../styles/responsive';
import { visibility as visibilityStyles } from '../styles/visibility';
import {
  ArticleAccessibilityRole,
  AsideAccessibilityRole,
  DivAccessibilityRole,
  HeaderFooterAccessibilityRole,
  MainAccessibilityRole,
  Overflow,
  SectionAccessibilityRole,
} from '../types';
import { cx } from '../utils/linaria';

import { getFlexStyles } from './getFlexStyles';

export type InferBoxRole<As> = As extends 'article'
  ? ArticleAccessibilityRole
  : As extends 'aside'
  ? AsideAccessibilityRole
  : As extends 'div'
  ? DivAccessibilityRole
  : As extends 'footer' | 'header'
  ? HeaderFooterAccessibilityRole
  : As extends 'main'
  ? MainAccessibilityRole
  : As extends 'section'
  ? SectionAccessibilityRole
  : never;

export type BoxElement =
  | 'article'
  | 'aside'
  | 'div'
  | 'footer'
  | 'header'
  | 'label'
  | 'main'
  | 'section'
  | 'nav'
  | 'ul'
  | 'ol'
  | 'li'
  | 'span';

export type BoxProps<As extends BoxElement = 'div'> = {
  /**
   * The semantic element your component will render as. Is necessary for accessibility support and assistive technologies.
   * @default div
   */
  as?: As;
  /** The display value to use in CSS display attribute.
   * @default flex
   */
  display?: Display;
  /** Semantic role while using a non-semantic element. */
  role?: InferBoxRole<As>;
  /** Sets the opacity of the element */
  opacity?: number;
  /**
   * @danger This is a migration escape hatch. It is not intended to be used normally.
   */
  className?: string;
  /**
   * @danger There may be times when you need to dynamically set styles. This comes at a performance cost, so use with caution.
   */
  style?: React.CSSProperties | MotionStyle;
  /** Specify props by device breakpoint */
  responsiveConfig?: ResponsiveProps;
  /**
   * Necessary to control roving tabindex for accessibility
   * https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex
   * */
  tabIndex?: number;
} & BoxBaseProps &
  SharedProps &
  React.AriaAttributes &
  React.DOMAttributes<Element> &
  Overflow;

type ElevationStylesContainerProps = {
  elevation: ElevationLevels;
  setElevationStyles: Dispatch<SetStateAction<React.CSSProperties>>;
};

const ElevationStylesContainer = ({
  elevation,
  setElevationStyles,
}: ElevationStylesContainerProps) => {
  const elevationStyles = useElevationStyles(elevation);

  useEffect(() => {
    if (elevationStyles !== emptyObject) {
      setElevationStyles(elevationStyles);
    }
  }, [setElevationStyles, elevationStyles]);

  return null;
};

const BoxInner = forwardRef(
  <As extends BoxElement = 'div'>(props: BoxProps<As>, forwardedRef: ForwardedRef<HTMLElement>) => {
    const {
      as = 'div',
      accessibilityLabel,
      accessibilityLabelledBy,
      background,
      children,
      display = 'flex',
      elevation,
      overflow,
      opacity,
      visibility,
      role,
      testID,
      // Flex
      alignContent,
      alignItems,
      alignSelf,
      flexBasis,
      flexDirection,
      flexGrow,
      flexShrink,
      flexWrap,
      justifyContent,
      // Border
      borderRadius,
      bordered,
      borderedTop,
      borderedBottom,
      borderedStart,
      borderedEnd,
      borderedHorizontal,
      borderedVertical,
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
      spacingTop,
      spacingBottom,
      spacingStart,
      spacingEnd,
      spacingVertical,
      spacingHorizontal,
      // Offset
      offset,
      offsetBottom,
      offsetEnd,
      offsetHorizontal,
      offsetStart,
      offsetTop,
      offsetVertical,
      dangerouslySetBackground,
      style = emptyObject,
      className,
      responsiveConfig,
      // A11y
      ...restProps
    } = props;

    const responsiveStyleClassNames = useResponsiveConfig(responsiveConfig);

    const borderRadiusStyles = usePinBorderRadiusStyles(pin, borderRadius);

    const [elevationStyles, setElevationStyles] = useState(emptyObject);

    const accessibilityProps = useMemo(() => {
      const ariaLabel = accessibilityLabel ? { 'aria-label': accessibilityLabel } : emptyObject;
      const ariaLabelledBy = accessibilityLabelledBy
        ? { 'aria-labelledby': accessibilityLabelledBy }
        : emptyObject;
      return {
        ...ariaLabel,
        ...ariaLabelledBy,
      };
    }, [accessibilityLabel, accessibilityLabelledBy]);

    const childNodes = elevation ? (
      <>
        <ElevationStylesContainer elevation={elevation} setElevationStyles={setElevationStyles} />
        <ElevationChildrenProvider>{children}</ElevationChildrenProvider>
      </>
    ) : (
      children
    );

    return createElement(
      as,
      {
        ...restProps,
        'data-testid': testID,
        ref: forwardedRef,
        className: cx(
          getFlexStyles({
            display,
            alignContent,
            alignItems,
            alignSelf,
            flexDirection,
            flexWrap,
            justifyContent,
          }),
          background && backgroundColorStyles[background === true ? 'background' : background],
          borderColor && borderColorStyles[borderColor],
          overflow && overflowStyles[overflow],
          borderRadius && borderRadii[borderRadius],
          getBorderStyles({
            elevation,
            bordered,
            borderedTop,
            borderedBottom,
            borderedStart,
            borderedEnd,
            borderedHorizontal,
            borderedVertical,
          }),
          useSpacingStyles({
            spacing,
            spacingBottom,
            spacingEnd,
            spacingHorizontal,
            spacingStart,
            spacingTop,
            spacingVertical,
          }),
          useOffsetStyles({
            offset,
            offsetBottom,
            offsetEnd,
            offsetHorizontal,
            offsetStart,
            offsetTop,
            offsetVertical,
          }),
          usePinStyles(pin, position),
          visibility && visibilityStyles[visibility],
          responsiveStyleClassNames,
          responsiveConfig && responsiveClassName,
          className,
        ),
        role,
        ...accessibilityProps,
        style: {
          ...(dangerouslySetBackground
            ? { backgroundColor: dangerouslySetBackground }
            : emptyObject),
          flexBasis,
          flexGrow,
          flexShrink,
          height,
          maxHeight,
          maxWidth,
          minHeight,
          minWidth,
          width,
          position,
          bottom,
          left,
          right,
          top,
          zIndex,
          opacity,
          borderColor,
          ...borderRadiusStyles,
          ...elevationStyles,
          ...style,
        },
      },
      childNodes,
    );
  },
);

export const Box = forwardRef(
  <As extends BoxElement = 'div'>(
    { children, ...props }: BoxProps<As>,
    forwardedRef: ForwardedRef<HTMLElement>,
  ) => {
    const boxInner = (
      <BoxInner {...props} ref={forwardedRef}>
        {children}
      </BoxInner>
    );

    if (props.elevation) {
      return <ElevationProvider elevation={props?.elevation}>{boxInner}</ElevationProvider>;
    }

    return boxInner;
  },
);

Box.displayName = 'Box';
BoxInner.displayName = 'BoxInner';
