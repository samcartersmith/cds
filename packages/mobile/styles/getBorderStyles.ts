import { ViewStyle } from 'react-native';
import {
  BorderedStyles,
  BorderRadius,
  BorderWidth,
  ThemeConfigForSpectrum,
} from '@cbhq/cds-common';
import {
  borderRadius as borderRadii,
  borderWidth as borderWidthTokens,
} from '@cbhq/cds-common/tokens/border';
import { memoize } from '@cbhq/cds-common/utils/memoize';

import { ElevationConfigForSpectrum } from '../system/createElevationConfigForSpectrum';

export type BorderStyles = ViewStyle;

export type GetBorderStyleParams = Omit<BorderedStyles, 'borderRadius'> & {
  borderWidth?: BorderWidth;
  borderRadius?: BorderRadius | number;
  elevationConfig?: ElevationConfigForSpectrum;
  themeConfig: ThemeConfigForSpectrum;
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
  elevationConfig,
  themeConfig,
}: GetBorderStyleParams) {
  return `${themeConfig.name}-${
    elevationConfig?.themeConfig?.activeConfig.name ?? 'no-elevation'
  }-${bordered}-${borderedTop}-${borderedBottom}-${borderedStart}-${borderedEnd}-${borderedHorizontal}-${borderedVertical}-${borderRadius}-${borderWidth}-${borderColor}-${
    elevationConfig?.level
  }`;
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
  elevationConfig,
  themeConfig,
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
    styles.borderColor = themeConfig.rgbaStrings.line;
  }

  if (borderColor) {
    styles.borderColor = themeConfig.rgbaStrings[borderColor];
  }

  if (borderWidth) {
    styles.borderStyle = 'solid';
    styles.borderWidth = borderWidthTokens[borderWidth];
  }

  // When elevating, always apply a border
  if (elevationConfig) {
    styles.borderColor = elevationConfig.getBorderColor(borderColor);
    styles.borderWidth = elevationConfig.getBorderWidth(borderWidth);
  }
  return styles;
},
getCacheKey);
