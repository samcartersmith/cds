import React from 'react';

import * as lottieFiles from '@cds/lottie-files';
import * as CdsWeb from '@cds/web';

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ...CdsWeb,
  Text: CdsWeb.TextBody,
  lottieFiles,
};

export default ReactLiveScope;
