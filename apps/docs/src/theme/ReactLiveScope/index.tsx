import React from 'react';
import * as CDSButtons from '@cbhq/cds-web2/buttons';
import * as CDSLayout from '@cbhq/cds-web2/layout';
import { Spinner } from '@cbhq/cds-web2/loaders/Spinner';

// Add react-live imports you need here
const ReactLiveScope: Record<string, unknown> = {
  React,
  ...React,
  // layout
  ...CDSLayout,
  // input
  ...CDSButtons,
  // loaders
  Spinner,
};

export default ReactLiveScope;
