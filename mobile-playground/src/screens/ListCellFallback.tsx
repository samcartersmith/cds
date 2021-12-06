import React from 'react';
import { ListCellFallback } from '@cbhq/cds-mobile/cells';
import { listCellFallbackBuilder } from '@cbhq/cds-common/internal/listCellFallbackBuilder';

import Example from '../internal/Example';
import ExamplesScreen from '../internal/ExamplesScreen';

const { Fallbacks } = listCellFallbackBuilder(ListCellFallback);

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
