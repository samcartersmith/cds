import React from 'react';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { Button, IconButton } from '@cbhq/cds-mobile/buttons';
import { ListCell, CellMedia } from '@cbhq/cds-mobile/cells';
import { Checkbox } from '@cbhq/cds-mobile/controls/Checkbox';
import { Pictogram } from '@cbhq/cds-mobile/illustrations/Pictogram';
import { entries } from '@cbhq/cds-utils';
import { createStories } from ':cds-storybook/stories/ListCell';

import Example from '../internal/Example';
import ExamplesScreen from '../internal/ExamplesScreen';

const stories = createStories(ListCell, CellMedia, Button, IconButton, Checkbox, Pictogram);
const titleSpacing = { spacingHorizontal: gutter } as const;

const ListCellScreen = () => {
  return (
    <ExamplesScreen>
      {entries(stories).map(([name, Component]) => {
        return (
          <Example key={name} title={name} inline spacingHorizontal={0} titleSpacing={titleSpacing}>
            <Component />
          </Example>
        );
      })}
    </ExamplesScreen>
  );
};

export default ListCellScreen;
