import React from 'react';
import * as CDSButtons from '@cbhq/cds-web2/buttons';

// Add react-live imports you need here
const ReactLiveScope: Record<string, unknown> = {
  React,
  ...React,

  ...CDSButtons,
};

export default ReactLiveScope;
