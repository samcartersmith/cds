import { ViewStyle } from 'react-native';
import { memoize } from '@cbhq/cds-common/utils/memoize';
import { ThemeConfigForSpectrum } from '@cbhq/cds-common/types/ThemeConfig';
import { InteractableBaseProps } from '@cbhq/cds-common/types/InteractableBaseProps';
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
  'backgroundColor' | 'borderColor' | 'borderRadius' | 'borderWidth' | 'elevation'
> & {
  elevationConfig?: ElevationConfigForSpectrum;
  themeConfig: ThemeConfigForSpectrum;
};

function getCacheKey({
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  elevationConfig,
  themeConfig,
}: GetInteractableStylesParams) {
  const elevationName = elevationConfig
    ? `${elevationConfig.themeConfig.activeConfig.name}`
    : 'no-elevation';
  return `${themeConfig.name}-${elevationName}-${backgroundColor}-${borderColor}-${borderRadius}-${borderWidth}`;
}

export const getInteractableStyles = memoize(function getInteractableStyles({
  backgroundColor,
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
      backgroundColor: themeConfig.rgbaStrings[backgroundColor],
    },
    pressed: {
      backgroundColor: themeConfig.interactableTokens[backgroundColor].pressed.backgroundColor,
    },
    disabled: {
      backgroundColor: themeConfig.interactableTokens[backgroundColor].disabled.backgroundColor,
    },
  };

  const contentStyles = {
    pressed: { opacity: themeConfig.interactableTokens[backgroundColor].pressed.contentOpacity },
    disabled: {
      opacity: themeConfig.interactableTokens[backgroundColor].disabled.contentOpacity,
    },
  };
  return {
    wrapperStyles,
    contentStyles,
  };
},
getCacheKey);
