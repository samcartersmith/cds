import React from 'react';

import { join, useToggler } from '@cbhq/cds-common';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { usePaletteConfig } from '@cbhq/cds-common/palette/usePaletteConfig';
import { useScale } from '@cbhq/cds-common/scale/useScale';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { useSpectrum } from '@cbhq/cds-common/spectrum/useSpectrum';

import { useSparklinePath } from '@cbhq/cds-common/visualizations/useSparklinePath';
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
import * as CDSCardElements from '@cbhq/cds-web/cards';
import * as CDSLoaders from '@cbhq/cds-web/loaders';
import * as CDSNavigation from '@cbhq/cds-web/navigation';
import * as CDSOverlays from '@cbhq/cds-web/overlays';
import * as CDSMedia from '@cbhq/cds-web/media/RemoteImage';
import * as CDSSystem from '@cbhq/cds-web/system';
import * as CDSTables from '@cbhq/cds-web/tables';
import { palette } from '@cbhq/cds-web/tokens';
import * as CDSTypography from '@cbhq/cds-web/typography';
import * as CDSVisualizations from '@cbhq/cds-web/visualizations';
import { PortalProvider } from '@cbhq/cds-web/overlays/PortalProvider';
import { useModal } from '@cbhq/cds-web/overlays/useModal';
import { useFeatureFlags } from '@cbhq/cds-web/system/useFeatureFlags';
import { useFeatureFlag } from '@cbhq/cds-web/system/useFeatureFlag';
import { useFeatureFlagUpdater } from '@cbhq/cds-web/system/useFeatureFlagUpdater';

import useThemeContext from '@theme/hooks/useThemeContext';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useDeviceSpectrum } from '@cbhq/cds-web/hooks/useDeviceSpectrum';
import * as CDSAvatar from '@cbhq/cds-web/media/avatar';
import { nux } from '@cbhq/cds-lottie-files';
import { ColorTile } from ':cds-website/components/ColorTile';
import { ExampleWithThemeToggles } from ':cds-website/components/ExampleWithThemeToggles';
import { ThemeToggles } from ':cds-website/components/ThemeToggles';
import { assets, assetColors, assetImages } from ':cds-website/data/assets';
import { accounts } from ':cds-website/data/accounts';
import { loremIpsum } from ':cds-website/data/loremIpsum';
import { prices } from ':cds-website/data/prices';
import { PatternArtboard } from ':cds-website/components/PatternArtboard';
import { TypographySheet } from ':cds-website/components/TypographySheet';
import { ButtonSheet } from ':cds-website/components/ButtonSheet';
import { LottieSheet } from ':cds-website/docs/components/animation/Lottie/LottieSheet';
import { LottieExample } from ':cds-website/docs/components/animation/Lottie/LottieExample';

import { useStatusButtons } from './useStatusButtons';

// Add any mock data for examples here
const mocks = {
  accounts,
  assets,
  assetColors,
  assetImages,
  prices,
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
  useSpectrum,
  useSpectrumConditional,
  useStatusButtons,
  useToggler,
  useModal,
  useFeatureFlags,
  useFeatureFlag,
  useFeatureFlagUpdater,
  // CDS Components
  Text: CDSTypography.TextBody,
  ...CDSAnimation,
  ...CDSButtons,
  ...CDSCardElements,
  ...CDSCells,
  ...CDSControls,
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
  ...CDSAvatar,
  // context
  PortalProvider,
  // Utils
  loremIpsum,
  ReactRouterLink,
  assets,
  assetColors,
  prices,
  mocks,
  // Example components
  ButtonSheet,
  ColorTile,
  ExampleWithThemeToggles,
  ThemeToggles,
  Artboard: PatternArtboard,
  TypographySheet,
  LottieSheet,
  LottieExample,
  nux,
};

export default ReactLiveScope;
