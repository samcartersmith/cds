import React from 'react';

import * as CdsWeb from '@cds/web';

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ...CdsWeb,
  Text: CdsWeb.TextBody,
};

export default ReactLiveScope;
