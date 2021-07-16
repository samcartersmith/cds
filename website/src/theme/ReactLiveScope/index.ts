import React from 'react';

import { join, useToggler } from '@cbhq/cds-common';
import * as lottieFiles from '@cbhq/cds-lottie-files';
import * as CDSAnimation from '@cbhq/cds-web/animation';
import * as CDSButtons from '@cbhq/cds-web/buttons';
import * as CDSCells from '@cbhq/cds-web/cells';
import * as CDSControls from '@cbhq/cds-web/controls';
import { useCheckboxGroupState } from '@cbhq/cds-web/hooks/useCheckboxGroupState';
import * as CDSIcons from '@cbhq/cds-web/icons';
import * as CDSIllustrations from '@cbhq/cds-web/illustrations';
import * as CDSLayout from '@cbhq/cds-web/layout';
import * as CDSLoaders from '@cbhq/cds-web/loaders';
import * as CDSNavigation from '@cbhq/cds-web/navigation';
import * as CDSOverlays from '@cbhq/cds-web/overlays';
import * as CDSSystem from '@cbhq/cds-web/system';
import * as CDSTypography from '@cbhq/cds-web/typography';
import { Link } from '@cbhq/cds-web/typography/Link';
import { loremIpsum } from '@cbhq/cds-website/data/loremIpsum';
import useThemeContext from '@theme/hooks/useThemeContext';

import { useStatusButtons } from './useStatusButtons';

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  // Docusaurus
  useThemeContext,
  // CDS
  Text: CDSTypography.TextBody,
  lottieFiles,
  useCheckboxGroupState,
  useStatusButtons,
  useToggler,
  join,
  ...CDSAnimation,
  ...CDSButtons,
  ...CDSCells,
  ...CDSControls,
  ...CDSIcons,
  ...CDSLayout,
  ...CDSLoaders,
  ...CDSNavigation,
  ...CDSOverlays,
  ...CDSSystem,
  ...CDSTypography,
  ...CDSIllustrations,
  Link,
  // Utils
  loremIpsum,
};

export default ReactLiveScope;
