import React from 'react';

import { join } from '@cbhq/cds-common';
import * as lottieFiles from '@cbhq/cds-lottie-files';
import * as CDSAnimation from '@cbhq/cds-web/animation';
import * as CDSButtons from '@cbhq/cds-web/buttons';
import * as CDSIcons from '@cbhq/cds-web/icons';
import * as CDSLayout from '@cbhq/cds-web/layout';
import * as CDSNavigation from '@cbhq/cds-web/navigation';
import * as CDSOverlays from '@cbhq/cds-web/overlays';
import { ThemeProvider } from '@cbhq/cds-web/system/ThemeProvider';
import * as CDSTypography from '@cbhq/cds-web/typography';
import { useStatusButtons } from '@cbhq/cds-website/docs/components/examples/Lottie/useStatusButtons';

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ThemeProvider,
  Text: CDSTypography.TextBody,
  lottieFiles,
  useStatusButtons,
  join,
  ...React,
  ...CDSAnimation,
  ...CDSButtons,
  ...CDSIcons,
  ...CDSLayout,
  ...CDSNavigation,
  ...CDSOverlays,
  ...CDSTypography,
};

export default ReactLiveScope;
