import React, {
  forwardRef,
  createElement,
  useState,
  SetStateAction,
  Dispatch,
  useEffect,
} from 'react';

import type { BoxBaseProps, ForwardedRef, SharedProps, Position } from '@cbhq/cds-common';
import {
  ElevationProvider,
  ElevationChildrenProvider,
} from '@cbhq/cds-common/context/ElevationProvider';
import { usePinBorderRadiusStyles } from '@cbhq/cds-common/hooks/usePinBorderRadiusStyles';
import { css, cx } from 'linaria';

import { emptyObject } from '@cbhq/cds-utils';
import { ElevationLevels } from '@cbhq/cds-common';
import { useElevationStyles } from '../hooks/useElevationStyles';
import { useOffsetStyles } from '../hooks/useOffsetStyles';
import { usePinStyles } from '../hooks/usePinStyles';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import * as backgroundColorStyles from '../styles/backgroundColor';
import * as borderColorStyles from '../styles/borderColor';
import { getBorderStyles } from '../styles/border';
import * as borderRadii from '../styles/borderRadius';
import { getFlexStyles } from '../styles/flex';
import {
  ArticleAccessibilityRole,
  AsideAccessibilityRole,
  CSSMap,
  DivAccessibilityRole,
  HeaderFooterAccessibilityRole,
  MainAccessibilityRole,
  SectionAccessibilityRole,
} from '../types';

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
  | 'li';

const overflowStyles: CSSMap<BoxProps['overflow']> = {
  hidden: css`
    overflow: hidden;
  `,
  scroll: css`
    overflow: scroll;
  `,
  visible: css`
    overflow: visible;
  `,
  auto: css`
    overflow: auto;
  `,
};

export type BoxProps<As extends BoxElement = 'div'> = {
  /** The semantic element to render the box as. Is necessary for accessibility support and assistive technologies. */
  as?: As;
  /** Semantic role whole using a non-semantic element. */
  role?: InferBoxRole<As>;
  /** Control how the content should overflow. */
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  /** How to position the box within its parent. */
  position?: Position;
  /** Sets the opacity of the box */
  opacity?: number;
  /**
   * @danger This is a migration escape hatch. It is not intended to be used normally.
   */
  dangerouslySetClassName?: string;
} & Omit<BoxBaseProps, 'position'> &
  SharedProps &
  React.AriaAttributes &
  React.DOMAttributes<Element>;

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

export const BoxInner = forwardRef(
  <As extends BoxElement = 'div'>(props: BoxProps<As>, forwardedRef: ForwardedRef<HTMLElement>) => {
    const {
      as = 'div',
      accessibilityLabel,
      accessibilityLabelledBy,
      background,
      elevation,
      children,
      overflow,
      opacity,
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
      dangerouslySetClassName,
      // A11y
      ...restProps
    } = props;

    const borderRadiusStyles = usePinBorderRadiusStyles(pin, borderRadius);

    const [elevationStyles, setElevationStyles] = useState(emptyObject);

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
          dangerouslySetClassName,
        ),
        role,
        'aria-label': accessibilityLabel,
        'aria-labelledby': accessibilityLabelledBy,
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
