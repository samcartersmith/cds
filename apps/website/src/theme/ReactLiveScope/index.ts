import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useColorMode } from '@docusaurus/theme-common';
import { join, useToggler } from '@cbhq/cds-common';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { accounts } from '@cbhq/cds-common/internal/data/accounts';
import { assetColors, assetImages, assets } from '@cbhq/cds-common/internal/data/assets';
import { loremIpsum } from '@cbhq/cds-common/internal/data/loremIpsum';
import { prices } from '@cbhq/cds-common/internal/data/prices';
import { product } from '@cbhq/cds-common/internal/data/product';
import { users } from '@cbhq/cds-common/internal/data/users';
import {
  sparklineInteractiveBuilder,
  sparklineInteractiveWithHeaderBuilder,
} from '@cbhq/cds-common/internal/sparklineInteractiveBuilder';
import {
  sparklineInteractiveData,
  sparklineInteractiveHoverData,
} from '@cbhq/cds-common/internal/visualizations/SparklineInteractiveData';
import { useOverlay } from '@cbhq/cds-common/overlays/useOverlay';
import { usePaletteConfig } from '@cbhq/cds-common/palette/usePaletteConfig';
import { useScale } from '@cbhq/cds-common/scale/useScale';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { useSpectrum } from '@cbhq/cds-common/spectrum/useSpectrum';
import { useEventHandler } from '@cbhq/cds-common/system/useEventHandler';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { useSparklineArea } from '@cbhq/cds-common/visualizations/useSparklineArea';
import { useSparklinePath } from '@cbhq/cds-common/visualizations/useSparklinePath';
import * as lottieFiles from '@cbhq/cds-lottie-files';
import { nux } from '@cbhq/cds-lottie-files';
import { AppSwitcherContent } from '@cbhq/cds-web/__stories__/AppSwitcherContent';
import { UserSwitcherContent } from '@cbhq/cds-web/__stories__/UserSwitcherContent';
import * as CDSAccordion from '@cbhq/cds-web/accordion';
import * as CDSAnimation from '@cbhq/cds-web/animation';
import * as CDSButtons from '@cbhq/cds-web/buttons';
import * as CDSCardElements from '@cbhq/cds-web/cards';
import * as CDSCells from '@cbhq/cds-web/cells';
import { Cell } from '@cbhq/cds-web/cells/Cell';
import * as CDSCollapsible from '@cbhq/cds-web/collapsible';
import { useAccessibleForeground } from '@cbhq/cds-web/color/useAccessibleForeground';
import { usePaletteValueToRgbaString } from '@cbhq/cds-web/color/usePaletteValueToRgbaString';
import * as CDSControls from '@cbhq/cds-web/controls';
import * as CDSDots from '@cbhq/cds-web/dots';
import { useA11yControlledVisibility } from '@cbhq/cds-web/hooks/useA11yControlledVisibility';
import { useCheckboxGroupState } from '@cbhq/cds-web/hooks/useCheckboxGroupState';
import { useDeviceSpectrum } from '@cbhq/cds-web/hooks/useDeviceSpectrum';
import { usePalette } from '@cbhq/cds-web/hooks/usePalette';
import * as CDSIcons from '@cbhq/cds-web/icons';
import * as CDSIllustrations from '@cbhq/cds-web/illustrations';
import * as CDSLayout from '@cbhq/cds-web/layout';
import * as CDSLoaders from '@cbhq/cds-web/loaders';
import * as CDSMedia from '@cbhq/cds-web/media';
import * as CDSNavigation from '@cbhq/cds-web/navigation';
import * as CDSOverlays from '@cbhq/cds-web/overlays';
import { Tooltip as DeprecatedTooltip } from '@cbhq/cds-web/overlays/Deprecated/Tooltip';
import { PortalProvider } from '@cbhq/cds-web/overlays/PortalProvider';
import { useAlert } from '@cbhq/cds-web/overlays/useAlert';
import { useModal } from '@cbhq/cds-web/overlays/useModal';
import { useToast } from '@cbhq/cds-web/overlays/useToast';
import { insetFocusRing } from '@cbhq/cds-web/styles/focus';
import * as CDSSystem from '@cbhq/cds-web/system';
import { useFeatureFlag } from '@cbhq/cds-web/system/useFeatureFlag';
import { useFeatureFlags } from '@cbhq/cds-web/system/useFeatureFlags';
import { useFeatureFlagUpdater } from '@cbhq/cds-web/system/useFeatureFlagUpdater';
import * as CDSTables from '@cbhq/cds-web/tables';
import * as CDSTabs from '@cbhq/cds-web/tabs';
import { palette } from '@cbhq/cds-web/tokens';
import * as CDSTypography from '@cbhq/cds-web/typography';
import { getZIndexFromRow } from '@cbhq/cds-web/utils/overflow';
import * as CDSVisualizations from '@cbhq/cds-web/visualizations';
import { ProgressContainerWithButtons } from '@cbhq/cds-web/visualizations/ProgressContainerWithButtons';
import { SparklineInteractive } from '@cbhq/cds-web/visualizations/sparkline-interactive/SparklineInteractive';
import { SparklineInteractiveHeader } from '@cbhq/cds-web/visualizations/sparkline-interactive-header/SparklineInteractiveHeader';
import { SparklineArea } from '@cbhq/cds-web/visualizations/SparklineArea';

import { ButtonSheet } from ':cds-website/components/ButtonSheet';
import { ColorTile } from ':cds-website/components/ColorTile';
import { ExampleBox } from ':cds-website/components/ExampleBox';
import { ExampleWithThemeToggles } from ':cds-website/components/ExampleWithThemeToggles';
import { PaletteSheet } from ':cds-website/components/PaletteSheet';
import { ResponsiveExample } from ':cds-website/components/ResponsiveExample';
import { ThemeToggles } from ':cds-website/components/ThemeToggles';
import { TypographySheet } from ':cds-website/components/TypographySheet';
import { LottieExample } from ':cds-website/docs/components/animation/Lottie/LottieExample';
import { LottieSheet } from ':cds-website/docs/components/animation/Lottie/LottieSheet';

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
const ReactLiveScope: unknown = {
  React,
  ...React,
  // Docusaurus
  useColorMode,
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
  getZIndexFromRow,
  useEventHandler,
  // CDS Components
  Text: CDSTypography.TextBody,
  ...CDSAccordion,
  ...CDSAnimation,
  ...CDSButtons,
  ...CDSCardElements,
  ...CDSCells,
  ...CDSCollapsible,
  ...CDSControls,
  ...CDSDots,
  ...CDSIcons,
  ...CDSLayout,
  ...CDSLoaders,
  ...CDSMedia,
  ...CDSNavigation,
  ...CDSOverlays,
  ...CDSSystem,
  DeprecatedTooltip,
  ...CDSTables,
  ...CDSTabs,
  ...CDSTypography,
  ...CDSIllustrations,
  ...CDSVisualizations,
  Cell,
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
  sparklineInteractiveHoverData,
  AppSwitcherContent,
  UserSwitcherContent,
  insetFocusRing,
};

export default ReactLiveScope;
