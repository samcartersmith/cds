import React from 'react';
import { listCellFallbackBuilder } from '@cbhq/cds-common/internal/listCellFallbackBuilder';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { ListCellFallback } from '../ListCellFallback';

const {
  Fallbacks,
  DangerouslySetIterationsTitle,
  DangerouslySetIterationsMedia,
  DangerouslySetIterationsDescription,
  DangerouslySetIterationsDetail,
  DangerouslySetIterationsSubdetail,
  DangerouslySetIterationsAll,
} = listCellFallbackBuilder(ListCellFallback);

const ListCellFallbackScreen = () => {
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
      <Example title="DangerouslySetIterations Description">
        <DangerouslySetIterationsDescription />
      </Example>
      <Example title="DangerouslySetIterations Detail">
        <DangerouslySetIterationsDetail />
      </Example>
      <Example title="DangerouslySetIterations Subdetail">
        <DangerouslySetIterationsSubdetail />
      </Example>
      <Example title="DangerouslySetIterations All">
        <DangerouslySetIterationsAll />
      </Example>
    </ExampleScreen>
  );
};

export default ListCellFallbackScreen;
