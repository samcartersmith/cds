import React from 'react';
import { contentCellFallbackBuilder } from '@cbhq/cds-common/internal/contentCellFallbackBuilder';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { ContentCellFallback } from '../ContentCellFallback';

const {
  Fallbacks,
  DangerouslySetIterationsTitle,
  DangerouslySetIterationsMetaTitle,
  DangerouslySetIterationsMedia,
  DangerouslySetIterationsDescription,
  DangerouslySetIterationsAll,
} = contentCellFallbackBuilder(ContentCellFallback);

const ContentCellFallbackScreen = () => {
  return (
    <ExampleScreen>
      <Example>
        <Fallbacks />
      </Example>
      <Example title="DangerouslySetIterations Title">
        <DangerouslySetIterationsTitle />
      </Example>
      <Example title="DangerouslySetIterations Media">
        <DangerouslySetIterationsMedia />
      </Example>
      <Example title="DangerouslySetIterations Meta and Title">
        <DangerouslySetIterationsMetaTitle />
      </Example>
      <Example title="DangerouslySetIterations Description">
        <DangerouslySetIterationsDescription />
      </Example>
      <Example title="DangerouslySetIterations All">
        <DangerouslySetIterationsAll />
      </Example>
    </ExampleScreen>
  );
};

export default ContentCellFallbackScreen;
