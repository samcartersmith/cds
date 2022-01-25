import { ViewStyle } from 'react-native';
import memoize from 'lodash/memoize';
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
  | 'backgroundColor'
  | 'borderColor'
  | 'borderRadius'
  | 'borderWidth'
  | 'transparentWhileInactive'
  | 'elevation'
> & {
  elevationConfig?: ElevationConfigForSpectrum;
  themeConfig: ThemeConfigForSpectrum;
};

const getCacheKey = ({
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  transparentWhileInactive = false,
  elevationConfig,
  themeConfig,
}: GetInteractableStylesParams) => {
  const elevationName = elevationConfig
    ? `${elevationConfig.themeConfig.activeConfig.name}`
    : 'no-elevation';
  return `${themeConfig.name}-${elevationName}-${backgroundColor}-${borderColor}-${borderRadius}-${borderWidth}-${transparentWhileInactive}`;
};

export const getInteractableStyles = memoize(function getInteractableStyles({
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  transparentWhileInactive = false,
  elevationConfig,
  themeConfig: contextThemeConfig,
}: GetInteractableStylesParams) {
  const themeConfig = elevationConfig?.themeConfig.activeConfig ?? contextThemeConfig;
  const borderColorAlias = transparentWhileInactive ? 'transparent' : borderColor;
  const borderStyles = getBorderStyles({
    borderColor: borderColorAlias,
    borderRadius,
    borderWidth,
    elevationConfig,
    themeConfig,
  });

  const backgroundColorAlias = transparentWhileInactive ? 'transparent' : backgroundColor;
  const staticStyles = {
    ...elevationConfig?.styles,
    ...borderStyles,
    backgroundColor: themeConfig.rgbaStrings[backgroundColorAlias],
  };

  const pressedStyles = {
    backgroundColor: themeConfig.interactableTokens[backgroundColor].pressed.backgroundColor,
  };

  const disabledStyles = {
    backgroundColor: themeConfig.interactableTokens[backgroundColor].disabled.backgroundColor,
  };

  const contentStyles = {
    pressed: { opacity: themeConfig.interactableTokens[backgroundColor].pressed.contentOpacity },
    disabled: {
      opacity: themeConfig.interactableTokens[backgroundColor].disabled.contentOpacity,
    },
  };
  return {
    staticStyles,
    pressedStyles,
    disabledStyles,
    contentStyles,
  };
},
getCacheKey);
