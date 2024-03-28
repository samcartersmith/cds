import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useColorMode } from '@docusaurus/theme-common';
import ExampleWithThemeToggles from '@theme/ExampleWithThemeToggles';
import ThemeToggles from '@theme/ThemeToggles';
import { join, useToggler } from '@cbhq/cds-common';
import { useSort } from '@cbhq/cds-common/hooks/useSort';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { accounts } from '@cbhq/cds-common/internal/data/accounts';
import {
  assetColors,
  assetImages,
  assets,
  squareAssets,
} from '@cbhq/cds-common/internal/data/assets';
import { loremIpsum } from '@cbhq/cds-common/internal/data/loremIpsum';
import { prices } from '@cbhq/cds-common/internal/data/prices';
import { product } from '@cbhq/cds-common/internal/data/product';
import { sampleTabs } from '@cbhq/cds-common/internal/data/tabs';
import { users } from '@cbhq/cds-common/internal/data/users';
import {
  sparklineInteractiveBuilder,
  sparklineInteractiveWithHeaderBuilder,
} from '@cbhq/cds-common/internal/sparklineInteractiveBuilder';
import {
  sparklineInteractiveData,
  sparklineInteractiveHoverData,
} from '@cbhq/cds-common/internal/visualizations/SparklineInteractiveData';
import { getAvatarFallbackColor } from '@cbhq/cds-common/media/getAvatarFallbackColor';
import { useOverlay } from '@cbhq/cds-common/overlays/useOverlay';
import { usePaletteConfig } from '@cbhq/cds-common/palette/usePaletteConfig';
import { useScale } from '@cbhq/cds-common/scale/useScale';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { useSpectrum } from '@cbhq/cds-common/spectrum/useSpectrum';
import { useEventHandler } from '@cbhq/cds-common/system/useEventHandler';
import { avatarDotSizeMap, avatarIconSizeMap } from '@cbhq/cds-common/tokens/dot';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { useSparklineArea } from '@cbhq/cds-common/visualizations/useSparklineArea';
import { useSparklinePath } from '@cbhq/cds-common/visualizations/useSparklinePath';
import * as lottieFiles from '@cbhq/cds-lottie-files';
import { nux } from '@cbhq/cds-lottie-files';
import { generateRandomId } from '@cbhq/cds-utils/string';
import { AppSwitcher } from '@cbhq/cds-web/__stories__/AppSwitcher.stories';
import { AppSwitcherContent } from '@cbhq/cds-web/__stories__/AppSwitcherContent';
import { HelpMenu } from '@cbhq/cds-web/__stories__/HelpMenu.stories';
import { ProfileMenu } from '@cbhq/cds-web/__stories__/ProfileMenu.stories';
import { ProfileMenuContent } from '@cbhq/cds-web/__stories__/ProfileMenuContent';
import * as CDSAccordion from '@cbhq/cds-web/accordion';
import * as CDSAnimation from '@cbhq/cds-web/animation';
import * as CDSBanner from '@cbhq/cds-web/banner/Banner';
import * as CDSButtons from '@cbhq/cds-web/buttons';
import * as CDSCardElements from '@cbhq/cds-web/cards';
import * as CDSCells from '@cbhq/cds-web/cells';
import { Cell } from '@cbhq/cds-web/cells/Cell';
import * as CDSChips from '@cbhq/cds-web/chips';
import * as CDSCollapsible from '@cbhq/cds-web/collapsible';
import { useAccessibleForeground } from '@cbhq/cds-web/color/useAccessibleForeground';
import { usePaletteValueToRgbaString } from '@cbhq/cds-web/color/usePaletteValueToRgbaString';
import * as CDSControls from '@cbhq/cds-web/controls';
import * as CDSDots from '@cbhq/cds-web/dots';
import * as CDSDropdown from '@cbhq/cds-web/dropdown';
import { useA11yControlledVisibility } from '@cbhq/cds-web/hooks/useA11yControlledVisibility';
import { useBreakpoints } from '@cbhq/cds-web/hooks/useBreakpoints';
import { useCheckboxGroupState } from '@cbhq/cds-web/hooks/useCheckboxGroupState';
import { useDeviceSpectrum } from '@cbhq/cds-web/hooks/useDeviceSpectrum';
import { useDimensions } from '@cbhq/cds-web/hooks/useDimensions';
import { useHasMounted } from '@cbhq/cds-web/hooks/useHasMounted';
import { useIsBrowser } from '@cbhq/cds-web/hooks/useIsBrowser';
import { usePalette } from '@cbhq/cds-web/hooks/usePalette';
import * as CDSIcons from '@cbhq/cds-web/icons';
import * as CDSIllustrations from '@cbhq/cds-web/illustrations';
import * as CDSLayout from '@cbhq/cds-web/layout';
import * as CDSLoaders from '@cbhq/cds-web/loaders';
import * as CDSMedia from '@cbhq/cds-web/media';
import { AnimatedCaret } from '@cbhq/cds-web/motion/AnimatedCaret';
import { ColorSurge } from '@cbhq/cds-web/motion/ColorSurge';
import { Pulse } from '@cbhq/cds-web/motion/Pulse';
import { Shake } from '@cbhq/cds-web/motion/Shake';
import { MultiContentModule } from '@cbhq/cds-web/multi-content-module/MultiContentModule';
import * as CDSNavigation from '@cbhq/cds-web/navigation';
import * as CDSOverlays from '@cbhq/cds-web/overlays';
import { PortalProvider } from '@cbhq/cds-web/overlays/PortalProvider';
import { useAlert } from '@cbhq/cds-web/overlays/useAlert';
import { useModal } from '@cbhq/cds-web/overlays/useModal';
import { useToast } from '@cbhq/cds-web/overlays/useToast';
import { SectionHeader } from '@cbhq/cds-web/section-header/SectionHeader';
import { insetFocusRing } from '@cbhq/cds-web/styles/focus';
import * as CDSSystem from '@cbhq/cds-web/system';
import { BrowserOnly } from '@cbhq/cds-web/system/BrowserOnly';
import { useFeatureFlag } from '@cbhq/cds-web/system/useFeatureFlag';
import { useFeatureFlags } from '@cbhq/cds-web/system/useFeatureFlags';
import { useFeatureFlagUpdater } from '@cbhq/cds-web/system/useFeatureFlagUpdater';
import { useThemeProviderStyles } from '@cbhq/cds-web/system/useThemeProviderStyles';
import * as CDSTables from '@cbhq/cds-web/tables';
import { useSortableCell } from '@cbhq/cds-web/tables/hooks/useSortableCell';
import * as CDSTabs from '@cbhq/cds-web/tabs';
import { Tag } from '@cbhq/cds-web/tag/Tag';
import { palette } from '@cbhq/cds-web/tokens';
import * as CDSTypography from '@cbhq/cds-web/typography';
import { getZIndexFromRow } from '@cbhq/cds-web/utils/overflow';
import {
  ProgressBar,
  ProgressBarWithFixedLabels,
  ProgressBarWithFloatLabel,
  ProgressCircle,
} from '@cbhq/cds-web/visualizations';
import { ProgressContainerWithButtons } from '@cbhq/cds-web/visualizations/ProgressContainerWithButtons';
import * as CDSVisualizations from '@cbhq/cds-web-visualization';
import { SparklineInteractive, SparklineInteractiveHeader } from '@cbhq/cds-web-visualization';

