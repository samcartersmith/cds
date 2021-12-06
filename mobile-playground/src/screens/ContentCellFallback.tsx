import React from 'react';
import { ContentCellFallback } from '@cbhq/cds-mobile/cells';
import { contentCellFallbackBuilder } from '@cbhq/cds-common/internal/contentCellFallbackBuilder';

import Example from '../internal/Example';
import ExamplesScreen from '../internal/ExamplesScreen';

const { Fallbacks } = contentCellFallbackBuilder(ContentCellFallback);

const ContentCellFallbackScreen = () => {
  return (
    <ExamplesScreen>
      <Example>
        <Fallbacks />
      </Example>
    </ExamplesScreen>
  );
};

export default ContentCellFallbackScreen;
