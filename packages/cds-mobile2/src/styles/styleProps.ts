/* eslint-disable */
import { ThemeVars } from '@cbhq/cds-common2/core/theme';
import type { ViewStyle, TextStyle } from 'react-native';
import type { Theme } from '../core/theme';
import type { TypeOrNumber } from '@cbhq/cds-common2/types/TypeOrNumber';
import { ElevationLevels } from '@cbhq/cds-common2/types/ElevationLevels';
import { TextAlignProps } from '@cbhq/cds-common2/types/TextBaseProps';
import { DimensionValue, Position } from '@cbhq/cds-common2';

type NegativeSpace = TypeOrNumber<'0' | `-${Exclude<ThemeVars.Space, 0>}`>;

// TO DO: Refactor DimensionValue to ViewStyle['width'] etc
export type StyleProps = {
  color?: ThemeVars.Color;
  background?: ThemeVars.Color;
  borderColor?: ThemeVars.Color;
  borderWidth?: ThemeVars.BorderWidth;
  borderTopWidth?: ThemeVars.BorderWidth;
  borderRightWidth?: ThemeVars.BorderWidth;
  borderBottomWidth?: ThemeVars.BorderWidth;
  borderLeftWidth?: ThemeVars.BorderWidth;
  borderRadius?: ThemeVars.BorderRadius;
  borderTopLeftRadius?: ThemeVars.BorderRadius;
  borderTopRightRadius?: ThemeVars.BorderRadius;
  borderBottomLeftRadius?: ThemeVars.BorderRadius;
  borderBottomRightRadius?: ThemeVars.BorderRadius;
  fontFamily?: ThemeVars.FontFamily;
  fontSize?: ThemeVars.FontSize;
  fontWeight?: ThemeVars.FontWeight;
  lineHeight?: ThemeVars.LineHeight;
  font?: ThemeVars.FontFamily;
  textDecorationStyle?: TextStyle['textDecorationStyle'];
  textDecorationLine?: TextStyle['textDecorationLine'];
  textDecorationColor?: ThemeVars.Color;
  textTransform?: TextStyle['textTransform'];
  userSelect?: TextStyle['userSelect'];
  display?: ViewStyle['display'];
  overflow?: ViewStyle['overflow'];
  gap?: ThemeVars.Space;
  columnGap?: ThemeVars.Space;
  rowGap?: ThemeVars.Space;
  justifyContent?: ViewStyle['justifyContent'];
  alignContent?: ViewStyle['alignContent'];
  alignItems?: ViewStyle['alignItems'];
  alignSelf?: ViewStyle['alignSelf'];
  flexDirection?: ViewStyle['flexDirection'];
  flexWrap?: ViewStyle['flexWrap'];
  position?: Position;
  // position?: ViewStyle['position'];
  zIndex?: ThemeVars.ZIndex;
  padding?: ThemeVars.Space;
  paddingX?: ThemeVars.Space;
  paddingY?: ThemeVars.Space;
  paddingTop?: ThemeVars.Space;
  paddingBottom?: ThemeVars.Space;
  paddingLeft?: ThemeVars.Space;
  paddingRight?: ThemeVars.Space;
  margin?: NegativeSpace;
  marginX?: NegativeSpace;
  marginY?: NegativeSpace;
  marginTop?: NegativeSpace;
  marginBottom?: NegativeSpace;
  marginLeft?: NegativeSpace;
  marginRight?: NegativeSpace;
  elevation?: ElevationLevels;
  textAlign?: TextStyle['textAlign'];
  width?: DimensionValue;
  height?: DimensionValue;
  minWidth?: DimensionValue;
  minHeight?: DimensionValue;
  maxWidth?: DimensionValue;
  maxHeight?: DimensionValue;
  // width?: ViewStyle['width'];
  // height?: ViewStyle['height'];
  // minWidth?: ViewStyle['minWidth'];
  // minHeight?: ViewStyle['minHeight'];
  // maxWidth?: ViewStyle['maxWidth'];
  // maxHeight?: ViewStyle['maxHeight'];
  aspectRatio?: ViewStyle['aspectRatio'];
  top?: DimensionValue;
  bottom?: DimensionValue;
  left?: DimensionValue;
  right?: DimensionValue;
  // top?: ViewStyle['top'];
  // bottom?: ViewStyle['bottom'];
  // left?: ViewStyle['left'];
  // right?: ViewStyle['right'];
  transform?: ViewStyle['transform'];
  flexBasis?: DimensionValue;
  // flexBasis?: ViewStyle['flexBasis'];
  flexGrow?: ViewStyle['flexGrow'];
  flexShrink?: ViewStyle['flexShrink'];
  opacity?: ViewStyle['opacity'];
  align?: TextAlignProps['align'];
};

