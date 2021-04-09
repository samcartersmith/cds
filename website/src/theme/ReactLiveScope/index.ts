import React from 'react';

import { join, useToggler } from '@cbhq/cds-common';
import * as lottieFiles from '@cbhq/cds-lottie-files';
import * as CDSAnimation from '@cbhq/cds-web/animation';
import * as CDSButtons from '@cbhq/cds-web/buttons';
import * as CDSControls from '@cbhq/cds-web/controls';
import { useCheckboxGroupState } from '@cbhq/cds-web/hooks/useCheckboxGroupState';
import * as CDSIcons from '@cbhq/cds-web/icons';
import * as CDSLayout from '@cbhq/cds-web/layout';
import * as CDSNavigation from '@cbhq/cds-web/navigation';
import * as CDSOverlays from '@cbhq/cds-web/overlays';
import { ThemeProvider } from '@cbhq/cds-web/system/ThemeProvider';
import * as CDSTypography from '@cbhq/cds-web/typography';
import { useStatusButtons } from '@cbhq/cds-website/docs/components/examples/Lottie/useStatusButtons';
import useThemeContext from '@theme/hooks/useThemeContext';
// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  // docusaurus
  useThemeContext,
  // CDS
  ThemeProvider,
  Text: CDSTypography.TextBody,
  lottieFiles,
  useCheckboxGroupState,
  useStatusButtons,
  useToggler,
  join,
  ...CDSAnimation,
  ...CDSButtons,
  ...CDSControls,
  ...CDSIcons,
  ...CDSLayout,
  ...CDSNavigation,
  ...CDSOverlays,
  ...CDSTypography,
};

export default ReactLiveScope;
