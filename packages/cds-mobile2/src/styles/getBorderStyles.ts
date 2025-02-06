import { ViewStyle } from 'react-native';
import { BorderedStyles, ElevationLevels } from '@cbhq/cds-common2';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';

import { Theme } from '../core/theme';

export type BorderStyles = ViewStyle;

export type GetBorderStyleParams = Omit<BorderedStyles, 'borderRadius'> & {
  borderWidth?: ThemeVars.BorderWidth;
  borderRadius?: ThemeVars.BorderRadius;
  elevation?: ElevationLevels;
  theme: Theme;
};

export const getBorderStyles = ({
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
  theme,
  elevation,
}: GetBorderStyleParams) => {
  const styles: ViewStyle = {};

  if (borderRadius) {
    styles.borderRadius = theme.borderRadius[borderRadius];
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
    styles.borderColor = theme.color.bgLine;
  }

  if (borderColor) {
    styles.borderColor = theme.color[borderColor];
  }

  if (borderWidth) {
    styles.borderStyle = 'solid';
    styles.borderWidth = theme.borderWidth[borderWidth];
  }

  // When elevating, always apply a border
  if (elevation) {
    styles.borderColor = theme.color[borderColor ?? 'bgLine'];
    styles.borderWidth = theme.borderWidth[borderWidth ?? 100];
  }
  return styles;
};
