/* eslint-disable */
import * as baseStyles from './responsive/base';
import * as phoneStyles from './responsive/phone';
import * as tabletStyles from './responsive/tablet';
import * as desktopStyles from './responsive/desktop';
import type { TypeOrNumber } from '@cbhq/cds-common2/types/TypeOrNumber';

/**
 * Style props that set classnames but not inline style CSS Variables.
 */
export type StaticStyleProps = {
  [key in keyof Omit<typeof baseStyles, 'dynamic'>]?: TypeOrNumber<keyof (typeof baseStyles)[key]>;
};

/**
 * Style props that set inline style CSS Variables, and classnames that consume those CSS Variables.
 */
export type DynamicStyleProps = {
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
  minWidth?: React.CSSProperties['minWidth'];
  minHeight?: React.CSSProperties['minHeight'];
  maxWidth?: React.CSSProperties['maxWidth'];
  maxHeight?: React.CSSProperties['maxHeight'];
  aspectRatio?: React.CSSProperties['aspectRatio'];
  top?: React.CSSProperties['top'];
  bottom?: React.CSSProperties['bottom'];
  left?: React.CSSProperties['left'];
  right?: React.CSSProperties['right'];
  transform?: React.CSSProperties['transform'];
  flexBasis?: React.CSSProperties['flexBasis'];
  flexGrow?: React.CSSProperties['flexGrow'];
  flexShrink?: React.CSSProperties['flexShrink'];
  gridTemplateColumns?: React.CSSProperties['gridTemplateColumns'];
  gridTemplateRows?: React.CSSProperties['gridTemplateRows'];
  gridTemplateAreas?: React.CSSProperties['gridTemplateAreas'];
  gridTemplate?: React.CSSProperties['gridTemplate'];
  gridAutoColumns?: React.CSSProperties['gridAutoColumns'];
  gridAutoRows?: React.CSSProperties['gridAutoRows'];
  gridAutoFlow?: React.CSSProperties['gridAutoFlow'];
  grid?: React.CSSProperties['grid'];
  gridRowStart?: React.CSSProperties['gridRowStart'];
  gridColumnStart?: React.CSSProperties['gridColumnStart'];
  gridRowEnd?: React.CSSProperties['gridRowEnd'];
  gridColumnEnd?: React.CSSProperties['gridColumnEnd'];
  gridRow?: React.CSSProperties['gridRow'];
  gridColumn?: React.CSSProperties['gridColumn'];
  gridArea?: React.CSSProperties['gridArea'];
  opacity?: React.CSSProperties['opacity'];
  zIndex?: React.CSSProperties['zIndex'];
};

/**
 * DynamicStyleProps that should have "px" concatenated if they are numbers and not equal to zero.
 */
export const dynamicPixelProps = {
  width: 1,
  height: 1,
  minWidth: 1,
  minHeight: 1,
  maxWidth: 1,
  maxHeight: 1,
  top: 1,
  bottom: 1,
  left: 1,
  right: 1,
  flexBasis: 1,
} as const satisfies Partial<Record<keyof DynamicStyleProps, 1>>;

export type ResponsiveProps<T> = {
  [key in keyof T]?: T[key] | { base?: T[key]; phone?: T[key]; tablet?: T[key]; desktop?: T[key] };
};

export type StyleProps = ResponsiveProps<StaticStyleProps> & ResponsiveProps<DynamicStyleProps>;

export const getStyles = (styleProps: StyleProps, inlineStyle?: React.CSSProperties) => {
  const style: Record<string, unknown> = {};
  let className = '';

  for (const styleProp in styleProps) {
    const value = styleProps[styleProp as keyof DynamicStyleProps];
    if (typeof value === 'undefined') continue;

    // If it's a dynamic style prop...
    if (typeof baseStyles.dynamic[styleProp as keyof typeof baseStyles.dynamic] !== 'undefined') {
      const isPixelProp = dynamicPixelProps[styleProp as keyof typeof dynamicPixelProps];
      // Set the value as an inline style CSS variable, and add the corresponding classname that consumes it
      if (typeof value !== 'object') {
        style['--' + styleProp] =
          isPixelProp && typeof value === 'number' && value !== 0 ? value + 'px' : value;
        className += ' ' + baseStyles.dynamic[styleProp as keyof DynamicStyleProps];
        continue;
      }
      // If it's an object, treat it as a responsive style:
      if (typeof value.base !== 'undefined') {
        style['--' + styleProp] =
          isPixelProp && typeof value.base === 'number' && value.base !== 0
            ? value.base + 'px'
            : value.base;
        className += ' ' + baseStyles.dynamic[styleProp as keyof DynamicStyleProps];
      }
      if (typeof value.phone !== 'undefined') {
        style['--phone-' + styleProp] =
          isPixelProp && typeof value.phone === 'number' && value.phone !== 0
            ? value.phone + 'px'
            : value.phone;
        className += ' ' + phoneStyles.dynamic[styleProp as keyof DynamicStyleProps];
      }
      if (typeof value.tablet !== 'undefined') {
        style['--tablet-' + styleProp] =
          isPixelProp && typeof value.tablet === 'number' && value.tablet !== 0
            ? value.tablet + 'px'
            : value.tablet;
        className += ' ' + tabletStyles.dynamic[styleProp as keyof DynamicStyleProps];
      }
      if (typeof value.desktop !== 'undefined') {
        style['--minDesktop-' + styleProp] =
          isPixelProp && typeof value.desktop === 'number' && value.desktop !== 0
            ? value.desktop + 'px'
            : value.desktop;
        className += ' ' + desktopStyles.dynamic[styleProp as keyof DynamicStyleProps];
      }
      continue;
    }

    // Otherwise, if it's a static style prop...

    // @ts-expect-error - Key type
    if (typeof value !== 'object') className += ' ' + baseStyles[styleProp][value];
    else {
      // If it's an object, treat it as a responsive style: add the corresponding classnames
      if (typeof value.base !== 'undefined')
        // @ts-expect-error - Key type
        className += ' ' + baseStyles[styleProp][value.base];
      if (typeof value.phone !== 'undefined')
        // @ts-expect-error - Key type
        className += ' ' + phoneStyles[styleProp][value.phone];
      if (typeof value.tablet !== 'undefined')
        // @ts-expect-error - Key type
        className += ' ' + tabletStyles[styleProp][value.tablet];
      if (typeof value.desktop !== 'undefined')
        // @ts-expect-error - Key type
        className += ' ' + desktopStyles[styleProp][value.desktop];
    }
  }

  for (const key in inlineStyle) {
    style[key] = inlineStyle[key as keyof typeof inlineStyle];
  }

  return { style: style as React.CSSProperties, className };
};
