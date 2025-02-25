import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import * as CDSDataAssets from '@cbhq/cds-common2/internal/data/assets';
import { loremIpsum } from '@cbhq/cds-common2/internal/data/loremIpsum';
import { avatarDotSizeMap, avatarIconSizeMap } from '@cbhq/cds-common2/tokens/dot';
import { Accordion } from '@cbhq/cds-web2/accordion/Accordion';
import { AccordionItem } from '@cbhq/cds-web2/accordion/AccordionItem';
import * as CDSButtons from '@cbhq/cds-web2/buttons';
import { ContainedAssetCard } from '@cbhq/cds-web2/cards/ContainedAssetCard';
import { FloatingAssetCard } from '@cbhq/cds-web2/cards/FloatingAssetCard';
import { NudgeCard } from '@cbhq/cds-web2/cards/NudgeCard';
import { UpsellCard } from '@cbhq/cds-web2/cards/UpsellCard';
import { CellMedia } from '@cbhq/cds-web2/cells/CellMedia';
import * as CDSChips from '@cbhq/cds-web2/chips';
import { TabbedChips } from '@cbhq/cds-web2/chips/TabbedChips';
import { Collapsible } from '@cbhq/cds-web2/collapsible/Collapsible';
import * as CDSControls from '@cbhq/cds-web2/controls';
import * as CDSDots from '@cbhq/cds-web2/dots';
import { Dropdown } from '@cbhq/cds-web2/dropdown/Dropdown';
import { useA11yControlledVisibility } from '@cbhq/cds-web2/hooks/useA11yControlledVisibility';
import { useCheckboxGroupState } from '@cbhq/cds-web2/hooks/useCheckboxGroupState';
import { useTheme } from '@cbhq/cds-web2/hooks/useTheme';
import * as CDSIcons from '@cbhq/cds-web2/icons';
import * as CDSIllustrations from '@cbhq/cds-web2/illustrations';
import * as CDSLayout from '@cbhq/cds-web2/layout';
import { Spinner } from '@cbhq/cds-web2/loaders/Spinner';
import * as CDSMedia from '@cbhq/cds-web2/media';
import { PortalProvider } from '@cbhq/cds-web2/overlays/PortalProvider';
import { Toast } from '@cbhq/cds-web2/overlays/Toast';
import { Tooltip } from '@cbhq/cds-web2/overlays/tooltip/Tooltip';
import { useToast } from '@cbhq/cds-web2/overlays/useToast';
import * as CDSSystem from '@cbhq/cds-web2/system';
import * as CDSTypography from '@cbhq/cds-web2/typography';
// Add react-live imports you need here
const ReactLiveScope: Record<string, unknown> = {
  React,
  ...React,
  // Docusaurus
  useColorMode,
  // CDS tokens
  avatarDotSizeMap,
  avatarIconSizeMap,
  // hooks
  useA11yControlledVisibility,
  useCheckboxGroupState,
  useTheme,
  useToast,
  // layout
  ...CDSLayout,
  Collapsible,
  Accordion,
  AccordionItem,
  Dropdown,
  // cells
  CellMedia,
  // overlays
  Tooltip,
  Toast,
  PortalProvider,
  // navigation
  TabbedChips,
  // typography
  ...CDSTypography,
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
  // other
  ...CDSDots,
  // utils
  ...CDSDataAssets,
  loremIpsum,
};

export default ReactLiveScope;
