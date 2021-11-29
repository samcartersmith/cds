import React from 'react';
import { ContentCellFallback } from '@cbhq/cds-mobile/cells';
import { createStories } from ':cds-storybook/stories/ContentCellFallback';

import Example from '../internal/Example';
import ExamplesScreen from '../internal/ExamplesScreen';

const { Fallbacks } = createStories(ContentCellFallback);

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
