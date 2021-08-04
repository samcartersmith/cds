import React from 'react';
import { Button, IconButton } from '@cbhq/cds-mobile/buttons';
import { ListCell, CellMedia } from '@cbhq/cds-mobile/cells';
import { Checkbox } from '@cbhq/cds-mobile/controls/Checkbox';
import { Pictogram } from '@cbhq/cds-mobile/illustrations/Pictogram';
import { Box } from '@cbhq/cds-mobile/layout';
import { createStories } from '@cbhq/cds-storybook/stories/ListCell';

import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';

const {
  Content,
  PressableContent,
  LongContent,
  PriorityContent,
  WithAccessory,
  WithMedia,
  WithActions,
  WithIntermediary,
} = createStories(ListCell, CellMedia, Button, IconButton, Checkbox, Pictogram);

const ListCellScreen = () => {
  return (
    <ExamplesScreen>
      <Example title="Content only">
        <Content />
      </Example>

      <Example title="Pressable content">
        <PressableContent />
      </Example>

      <Example title="Long content">
        <LongContent />
      </Example>

      <Example title="Priority content">
        <PriorityContent />
      </Example>

      <Example title="With accessory">
        <WithAccessory />
      </Example>

      <Example title="With media">
        <WithMedia />
      </Example>

      <Example title="With actions">
        <WithActions />
      </Example>

      <Example title="With intermediary">
        <WithIntermediary />
      </Example>

      <Example title="Example screen" spacingHorizontal={3}>
        <Box offsetHorizontal={3}>
          <PressableContent />
        </Box>
      </Example>
    </ExamplesScreen>
  );
};

export default ListCellScreen;
