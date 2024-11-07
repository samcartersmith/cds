import { ViewStyle } from 'react-native';
import { InteractableBaseProps } from '@cbhq/cds-common/types/InteractableBaseProps';
import { ThemeConfigForSpectrum } from '@cbhq/cds-common/types/ThemeConfig';
import { memoize } from '@cbhq/cds-common/utils/memoize';

import { ElevationConfigForSpectrum } from '../system/ElevationConfigsContext';

import { getBorderStyles } from './getBorderStyles';

export type InteractableStyles = {
  staticStyles: ViewStyle;
  pressedStyles: ViewStyle;
  disabledStyles: ViewStyle;
  contentStyles: {
    pressed: ViewStyle;
    disabled: ViewStyle;
  };
};

export type GetInteractableStylesParams = Pick<
  InteractableBaseProps,
  'background' | 'borderColor' | 'borderRadius' | 'borderWidth' | 'elevation'
> & {
  elevationConfig?: ElevationConfigForSpectrum;
  themeConfig: ThemeConfigForSpectrum;
};

function getCacheKey({
  background,
  borderColor,
  borderRadius,
  borderWidth,
  elevationConfig,
  themeConfig,
}: GetInteractableStylesParams) {
  const elevationName = elevationConfig
    ? `${elevationConfig.themeConfig.activeConfig.name}`
    : 'no-elevation';
  return `${themeConfig.name}-${elevationName}-${background}-${borderColor}-${borderRadius}-${borderWidth}`;
}

export const getInteractableStyles = memoize(function getInteractableStyles({
  background,
  borderColor,
  borderRadius,
  borderWidth,
  elevationConfig,
  themeConfig: contextThemeConfig,
}: GetInteractableStylesParams) {
  const themeConfig = elevationConfig?.themeConfig.activeConfig ?? contextThemeConfig;
  const borderStyles = getBorderStyles({
    borderColor,
    borderRadius,
    borderWidth,
    elevationConfig,
    themeConfig,
  });

  const wrapperStyles = {
    static: {
      ...elevationConfig?.styles,
      ...borderStyles,
      backgroundColor: themeConfig.rgbaStrings[background],
    },
    pressed: {
      backgroundColor: themeConfig.interactableTokens[background].pressed.backgroundColor,
    },
    disabled: {
      backgroundColor: themeConfig.interactableTokens[background].disabled.backgroundColor,
    },
  };

  const contentStyles = {
    pressed: { opacity: themeConfig.interactableTokens[background].pressed.contentOpacity },
    disabled: {
      opacity: themeConfig.interactableTokens[background].disabled.contentOpacity,
    },
  };
  return {
    wrapperStyles,
    contentStyles,
  };
},
getCacheKey);
