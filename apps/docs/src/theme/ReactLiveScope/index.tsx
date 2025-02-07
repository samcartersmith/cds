import React from 'react';
import * as CDSDataAssets from '@cbhq/cds-common2/internal/data/assets';
import { avatarDotSizeMap, avatarIconSizeMap } from '@cbhq/cds-common2/tokens/dot';
import * as CDSButtons from '@cbhq/cds-web2/buttons';
import * as CDSDots from '@cbhq/cds-web2/dots';
import * as CDSIcons from '@cbhq/cds-web2/icons';
import * as CDSIllustrations from '@cbhq/cds-web2/illustrations';
import * as CDSLayout from '@cbhq/cds-web2/layout';
import { Spinner } from '@cbhq/cds-web2/loaders/Spinner';
import * as CDSMedia from '@cbhq/cds-web2/media';

// Add react-live imports you need here
const ReactLiveScope: Record<string, unknown> = {
  React,
  ...React,
  // CDS tokens
  avatarDotSizeMap,
  avatarIconSizeMap,
  // layout
  ...CDSLayout,
  // input
  ...CDSButtons,
  // loaders
  Spinner,
  // media
  ...CDSMedia,
  ...CDSIcons,
  ...CDSIllustrations,
  // other
  ...CDSDots,
  // utils
  ...CDSDataAssets,
};

export default ReactLiveScope;
