import React from 'react';
import { ListCellFallback } from '@cbhq/cds-mobile/cells';
import { createStories } from '@cbhq/cds-storybook/stories/ListCellFallback';

import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';

const { Fallbacks } = createStories(ListCellFallback);

const ListCellFallbackScreen = () => {
  return (
    <ExamplesScreen>
      <Example>
        <Fallbacks />
      </Example>
    </ExamplesScreen>
  );
};

export default ListCellFallbackScreen;
