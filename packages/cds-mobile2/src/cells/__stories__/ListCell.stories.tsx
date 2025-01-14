import React from 'react';
import { listCellBuilder } from '@cbhq/cds-common2/internal/listCellBuilder';
import { gutter } from '@cbhq/cds-common2/tokens/sizing';

import { Button } from '../../buttons/Button';
import { IconButton } from '../../buttons/IconButton';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Pictogram } from '../../illustrations/Pictogram';
import { CellMedia } from '../CellMedia';
import { ListCell } from '../ListCell';

const stories = listCellBuilder(ListCell, CellMedia, Button, IconButton, Pictogram);
const titlePadding = { paddingX: gutter } as const;

const ListCellScreen = () => {
  return (
    <ExampleScreen>
      {Object.entries(stories).map(([name, Component]) => {
        return (
          <Example key={name} inline paddingX={0} title={name} titlePadding={titlePadding}>
            <Component />
          </Example>
        );
      })}
    </ExampleScreen>
  );
};

export default ListCellScreen;
