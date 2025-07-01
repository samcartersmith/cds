import React from 'react';
import { DateInputValidationError } from '@cbhq/cds-common/dates/DateInputValidationError';
import { useEventHandler } from '@cbhq/cds-common/hooks/useEventHandler';
import { useMergeRefs } from '@cbhq/cds-common/hooks/useMergeRefs';
import { usePreviousValue } from '@cbhq/cds-common/hooks/usePreviousValue';
import { useRefMap } from '@cbhq/cds-common/hooks/useRefMap';
import { useSort } from '@cbhq/cds-common/hooks/useSort';
import { accounts } from '@cbhq/cds-common/internal/data/accounts';
import * as CDSDataAssets from '@cbhq/cds-common/internal/data/assets';
import { loremIpsum } from '@cbhq/cds-common/internal/data/loremIpsum';
import { prices } from '@cbhq/cds-common/internal/data/prices';
import { product } from '@cbhq/cds-common/internal/data/product';
import { users } from '@cbhq/cds-common/internal/data/users';
import {
  sparklineInteractiveData,
  sparklineInteractiveHoverData,
} from '@cbhq/cds-common/internal/visualizations/SparklineInteractiveData';
import { useAlert } from '@cbhq/cds-common/overlays/useAlert';
import { useModal } from '@cbhq/cds-common/overlays/useModal';
import { LocaleProvider } from '@cbhq/cds-common/system/LocaleProvider';
import { avatarDotSizeMap, avatarIconSizeMap } from '@cbhq/cds-common/tokens/dot';
import { useTourContext } from '@cbhq/cds-common/tour/TourContext';
import { useSparklineArea } from '@cbhq/cds-common/visualizations/useSparklineArea';
import { useSparklinePath } from '@cbhq/cds-common/visualizations/useSparklinePath';
import * as CDSLottie from '@cbhq/cds-lottie-files';
import { Accordion } from '@cbhq/cds-web/accordion/Accordion';
import { AccordionItem } from '@cbhq/cds-web/accordion/AccordionItem';
import { Lottie, LottieStatusAnimation } from '@cbhq/cds-web/animation';
import { Banner } from '@cbhq/cds-web/banner/Banner';
import * as CDSButtons from '@cbhq/cds-web/buttons';
import { ContainedAssetCard } from '@cbhq/cds-web/cards/ContainedAssetCard';
import * as ContentCardComponents from '@cbhq/cds-web/cards/ContentCard';
import { FloatingAssetCard } from '@cbhq/cds-web/cards/FloatingAssetCard';
import { NudgeCard } from '@cbhq/cds-web/cards/NudgeCard';
import { UpsellCard } from '@cbhq/cds-web/cards/UpsellCard';
import * as CDSCells from '@cbhq/cds-web/cells';
import * as CDSChips from '@cbhq/cds-web/chips';
import { Coachmark } from '@cbhq/cds-web/coachmark/Coachmark';
import { Collapsible } from '@cbhq/cds-web/collapsible/Collapsible';
import * as CDSControls from '@cbhq/cds-web/controls';
import { DatePicker } from '@cbhq/cds-web/dates/DatePicker';
import * as CDSDots from '@cbhq/cds-web/dots';
import { Dropdown } from '@cbhq/cds-web/dropdown/Dropdown';
import { useA11yControlledVisibility } from '@cbhq/cds-web/hooks/useA11yControlledVisibility';
import { useBreakpoints } from '@cbhq/cds-web/hooks/useBreakpoints';
import { useCheckboxGroupState } from '@cbhq/cds-web/hooks/useCheckboxGroupState';
import { useDimensions } from '@cbhq/cds-web/hooks/useDimensions';
import { useHasMounted } from '@cbhq/cds-web/hooks/useHasMounted';
import { useIsoEffect } from '@cbhq/cds-web/hooks/useIsoEffect';
import { useScrollBlocker } from '@cbhq/cds-web/hooks/useScrollBlocker';
import { useTheme } from '@cbhq/cds-web/hooks/useTheme';
import * as CDSIcons from '@cbhq/cds-web/icons';
import * as CDSIllustrations from '@cbhq/cds-web/illustrations';
import * as CDSLayout from '@cbhq/cds-web/layout';
import { Spinner } from '@cbhq/cds-web/loaders/Spinner';
import * as CDSMedia from '@cbhq/cds-web/media';
import { MultiContentModule } from '@cbhq/cds-web/multi-content-module/MultiContentModule';
import * as CDSNavigation from '@cbhq/cds-web/navigation';
import * as CDSOverlays from '@cbhq/cds-web/overlays';
import { useToast } from '@cbhq/cds-web/overlays/useToast';
import { PageFooter } from '@cbhq/cds-web/page/PageFooter';
import { PageHeader } from '@cbhq/cds-web/page/PageHeader';
import { SectionHeader } from '@cbhq/cds-web/section-header/SectionHeader';
import * as CDSSystem from '@cbhq/cds-web/system';
import * as CDSTables from '@cbhq/cds-web/tables';
import { useSortableCell } from '@cbhq/cds-web/tables/hooks/useSortableCell';
import * as CDSTabs from '@cbhq/cds-web/tabs';
import { Tag } from '@cbhq/cds-web/tag/Tag';
import { Tour } from '@cbhq/cds-web/tour/Tour';
import { TourStep } from '@cbhq/cds-web/tour/TourStep';
import * as CDSTypography from '@cbhq/cds-web/typography';
import * as CDSVisualizations from '@cbhq/cds-web/visualizations';
import * as CDSSparklineComponents from '@cbhq/cds-web-visualization/sparkline';