/** StyleProps that get their values from the theme. */
export const themedStyleProps = {
  color: 'color',
  background: 'color',
  borderColor: 'color',
  borderWidth: 'borderWidth',
  borderTopWidth: 'borderWidth',
  borderRightWidth: 'borderWidth',
  borderBottomWidth: 'borderWidth',
  borderLeftWidth: 'borderWidth',
  borderRadius: 'borderRadius',
  borderTopLeftRadius: 'borderRadius',
  borderTopRightRadius: 'borderRadius',
  borderBottomLeftRadius: 'borderRadius',
  borderBottomRightRadius: 'borderRadius',
  fontFamily: 'fontFamily',
  fontSize: 'fontSize',
  fontWeight: 'fontWeight',
  lineHeight: 'lineHeight',
  font: 'fontFamily',
  textDecorationColor: 'color',
  gap: 'space',
  columnGap: 'space',
  rowGap: 'space',
  zIndex: 'zIndex',
  padding: 'space',
  paddingX: 'space',
  paddingY: 'space',
  paddingTop: 'space',
  paddingBottom: 'space',
  paddingLeft: 'space',
  paddingRight: 'space',
  margin: 'space',
  marginX: 'space',
  marginY: 'space',
  marginTop: 'space',
  marginBottom: 'space',
  marginLeft: 'space',
  marginRight: 'space',
} as const satisfies { [key in keyof StyleProps]: keyof Theme };

/** For StyleProps whose names are not keys of ViewStyle & TextStyle, this maps those StyleProp names to their ViewStyle & TextStyle keys. */
const stylePropAliases = {
  align: ['textAlign'],
  background: ['backgroundColor'],
  font: ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight'],
  paddingX: ['paddingLeft', 'paddingRight'],
  paddingY: ['paddingTop', 'paddingBottom'],
  marginX: ['marginLeft', 'marginRight'],
  marginY: ['marginTop', 'marginBottom'],
} as const satisfies { [key in keyof StyleProps]: (keyof (ViewStyle & TextStyle))[] };

/**
 * StyleProps that should have "px" concatenated if they are numbers and not equal to zero.
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
} as const;

export const getStyles = (styleProps: StyleProps, theme: Theme) => {
  const style: ViewStyle | TextStyle = {};

  for (const styleProp in styleProps) {
    const value = styleProps[styleProp as keyof StyleProps];
    if (typeof value === 'undefined') continue;

    // If there are no stylePropAliases for this styleProp...
    if (typeof stylePropAliases[styleProp as keyof typeof stylePropAliases] === 'undefined') {
      // If it's not themed...
      if (typeof themedStyleProps[styleProp as keyof typeof themedStyleProps] === 'undefined') {
        // const isPixelProp = dynamicPixelProps[styleProp as keyof typeof dynamicPixelProps];
        // style[styleProp as keyof typeof style] = isPixelProp && typeof value === 'number' && value !== 0 ? value + 'px' : value;
        style[styleProp as keyof typeof style] = value as any;
      }
      // If it is themed...
      else {
        style[styleProp as keyof typeof style] = (
          theme[themedStyleProps[styleProp as keyof typeof themedStyleProps]] as any
        )[value as any];
      }
    } else {
      for (const propAlias in stylePropAliases[styleProp as keyof typeof stylePropAliases]) {
        // If it's not themed...
        if (typeof themedStyleProps[propAlias as keyof typeof themedStyleProps] === 'undefined') {
          // const isPixelProp = dynamicPixelProps[stylePropAlias as keyof typeof dynamicPixelProps];
          // style[stylePropAlias as keyof typeof style] = isPixelProp && typeof value === 'number' && value !== 0 ? value + 'px' : value;
          style[propAlias as keyof typeof style] = value as any;
        }
        // If it is themed...
        else {
          style[propAlias as keyof typeof style] = (
            theme[themedStyleProps[propAlias as keyof typeof themedStyleProps]] as any
          )[value as any];
        }
      }
    }
  }

  return style;
};

export const getViewStyles: (styleProps: StyleProps, theme: Theme) => ViewStyle = getStyles;
export const getTextStyles: (styleProps: StyleProps, theme: Theme) => TextStyle = getStyles;
