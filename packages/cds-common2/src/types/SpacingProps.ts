import { ThemeVars } from '../core/theme';

import { TypeOrNumber } from './TypeOrNumber';

type NegativeSpace = TypeOrNumber<'0' | `-${Exclude<ThemeVars.Space, 0>}`>;

export type MarginProps = {
  /** Apply negative margin on all sides. */
  margin?: NegativeSpace;
  /** Apply negative margin on the leading and trailing sides. */
  marginX?: NegativeSpace;
  /** Apply negative margin on the top and bottom sides. */
  marginY?: NegativeSpace;
  /** Apply negative margin on the top side. */
  marginTop?: NegativeSpace;
  /** Apply negative margin on the trailing side. */
  marginRight?: NegativeSpace;
  /** Apply negative margin on the bottom side. */
  marginBottom?: NegativeSpace;
  /** Apply negative margin on the leading side. */
  marginLeft?: NegativeSpace;
};

export type PaddingProps = {
  /** Apply padding on all sides. */
  padding?: ThemeVars.Space;
  /** Apply padding on the leading and trailing sides. */
  paddingX?: ThemeVars.Space;
  /** Apply padding on the top and bottom sides. */
  paddingY?: ThemeVars.Space;
  /** Apply padding on the top side. */
  paddingTop?: ThemeVars.Space;
  /** Apply padding on the trailing side. */
  paddingRight?: ThemeVars.Space;
  /** Apply padding on the bottom side. */
  paddingBottom?: ThemeVars.Space;
  /** Apply padding on the leading side. */
  paddingLeft?: ThemeVars.Space;
};

export type InternalSpacingProps = {
  all?: ThemeVars.Space;
  top?: ThemeVars.Space;
  bottom?: ThemeVars.Space;
  start?: ThemeVars.Space;
  end?: ThemeVars.Space;
  horizontal?: ThemeVars.Space;
  vertical?: ThemeVars.Space;
  isInverted?: boolean;
};
