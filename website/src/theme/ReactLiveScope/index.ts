import React from 'react';

import { join, useToggler } from '@cbhq/cds-common';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { usePaletteConfig } from '@cbhq/cds-common/palette/usePaletteConfig';
import { useScale } from '@cbhq/cds-common/scale/useScale';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { useSpectrum } from '@cbhq/cds-common/spectrum/useSpectrum';
import { useSparklinePath } from '@cbhq/cds-common/visualizations/useSparklinePath';
import { useSparklineArea } from '@cbhq/cds-common/visualizations/useSparklineArea';
import { useOverlay } from '@cbhq/cds-common/overlays/useOverlay';
import {
  sparklineInteractiveBuilder,
  sparklineInteractiveWithHeaderBuilder,
} from '@cbhq/cds-common/internal/sparklineInteractiveBuilder';
import { sparklineInteractiveData } from '@cbhq/cds-common/internal/visualizations/SparklineInteractiveData';

import * as lottieFiles from '@cbhq/cds-lottie-files';
import * as CDSAnimation from '@cbhq/cds-web/animation';
import * as CDSButtons from '@cbhq/cds-web/buttons';
import * as CDSCells from '@cbhq/cds-web/cells';
import { useAccessibleForeground } from '@cbhq/cds-web/color/useAccessibleForeground';
import { usePaletteValueToRgbaString } from '@cbhq/cds-web/color/usePaletteValueToRgbaString';
import * as CDSControls from '@cbhq/cds-web/controls';
import { useCheckboxGroupState } from '@cbhq/cds-web/hooks/useCheckboxGroupState';
import { usePalette } from '@cbhq/cds-web/hooks/usePalette';
import * as CDSIcons from '@cbhq/cds-web/icons';
import * as CDSIllustrations from '@cbhq/cds-web/illustrations';
import * as CDSLayout from '@cbhq/cds-web/layout';
import * as CDSDots from '@cbhq/cds-web/dots';
import * as CDSCardElements from '@cbhq/cds-web/cards';
import * as CDSLoaders from '@cbhq/cds-web/loaders';
import * as CDSNavigation from '@cbhq/cds-web/navigation';
import * as CDSOverlays from '@cbhq/cds-web/overlays';
import * as CDSMedia from '@cbhq/cds-web/media';
import * as CDSSystem from '@cbhq/cds-web/system';
import * as CDSTables from '@cbhq/cds-web/tables';
import { palette } from '@cbhq/cds-web/tokens';
import * as CDSTypography from '@cbhq/cds-web/typography';
import * as CDSVisualizations from '@cbhq/cds-web/visualizations';
import { PortalProvider } from '@cbhq/cds-web/overlays/PortalProvider';
import { useModal } from '@cbhq/cds-web/overlays/useModal';
import { useA11yControlledVisibility } from '@cbhq/cds-web/hooks/useA11yControlledVisibility';
import { useAlert } from '@cbhq/cds-web/overlays/useAlert';
import { useToast } from '@cbhq/cds-web/overlays/useToast';
import { useFeatureFlags } from '@cbhq/cds-web/system/useFeatureFlags';
import { useFeatureFlag } from '@cbhq/cds-web/system/useFeatureFlag';
import { useFeatureFlagUpdater } from '@cbhq/cds-web/system/useFeatureFlagUpdater';
import { ProgressContainerWithButtons } from '@cbhq/cds-web/visualizations/ProgressContainerWithButtons';
import { SparklineArea } from '@cbhq/cds-web/visualizations/SparklineArea';
import { SparklineInteractive } from '@cbhq/cds-web/visualizations/chart/SparklineInteractive';
import { SparklineInteractiveHeader } from '@cbhq/cds-web/visualizations/chart-header/SparklineInteractiveHeader';

import useThemeContext from '@theme/hooks/useThemeContext';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useDeviceSpectrum } from '@cbhq/cds-web/hooks/useDeviceSpectrum';
import { nux } from '@cbhq/cds-lottie-files';
import { assets, assetColors, assetImages } from '@cbhq/cds-common/internal/data/assets';
import { accounts } from '@cbhq/cds-common/internal/data/accounts';
import { loremIpsum } from '@cbhq/cds-common/internal/data/loremIpsum';
import { prices } from '@cbhq/cds-common/internal/data/prices';
import { users } from '@cbhq/cds-common/internal/data/users';
import { product } from '@cbhq/cds-common/internal/data/product';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { ThemeToggles } from ':cds-website/components/ThemeToggles';
import { ExampleWithThemeToggles } from ':cds-website/components/ExampleWithThemeToggles';
import { ColorTile } from ':cds-website/components/ColorTile';
import { ResponsiveExample } from ':cds-website/components/ResponsiveExample';
import { TypographySheet } from ':cds-website/components/TypographySheet';
import { ButtonSheet } from ':cds-website/components/ButtonSheet';
import { LottieSheet } from ':cds-website/docs/components/animation/Lottie/LottieSheet';
import { LottieExample } from ':cds-website/docs/components/animation/Lottie/LottieExample';
import { PaletteSheet } from ':cds-website/components/PaletteSheet';
import { ExampleBox } from ':cds-website/components/ExampleBox';

import { useStatusButtons } from './useStatusButtons';

const SparklineInteractivePrice = sparklineInteractiveBuilder({
  SparklineInteractive,
  isMobile: false,
});

const SparklineInteractivePriceWithHeader = sparklineInteractiveWithHeaderBuilder({
  SparklineInteractive,
  SparklineInteractiveHeader,
  isMobile: false,
});

// Add any mock data for examples here
const mocks = {
  accounts,
  assets,
  assetColors,
  assetImages,
  prices,
  users,
  product,
};

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  // Docusaurus
  useThemeContext,
  // CDS
  join,
  lottieFiles,
  palette,
  useAccessibleForeground,
  useCheckboxGroupState,
  usePalette,
  usePaletteConfig,
  usePaletteValueToRgbaString,
  useDeviceSpectrum,
  useScale,
  useScaleConditional,
  useSparklinePath,
  useSparklineArea,
  useSpectrum,
  useSpectrumConditional,
  useStatusButtons,
  useToggler,
  useModal,
  useA11yControlledVisibility,
  useFeatureFlags,
  useFeatureFlag,
  useFeatureFlagUpdater,
  useAlert,
  useOverlay,
  useToast,
  // CDS Components
  Text: CDSTypography.TextBody,
  ...CDSAnimation,
  ...CDSButtons,
  ...CDSCardElements,
  ...CDSCells,
  ...CDSControls,
  ...CDSDots,
  ...CDSIcons,
  ...CDSLayout,
  ...CDSLoaders,
  ...CDSMedia,
  ...CDSNavigation,
  ...CDSOverlays,
  ...CDSSystem,
  ...CDSTables,
  ...CDSTypography,
  ...CDSIllustrations,
  ...CDSVisualizations,
  // context
  PortalProvider,
  // Utils
  loremIpsum,
  ReactRouterLink,
  assets,
  assetColors,
  prices,
  mocks,
  gutter,
  // Example components
  ButtonSheet,
  ColorTile,
  ExampleWithThemeToggles,
  ExampleBox,
  ThemeToggles,
  ResponsiveExample,
  TypographySheet,
  PaletteSheet,
  LottieSheet,
  LottieExample,
  nux,
  ProgressContainerWithButtons,
  SparklineArea,
  SparklineInteractivePrice,
  SparklineInteractivePriceWithHeader,
  sparklineInteractiveData,
};

export default ReactLiveScope;