import { SparklineInteractivePrice, SparklineInteractivePriceWithHeader } from '../Sparkline';
// Add react-live imports you need here
const ReactLiveScope: Record<string, unknown> = {
  React,
  ...React,
  // CDS tokens
  avatarDotSizeMap,
  avatarIconSizeMap,
  // hooks
  useA11yControlledVisibility,
  useCheckboxGroupState,
  useTheme,
  useToast,
  useAlert,
  useModal,
  // layout
  ...CDSLayout,
  Collapsible,
  Accordion,
  AccordionItem,
  Dropdown,
  ...CDSLottie,
  Lottie,
  LottieStatusAnimation,
  MultiContentModule,
  SectionHeader,
  // data display
  ...CDSCells,
  ...CDSTables,
  useSort,
  useSortableCell,
  // overlays
  ...CDSOverlays,
  // navigation
  ...CDSNavigation,
  ...CDSTabs,
  PageHeader,
  PageFooter,
  // tour
  Tour,
  TourStep,
  Coachmark,
  useTourContext,
  // typography
  ...CDSTypography,
  Tag,
  // input
  ...CDSButtons,
  ...CDSControls,
  ...CDSSystem,
  ...CDSChips,
  // loaders
  Spinner,
  // media
  ...CDSMedia,
  ...CDSIcons,
  ...CDSIllustrations,
  // cards
  ContainedAssetCard,
  FloatingAssetCard,
  NudgeCard,
  UpsellCard,
  ...ContentCardComponents,
  // visualizations
  ...CDSVisualizations,
  ...CDSSparklineComponents,
  useSparklinePath,
  useSparklineArea,
  SparklineInteractivePrice,
  SparklineInteractivePriceWithHeader,
  sparklineInteractiveData,
  sparklineInteractiveHoverData,
  // other
  ...CDSDots,
  DatePicker,
  LocaleProvider,
  DateInputValidationError,
  Banner,
  // utils
  ...CDSDataAssets,
  loremIpsum,
  prices,
  accounts,
  users,
  product,
  // hooks
  useBreakpoints,
  useDimensions,
  useScrollBlocker,
  useHasMounted,
  usePreviousValue,
  useIsoEffect,
  useMergeRefs,
  useRefMap,
  useEventHandler,
};

export default ReactLiveScope;
