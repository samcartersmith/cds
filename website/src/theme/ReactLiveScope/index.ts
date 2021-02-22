import React from 'react';

import * as lottieFiles from '@cbhq/cds-lottie-files';
import * as CdsWeb from '@cbhq/cds-web';

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ...CdsWeb,
  Text: CdsWeb.TextBody,
  lottieFiles,
};

export default ReactLiveScope;
