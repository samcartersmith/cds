import React from 'react';
import { contentCellFallbackBuilder } from '@cbhq/cds-common/internal/contentCellFallbackBuilder';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { ContentCellFallback } from '../ContentCellFallback';

const { Fallbacks } = contentCellFallbackBuilder(ContentCellFallback);

const ContentCellFallbackScreen = () => {
  return (
    <ExampleScreen>
      <Example>
        <Fallbacks />
      </Example>
    </ExampleScreen>
  );
};

export default ContentCellFallbackScreen;
