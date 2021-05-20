import { Button, IconButton } from '@cbhq/cds-mobile/buttons';
import { ListCell, CellMedia } from '@cbhq/cds-mobile/cells';
import { Checkbox } from '@cbhq/cds-mobile/controls/Checkbox';
import { createStories } from '@cbhq/cds-storybook/stories/ListCell';

import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';

const {
  Content,
  PressableContent,
  LongContent,
  WithAccessory,
  WithMedia,
  WithActions,
} = createStories(ListCell, CellMedia, Button, IconButton, Checkbox);

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

      <Example title="With accessory">
        <WithAccessory />
      </Example>

      <Example title="With media">
        <WithMedia />
      </Example>

      <Example title="With actions">
        <WithActions />
      </Example>
    </ExamplesScreen>
  );
};

export default ListCellScreen;
