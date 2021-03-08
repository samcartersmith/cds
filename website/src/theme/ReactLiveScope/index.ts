import React from 'react';

import * as lottieFiles from '@cbhq/cds-lottie-files';
import * as CdsWeb from '@cbhq/cds-web';
import { Lottie } from '@cbhq/cds-web/animation/Lottie';
import { LottieStatusAnimation } from '@cbhq/cds-web/animation/LottieStatusAnimation';
import { useStatusButtons } from '@cbhq/cds-website/docs/components/examples/Lottie/useStatusButtons';

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ...CdsWeb,
  Text: CdsWeb.TextBody,
  lottieFiles,
  Lottie,
  LottieStatusAnimation,
  useStatusButtons,
};

export default ReactLiveScope;
