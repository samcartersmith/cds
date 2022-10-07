import React from 'react';
import { listCellBuilder } from '@cbhq/cds-common/internal/listCellBuilder';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { entries } from '@cbhq/cds-utils';

import { Button } from '../../buttons/Button';
import { IconButton } from '../../buttons/IconButton';
import { Checkbox } from '../../controls/Checkbox';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Pictogram } from '../../illustrations/Pictogram';
import { TextBody } from '../../typography';
import { CellMedia } from '../CellMedia';
import { ListCell } from '../ListCell';

const stories = listCellBuilder(
  ListCell,
  CellMedia,
  Button,
  IconButton,
  Checkbox,
  Pictogram,
  TextBody,
);
const titleSpacing = { spacingHorizontal: gutter } as const;

const ListCellScreen = () => {
  return (
    <ExampleScreen>
      {entries(stories).map(([name, Component]) => {
        return (
          <Example key={name} title={name} inline spacingHorizontal={0} titleSpacing={titleSpacing}>
            <Component />
          </Example>
        );
      })}
    </ExampleScreen>
  );
};

export default ListCellScreen;
