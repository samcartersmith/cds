import { ViewStyle } from 'react-native';
import { BorderedStyles, ElevationLevels } from '@cbhq/cds-common2';
import { ThemeVars } from '@cbhq/cds-common2/new/vars';
import { borderRadius as borderRadii } from '@cbhq/cds-common2/tokens/borderRadius';
import { borderWidth as borderWidthTokens } from '@cbhq/cds-common2/tokens/borderWidth';
import { memoize } from '@cbhq/cds-common2/utils/memoize';

import { Theme } from '../core/theme';

export type BorderStyles = ViewStyle;

export type GetBorderStyleParams = Omit<BorderedStyles, 'borderRadius'> & {
  borderWidth?: ThemeVars.BorderWidth;
  borderRadius?: ThemeVars.BorderRadius | number;
  elevation?: ElevationLevels;
  theme: Theme;
};

function getCacheKey({
  bordered,
  borderedTop,
  borderedBottom,
  borderedStart,
  borderedEnd,
  borderedHorizontal,
  borderedVertical,
  borderRadius,
  borderColor,
  borderWidth,
  elevation,
  theme,
}: GetBorderStyleParams) {
  return `${
    elevation ? `elevation-${elevation}` : 'no-elevation'
  }-${bordered}-${borderedTop}-${borderedBottom}-${borderedStart}-${borderedEnd}-${borderedHorizontal}-${borderedVertical}-${borderRadius}-${borderWidth}-${borderColor}`;
}

export const getBorderStyles = memoize(function getBorderStyles({
  bordered,
  borderedTop,
  borderedBottom,
  borderedStart,
  borderedEnd,
  borderedHorizontal,
  borderedVertical,
  borderRadius,
  borderColor,
  borderWidth,
  elevation,
  theme,
}: GetBorderStyleParams) {
  const styles: ViewStyle = {};

  if (borderRadius) {
    styles.borderRadius =
      typeof borderRadius === 'number' ? borderRadius : borderRadii[borderRadius];
  }

  if (bordered !== undefined) {
    styles.borderWidth = bordered ? 1 : 0;
  }

  if (borderedVertical !== undefined) {
    styles.borderTopWidth = borderedVertical ? 1 : 0;
    styles.borderBottomWidth = borderedVertical ? 1 : 0;
  }

  if (borderedHorizontal !== undefined) {
    styles.borderStartWidth = borderedHorizontal ? 1 : 0;
    styles.borderEndWidth = borderedHorizontal ? 1 : 0;
  }

  if (borderedTop !== undefined) {
    styles.borderTopWidth = borderedTop ? 1 : 0;
  }

  if (borderedBottom !== undefined) {
    styles.borderBottomWidth = borderedBottom ? 1 : 0;
  }

  if (borderedStart !== undefined) {
    styles.borderStartWidth = borderedStart ? 1 : 0;
  }

  if (borderedEnd !== undefined) {
    styles.borderEndWidth = borderedEnd ? 1 : 0;
  }

  if (Object.keys(styles).length > (borderRadius ? 1 : 0)) {
    styles.borderColor = theme.color.line;
  }

  if (borderColor) {
    styles.borderColor = theme.color[borderColor];
  }

  if (borderWidth) {
    styles.borderStyle = 'solid';
    styles.borderWidth = borderWidthTokens[borderWidth];
  }

  // When elevating, always apply a border

  // TO DO: Elevation styles
  // if (elevationConfig) {
  //   styles.borderColor = elevationConfig.getBorderColor(borderColor);
  //   styles.borderWidth = elevationConfig.getBorderWidth(borderWidth);
  // }
  return styles;
},
getCacheKey);
