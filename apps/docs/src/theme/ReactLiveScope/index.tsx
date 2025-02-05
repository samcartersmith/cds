import React from 'react';
import * as CDSButtons from '@cbhq/cds-web2/buttons';
import * as CDSLayout from '@cbhq/cds-web2/layout';

// Add react-live imports you need here
const ReactLiveScope: Record<string, unknown> = {
  React,
  ...React,

  ...CDSButtons,
  ...CDSLayout,
};

export default ReactLiveScope;
