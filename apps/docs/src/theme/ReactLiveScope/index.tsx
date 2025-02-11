import React from 'react';
import * as CDSDataAssets from '@cbhq/cds-common2/internal/data/assets';
import { loremIpsum } from '@cbhq/cds-common2/internal/data/loremIpsum';
import { avatarDotSizeMap, avatarIconSizeMap } from '@cbhq/cds-common2/tokens/dot';
import * as CDSButtons from '@cbhq/cds-web2/buttons';
import { ContainedAssetCard } from '@cbhq/cds-web2/cards/ContainedAssetCard';
import { FloatingAssetCard } from '@cbhq/cds-web2/cards/FloatingAssetCard';
import { NudgeCard } from '@cbhq/cds-web2/cards/NudgeCard';
import { UpsellCard } from '@cbhq/cds-web2/cards/UpsellCard';
import { Collapsible } from '@cbhq/cds-web2/collapsible/Collapsible';
import * as CDSDots from '@cbhq/cds-web2/dots';
import { useA11yControlledVisibility } from '@cbhq/cds-web2/hooks/useA11yControlledVisibility';
import { useTheme } from '@cbhq/cds-web2/hooks/useTheme';
import * as CDSIcons from '@cbhq/cds-web2/icons';
import * as CDSIllustrations from '@cbhq/cds-web2/illustrations';
import * as CDSLayout from '@cbhq/cds-web2/layout';
import { Spinner } from '@cbhq/cds-web2/loaders/Spinner';
import * as CDSMedia from '@cbhq/cds-web2/media';
import * as CDSTypography from '@cbhq/cds-web2/typography';

// Add react-live imports you need here
const ReactLiveScope: Record<string, unknown> = {
  React,
  ...React,
  // CDS tokens
  avatarDotSizeMap,
  avatarIconSizeMap,
  // hooks
  useA11yControlledVisibility,
  useTheme,
  // layout
  ...CDSLayout,
  Collapsible,
  // typography
  ...CDSTypography,
  // input
  ...CDSButtons,
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
