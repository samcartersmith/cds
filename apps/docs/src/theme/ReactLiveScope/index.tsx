import React from 'react';
import { DateInputValidationError } from '@cbhq/cds-common2/dates/DateInputValidationError';
import { useEventHandler } from '@cbhq/cds-common2/hooks/useEventHandler';
import { useMergeRefs } from '@cbhq/cds-common2/hooks/useMergeRefs';
import { usePreviousValue } from '@cbhq/cds-common2/hooks/usePreviousValue';
import { useRefMap } from '@cbhq/cds-common2/hooks/useRefMap';
import * as CDSDataAssets from '@cbhq/cds-common2/internal/data/assets';
import { loremIpsum } from '@cbhq/cds-common2/internal/data/loremIpsum';
import { prices } from '@cbhq/cds-common2/internal/data/prices';
import {
  sparklineInteractiveData,
  sparklineInteractiveHoverData,
} from '@cbhq/cds-common2/internal/visualizations/SparklineInteractiveData';
import { useAlert } from '@cbhq/cds-common2/overlays/useAlert';
import { useModal } from '@cbhq/cds-common2/overlays/useModal';
import { LocaleProvider } from '@cbhq/cds-common2/system/LocaleProvider';
import { avatarDotSizeMap, avatarIconSizeMap } from '@cbhq/cds-common2/tokens/dot';
import { useSparklineArea } from '@cbhq/cds-common2/visualizations/useSparklineArea';
import { useSparklinePath } from '@cbhq/cds-common2/visualizations/useSparklinePath';
import * as CDSSparklineComponents from '@cbhq/cds-web-visualization2/sparkline';
import { Accordion } from '@cbhq/cds-web2/accordion/Accordion';
import { AccordionItem } from '@cbhq/cds-web2/accordion/AccordionItem';
import { Banner } from '@cbhq/cds-web2/banner/Banner';
import * as CDSButtons from '@cbhq/cds-web2/buttons';
import { ContainedAssetCard } from '@cbhq/cds-web2/cards/ContainedAssetCard';
import * as ContentCardComponents from '@cbhq/cds-web2/cards/ContentCard';
import { FloatingAssetCard } from '@cbhq/cds-web2/cards/FloatingAssetCard';
import { NudgeCard } from '@cbhq/cds-web2/cards/NudgeCard';
import { UpsellCard } from '@cbhq/cds-web2/cards/UpsellCard';
import * as CDSCells from '@cbhq/cds-web2/cells';
import * as CDSChips from '@cbhq/cds-web2/chips';
import { Collapsible } from '@cbhq/cds-web2/collapsible/Collapsible';
import * as CDSControls from '@cbhq/cds-web2/controls';
import { DatePicker } from '@cbhq/cds-web2/dates/DatePicker';
import * as CDSDots from '@cbhq/cds-web2/dots';
import { Dropdown } from '@cbhq/cds-web2/dropdown/Dropdown';
import { useA11yControlledVisibility } from '@cbhq/cds-web2/hooks/useA11yControlledVisibility';
import { useBreakpoints } from '@cbhq/cds-web2/hooks/useBreakpoints';
import { useCheckboxGroupState } from '@cbhq/cds-web2/hooks/useCheckboxGroupState';
import { useDimensions } from '@cbhq/cds-web2/hooks/useDimensions';
import { useHasMounted } from '@cbhq/cds-web2/hooks/useHasMounted';
import { useIsoEffect } from '@cbhq/cds-web2/hooks/useIsoEffect';
import { useScrollBlocker } from '@cbhq/cds-web2/hooks/useScrollBlocker';
import { useTheme } from '@cbhq/cds-web2/hooks/useTheme';
import * as CDSIcons from '@cbhq/cds-web2/icons';
import * as CDSIllustrations from '@cbhq/cds-web2/illustrations';
import * as CDSLayout from '@cbhq/cds-web2/layout';
import { Spinner } from '@cbhq/cds-web2/loaders/Spinner';
import * as CDSMedia from '@cbhq/cds-web2/media';
import { MultiContentModule } from '@cbhq/cds-web2/multi-content-module/MultiContentModule';
import * as CDSNavigation from '@cbhq/cds-web2/navigation';
import * as CDSOverlays from '@cbhq/cds-web2/overlays';
import { useToast } from '@cbhq/cds-web2/overlays/useToast';
import { PageHeader } from '@cbhq/cds-web2/page/PageHeader';
import * as CDSSystem from '@cbhq/cds-web2/system';
import * as CDSTabs from '@cbhq/cds-web2/tabs';
import { Tag } from '@cbhq/cds-web2/tag/Tag';
import * as CDSTypography from '@cbhq/cds-web2/typography';
import * as CDSVisualizations from '@cbhq/cds-web2/visualizations';

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
  MultiContentModule,
  // cells
  ...CDSCells,
  // overlays
  ...CDSOverlays,
  // navigation
  ...CDSNavigation,
  ...CDSTabs,
  PageHeader,
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
