import React from 'react';
import { listCellFallbackBuilder } from '@cbhq/cds-common/src/internal/listCellFallbackBuilder';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { ListCellFallback } from '../ListCellFallback';

const { Fallbacks } = listCellFallbackBuilder(ListCellFallback);

const ListCellFallbackScreen = () => {
  return (
    <ExampleScreen>
      <Example>
        <Fallbacks />
      </Example>
    </ExampleScreen>
  );
};

export default ListCellFallbackScreen;
