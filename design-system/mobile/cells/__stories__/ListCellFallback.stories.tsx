import React from 'react';
import { listCellFallbackBuilder } from '@cbhq/cds-common/internal/listCellFallbackBuilder';

import { ListCellFallback } from '../ListCellFallback';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';

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
