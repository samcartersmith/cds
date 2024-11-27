/* eslint-disable */
import * as styles from './styles';
import * as minTabletStyles from './minTabletStyles';
import * as minDesktopStyles from './minDesktopStyles';

/** Returns number if the type T extends number, e.g. if T is a number or a number string like '2' or '5.5'. Allows for converting object keys that are numbers (such as the `space` scale vars) from string type to number type. */
export type TypeOrNumber<T> = T extends `${infer N extends number}` ? N : T;

export type StaticStyleProps = {
  [key in keyof Omit<typeof styles, 'dynamic'>]: TypeOrNumber<keyof (typeof styles)[key]>;
};

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
};

type ResponsiveStyleProps<T> = {
  [key in keyof T]?: T[key] | { base?: T[key]; minTablet?: T[key]; minDesktop?: T[key] };
};

export type StyleProps = ResponsiveStyleProps<StaticStyleProps> &
  ResponsiveStyleProps<DynamicStyleProps>;

export const getStyles = (styleProps: StyleProps, inlineStyle?: React.CSSProperties) => {
  const style: Record<string, unknown> = {};
  let className = '';

  for (const styleProp in styleProps) {
    const value = styleProps[styleProp as keyof DynamicStyleProps];
    if (typeof value === 'undefined') continue;

    // If it's a dynamic style prop...
    if (typeof styles.dynamic[styleProp as keyof typeof styles.dynamic] !== 'undefined') {
      // If it's just a single value, treat it as an inline style
      if (typeof value !== 'object') {
        style[styleProp] = value;
        continue;
      }
      // If it's an object, treat it as a responsive style:
      // Set the value as an inline style CSS variable, and add the corresponding classname that consumes it
      if (typeof value.base !== 'undefined') {
        style['--' + styleProp] = value.base;
        className += ' ' + styles.dynamic[styleProp as keyof DynamicStyleProps];
      }
      if (typeof value.minTablet !== 'undefined') {
        style['--minTablet-' + styleProp] = value.minTablet;
        className += ' ' + minTabletStyles.dynamic[styleProp as keyof DynamicStyleProps];
      }
      if (typeof value.minDesktop !== 'undefined') {
        style['--minDesktop-' + styleProp] = value.minDesktop;
        className += ' ' + minDesktopStyles.dynamic[styleProp as keyof DynamicStyleProps];
      }
      continue;
    }

    // Otherwise, if it's a static style prop...
    if (typeof value === 'object') {
      // If it's an object, treat it as a responsive style: add the corresponding classnames
      if (typeof value.base !== 'undefined')
        // @ts-expect-error - Key type
        className += ' ' + styles[styleProp][value.base];
      if (typeof value.minTablet !== 'undefined')
        // @ts-expect-error - Key type
        className += ' ' + minTabletStyles[styleProp][value.minTablet];
      if (typeof value.minDesktop !== 'undefined')
        // @ts-expect-error - Key type
        className += ' ' + minDesktopStyles[styleProp][value.minDesktop];
    }
    // @ts-expect-error - Key type
    else className += ' ' + styles[styleProp][value];
  }

  for (const key in inlineStyle) {
    style[key] = inlineStyle[key as keyof typeof inlineStyle];
  }

  return { style: style as React.CSSProperties, className };
};