import { ButtonSheet } from ':cds-website/components/ButtonSheet';
import { ColorTile } from ':cds-website/components/ColorTile';
import { ExampleBox } from ':cds-website/components/ExampleBox';
import { nftData, nftTagNames, NFTTile } from ':cds-website/components/NFTGridExample';
import { PaletteSheet } from ':cds-website/components/PaletteSheet';
import { ResponsiveExample } from ':cds-website/components/ResponsiveExample';
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
  // CDS Tokens
  palette,
  avatarDotSizeMap,
  avatarIconSizeMap,
  // CDS
  join,
  lottieFiles,
  useAccessibleForeground,
  useBreakpoints,
  useDimensions,
  useCheckboxGroupState,
  usePalette,
  usePaletteConfig,
  usePaletteValueToRgbaString,
  useDeviceSpectrum,
  useHasMounted,
  useScale,
  useScaleConditional,
  useSparklinePath,
  useSparklineArea,
  useSpectrum,
  useSpectrumConditional,
  useStatusButtons,
  useSort,
  useSortableCell,
  useToggler,
  useModal,
  useA11yControlledVisibility,
  useFeatureFlags,
  useFeatureFlag,
  useFeatureFlagUpdater,
  useThemeProviderStyles,
  useAlert,
  useOverlay,
  useToast,
  getZIndexFromRow,
  generateRandomId,
  useEventHandler,
  useIsBrowser,
  getAvatarFallbackColor,
  // CDS Components
  Text: CDSTypography.TextBody,
  ...CDSAccordion,
  ...CDSAnimation,
  ...CDSBanner,
  ...CDSButtons,
  ...CDSCardElements,
  ...CDSCells,
  ...CDSChips,
  ...CDSCollapsible,
  ...CDSControls,
  ...CDSDots,
  ...CDSIcons,
  ...CDSLayout,
  ...CDSLoaders,
  ...CDSMedia,
  ...CDSNavigation,
  ...CDSOverlays,
  ...CDSDropdown,
  ...CDSSystem,
  ...CDSTables,
  ...CDSTabs,
  ...CDSTypography,
  ...CDSIllustrations,
  ...CDSVisualizations,
  ProgressBar,
  ProgressBarWithFixedLabels,
  ProgressBarWithFloatLabel,
  ProgressCircle,
  Shake,
  Pulse,
  ColorSurge,
  Cell,
  Tag,
  AnimatedCaret,
  // context
  PortalProvider,
  // Utils
  loremIpsum,
  ReactRouterLink,
  assets,
  squareAssets,
  assetColors,
  prices,
  mocks,
  gutter,
  sampleTabs,
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
  SparklineInteractivePrice,
  SparklineInteractivePriceWithHeader,
  sparklineInteractiveData,
  sparklineInteractiveHoverData,
  AppSwitcher,
  AppSwitcherContent,
  ProfileMenu,
  ProfileMenuContent,
  HelpMenu,
  insetFocusRing,
  BrowserOnly,
  nftData,
  NFTTile,
  nftTagNames,
  SectionHeader,
  MultiContentModule,
};

export default ReactLiveScope;
